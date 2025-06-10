---
title: "Optimalizační sprint: Jak zkrotit renderování v 5 krocích"
lead: Praktická ukázka pokročilejších technik jak zrychlit renderování složitějších stránek v Reactu
author:
  name: Evča Machová
  link: https://www.linkedin.com/in/eva-machova-frontend-developer
  avatar: /avatars/eva-machova.jpg
date: 2025-06-06
---

:::summary
V tomhle článku se podělím o konkrétní příběh optimalize React aplikace – od hromady uživatelských stížností na začátku až po **snížení času renderování na pětinu**. Ukážu vám, jak

- pomocí profileru odhalit bottlenecky,
- přeskládat správu stavu,
- přesunut logiku blíž ke komponentám nebo
- nasadit React signály místo klasického contextu.

Jestli hledáte praktické rady, jak zkrotit přerenderování v náročnější React appce, čtěte dál!
:::

Aplikace, na které už v práci několik let pracuji, a která s každým produkčním releasem přisype hromadu nových cool funkcí, už pár optimalizačních issues zažila. Vždy to byly spíš očividné bugy, kde se nově zaneslo nějaké výrazné zpomalení. Za ty roky se ale pomaličku, plíživě, s každou novou řadou komponent zvětšoval technický dluh – tady jenom ještě jedna věc sahající na context, tady ještě jeden stav, tady jenom další komponenta, která se bude překreslovat s každou akcí uživatele… Až najednou prásk, hromadí se stížnosti, a některé úkony s větším množstvím dat vyžadují velké množství trpělivosti. Dostala jsem dárek, co máme [my programátoři, správci](https://zdrojak.cz/clanky/kolonizatori-spravci-kolonii/#:~:text=Zat%C3%ADmco%20koloniz%C3%A1tor%20ne%C5%A1el%20daleko%20pro,p%C4%9Btkr%C3%A1t%20m%C4%9B%C5%99%C3%AD%2C%20ne%C5%BE%20n%C4%9Bco%20u%C5%99%C3%ADzne.) velmi rádi – zelenou od produktu pro refaktoring! Krásný sprint a půl hraní si a měření, ze kterého jsem si odnesla následujících pět kroků, které výrazně pomohly ke zmíněnému happy endu bez nutnosti drastickým způsobem překopat architekturu. 

::fig[Hurá do boje (credit: [Midjourney](https://www.midjourney.com))]{src=assets/react-fight.jpg}

## 1. Identifikování problému – React profiler

Krok jedna u debuggování jakéhokoliv problému je jasný – je třeba zjistit, kde problém je. Na pomoc přichází [**React Developer Tools**](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) a jejich záložka **Profiler**, kde je vidět vše, co může daný bottleneck způsobovat. Ovládání je jednoduché – začnete nahrávat, provedete akci, která “je pomalá”, a pustíte se do zkoumání Flamegraph chartu. Pro ještě větší dokreslení problému (doslova) si v nastavení profileru můžete zapnout highlightování renderovaných komponent a uvidíte, kolik rámečků se vám v aplikaci vysvítí. 

V případě naší aplikace to bylo opravdu hodně. Při změně v jednom místě docházelo k překreslení většiny komponent a na stránce svítilo skoro všechno. I když by bylo ideální dosáhnout vysvícení jenom toho jednoho změněného čtverečku, ukázalo se, že by to byl běh na příliš dlouhou trať, na který zase tolik času není. Začala jsem tedy postupovat od komponent, které zdržovaly nejvíce, a jejichž ubrání by mělo být na výkonu nejvíc vidět. V jednodušší aplikaci by šlo takové problematické komponenty najít v záložce Ranked chart, kde by byly navrchu s nejdelším časem renderu. V případě velkých aplikací se spoustou naimportovaných UI komponent (což byl náš případ) v Ranked chartu zabraly první místa komponenty jako Tooltip nebo Dropdown, které byly opravdu samy o sobě relativně pomalé, ale rozhodně nebyly tím hlavním problémem v porovnání s hlubokými stromy komponent, které se s každou změnou zbytečně re-renderovaly. ⬇️

::fig[Flamegraph chart ukazující přerenderované komponenty a jejich čas. Žlutě vyznačený Tooltip byl sice podle Ranked chartu nejpomalejší, ale jeho samotný čas renderu byl zanedbatelný oproti skupinám komponent ohraničených červeně. Na nich bylo nejhorší to, že jejich re-render nedával smysl (komponenty jako Toolbar, Panel nebo Menu by nemělo rozhodit překreslení něčeho nesouvisejícího) a ještě měly navíc spoustu potomků.]{src=assets/flamegraph-1.png}

U těchto orámovaných skupin komponent pak začala mravenčí práce – rozkliknout si u každé z nich rodiče navrchu,  podívat se na důvod přerenderování a ten následně prozkoumat i v kódu. Zde se ukázalo, že je těch důvodů vlastně pouze pár: 

- **častá změna React contextu,** který měl hodně odběratelů a vynutil jejich re-render
- **často měněný stav** byl na několika místech **uložený vysoko v rodiči,** který pak způsoboval překreslení všech potomků

První problém částečně vyřešil `useCallback()`(viz níže), u druhého jsem si uvědomila, že *lifting the state up* není všespásný design pattern, a naopak může zanést nemálo problémů. 

## 2. Kompozice – přesunutí stavu dolů

Základní chování React aplikace ([před verzí 19 s compilerem](https://react.dev/learn/react-compiler)), je **re-renderování komponenty při změně stavu a automatické re-renderování všech jejích dětí.** Tenhle pattern je užitečný, protože zajistí aktuální UI bez toho, aniž bychom se nadřeli. Když ale komponenta, která drží stav, časem nabobtná o spoustu dětí, které třeba nejsou nutně na tomto stavu závislé, dochází k jejich renderování zbytečně a snižuje se výkon aplikace.

V našem případě se přesně toto stalo. Co s tím? 

- Pokud **stav používá pouze část rodiče**, lze tuto **část vydělit na samostatnou komponentu**. Zpřehlední se kód rodičovské komponenty a nová menší komponenta si hezky spravuje svou zodpovědnost i se stavem. Re-renderuje se jen ona, když se daný stav změní.
- V případě, kde stav potřebují dvě child komponenty, to je trochu složitější, ale obdobné – tyto **komponenty se obalí “wrapper” komponentou, která bude spravovat stav**. Zase se oddělí stav pouze k místu, kde se s ním opravdu pracuje, a re-renderuje se tak jen to, co je třeba.

Tímto postupným uklízením došlo k rozkouskování pár velkých rodičovských komponent tak, že byly spíš “hloupým”obalem pro jednotlivé “chytré komponenty”, které si spravovaly svůj stav. Ve výsledném Flamegraph chartu potom tyto rodičovské komponenty úplně zmizely a místo nich se překreslovaly pouze menší, nově vytvořené komponenty. Pro mě osobně to byla trochu změna paradigmu, protože jsem se do té doby setkávala spíš s posouváním stavu o úroveň nahoru, kde rodič byl to “chytrou” komponentou a dítě pouze “hloupě” vykreslilo data z props. Tento pattern se určitě stále hodí, ale **u náročných aplikací bývá lepší držet stav co nejblíž místu, kde se s ním pracuje**.

## 3. Chytřejší state management – kombinace signálů a contextu

Změny v rámci jedné komponenty, kde není větší prop drilling, jsou jednoduché. Co ale dělat když stav opravdu musí být v rodiči a využívá ho desítka child komponent, které ho přes props posílají dál a dál? Jednu takovou master rodičovskou komponentu jsme měli. Říkejme jí třeba Kraken. 🐙 Kraken spravoval zásadní a často měněný stav, který nešel jednoduše přesunout jinam a musel se nějak úsporněji předávat přes props, jejichž chapadla sahala hodně hluboko. 

Jednou z možností, **jak se vyhnout hlubokému prop drillingu je využití [React contextu](https://react.dev/learn/passing-data-deeply-with-context)**, **který dovolí k hodnotám přistupovat všem potomkům** v podstromu. Kraken by pak mohl vypadat nějak takhle bez nutnosti předávat props.

```jsx
const Kraken = () => {
  const [treasure, setTresure] = useState({ gold: 100, pearls: 1000 });
  const [boxState, setBoxState] = useState("hidden");
  const {gold, pearls} = treasure;

  // Přístup k hodnotám kontextu mají všechny komponenty uvnitř *Treasure.Provider*
  // i když jsou zanořené jako např. *Pirates*
  return (
    <Treasure.Provider value={{ gold, pearls, boxState }}>
      <GoldSeeker />
      <Ship>
        <Pirates />
      </Ship>
      <PearlFinder />
    </Treasure.Provider>
  );
};

const GoldSeeker = () => {
  const { gold } = useTreasureContext();
  console.log(treasure.gold)
};

const PearlFinder = () => {
  const { pearls } = useTreasureContext();
  console.log(treasure.pearls)
};

const Pirates = () => {
  const { boxState } = useTreasureContext();
  console.log(boxState);
};
```

Jednodušší co se týče kompozice, vůbec neřešící co se týče performance – **když se změní jakákoliv část contextu, re-renderují se i všichni jeho “subscribeři”,** i když danou část nepoužívají. Např. při změně `gold` se překreslí i `PearlFinder`, kterého `gold` vůbec nezajímá. Stejně tak se překreslí i `Pirates` , kteří používají úplně jiný objekt. 

Na místě bylo zavést komplexnější řešení – konečně **implementovat chytřejší state management** a využít jednu ze spousty knihoven k tomu určených.  Rozhodovala jsem se mezi dvěma: [Zustand](https://zustand-demo.pmnd.rs/) a [Signals](https://preactjs.com/blog/introducing-signals/) (ve formě [Preact knihovny pro React](https://www.npmjs.com/package/@preact/signals-react)). Obě knihovny slibovaly, co aplikaci chybělo:

- možnost, aby **komponenty sledovaly jen část contextu** a nepřekreslovaly se zbytečně
- **přehlednější práce s globálním stavem**, který se může importovat z jednoho místa a nemusí se tolik posílat přes props
- **menší boilerplate** než třeba použití Reduxu
- s tím vším automaticky **lepší performance**

Volba nakonec padla na Signals právě kvůli slibovanému výkonu, kterým jsou proslavené, a také proto, že jde o technologii, kterou lze využít i mimo React, a které se snad někdy [dočkáme i v JavaScriptu.](https://github.com/tc39/proposal-signals) Na to, jak přesně fungují, a všechny jejich vychytávky by mohl vydat celý další článek (který možná bude, kdo ví 😇). Zde se pokusím ve zkratce představit jejich hlavní výhody, které hrály v řešení výkonu největší roli, a které vás třeba zlákají si je také vyzkoušet. 

### Signály lze definovat kdekoliv

Signály slouží jako další možnost ukládání stavu aplikace. Jak jsem zmínila, oproti klasickému stavu je **lze definovat úplně mimo komponentu v odděleném souboru**, odkud je můžete kamkoliv importovat. Ve stylu ostatních state management knihoven si tak **lze vytvořit globální *store*** pro správu stavu v celé aplikaci, **nebo několik menších dedikovaných *storů*** pro její části.

```jsx
import { signal } from '@preact/signals-react';

// Signál definujeme podobně jako stav s vychozí hodnotou
export const treasureSignal = signal({ gold: 100, pearls: 1000, boxState: "hidden" });
```

### Signály jsou objekty s neměnnou referencí

K hodnotě signálu pak komponenta, která si ho naimportovala, přistupuje přes vlastnost `.value` (obdobně jako Reactí `ref` objekt s vlastností `.current` ). 

```jsx
import treasureSignal from "./signalStore";

const GoldSeeker = () => {
  console.log(treasureSignal.value.gold);
};
```

Přes vlastnost `.value` lze hodnotu signálu také jednoduše **synchronně** změnit.  

```jsx
import treasureSignal from "./signalStore";

const GoldSeeker = () => {
  const onGoldFound = () => {
  // Signály jsou mutable, takže by šlo napsat i *treasureSignal.value.gold += 1*
    treasureSignal.value = { ...treasureSignal.value, gold: treasureSignal.value.gold + 1 };
  };

  return (
    <Button onClick={onGoldFound}>Najít zlato</Button>
  )
};
```

Už díky této vlastnosti signálů lze výrazně snížit počet re-renderů. Protože jsou signály objekty a při změně se mění jejich vnitřní `value` , **samotné předání signálu přes props nebo přes context nikdy nevyvolá re-render**, protože jde pořád o stejný původně definovány objekt. Jenom **pokud nějaká komponenta přistoupí k `.value`, “přihlásí” se tím ke změnám a vyžádá své re-renderování**. 

```jsx
import treasureSignal from "./signalStore";

// Když se změní hodnota *treasureSignal.value*, komponenta *Ship* se nere-renderuje
const Ship = () => {
  return (
    <Pirates treasureSignal={treasureSignal}/>
  );
};

// Re-renderuje se pouze *Pirates*, která přistupuje k *.value*
const Pirates = ({treasureSignal}) => (
  <div>{treasureSignal.value.boxState}</div>
);
```

### Signál dovoluje reagovat pouze na část změny stavu

Použití signálů způsobem v horní ukázce ale stále způsobí, že když se změní i jiná část signálu (třeba `pearls`), komponenta `Pirates`se taky re-renderuje. Je třeba kód mírně upravit a **reagovat pouze na tu část signálu, která danou komponentu zajímá**. K tomu slouží hook **`useComputed()` ,** který **vytvoří read-only kopii části signálu, kterou chce komponenta sledovat.**

```jsx
// Jak jsme viděli výše, komponenta může signál klidně dostat přes props
const Pirates = ({treasureSignal}) => {
  // *boxStateSignal* je read-only část *treasureSignal* a komponenta bude reagovat 
  // pouze na změny v této části
  const boxStateSignal = useComputed(() => treasureSignal.value.boxState);

  return (
    <div>{boxStateSignal.value}</div>
  );
};
```

Teď se vyvolá render u `Pirates` jenom při změně `boxState`. No není to krása?

### Finální kombinace s kontextem

Po představení hlavních výhod a vlastností signálů se můžeme vrátit k původnímu příkladů s Krakenem a ukázat si, jak došlo k jeho zkrocení. Sdílený stav tady pořád musel ovládat Kraken, ale už byl ve formě signálu, který se předal do contextu, aby byl přístupný všem hlubokým potomkům bez nutnosti drillování. Jednotliví potomci si z contextu vyzobnuli pouze to, co je zajímalo. 

```jsx
import treasureSignal from "./treasureContext";
 
const Kraken = () => {
  // Změna stavu musela bez drastických zásahů do architektury probíhat zde
  const onTreasureFound = (newTreasure) => {
    treasureSignal.value = { ...newTreasure };
  }

  // Všichni potomci měli přístup k hodnotě *treasureSignal* díky contextu
  return (
    <Treasure.Provider value={treasureSignal}>
      <GoldSeeker />
      <Ship>
        <Pirates />
      </Ship>
      <PearlFinder/>
    </Treasure.Provider>
  );
};

const PearFinder = () => {
  const treasureSignal = useTreasureSignalContext();
  // Jednotlivé komponenty sledovaly jen část signálu, která je zajímala
  const pearls = useComputed(() => treasureSignal.value.pearls);

  return <div>{pearls.value}</div>;
};
```

Na začátku problému byla tedy monstrózní komponenta s velkým množství potomků, kterým se předával stav přes props. 

::fig[Původní Kraken se spoustou vykreslených chapadel při každé změně stavu.]{src=assets/flamegraph-2.png}

Na konci došlo k **umazání prodrillovaných props** a hlavně k **drastickému omezení re-renderování potomků**, které se projevilo i na umazaných “chapadlech” ve Flamegraphu profileru. 

::fig[Flamegraph po implementaci signálů a osekání zbytečně renderovaných potomků.]{src=assets/flamegraph-3.png}

## 4. Svatá trojice – React.memo, useMemo, useCallback

Někteří z vás si určitě u předchozího příkladu všimli problému – z logiky Reactu se musely přece všichni potomci Krakena re-renderovat, když se překreslil jejich rodič. Máte naprostou pravdu. Zatajila jsem ještě jeden poslední krok a to memoizování komponent [pomocí `Rect.memo`.](https://react.dev/reference/react/memo) To zařídí, že se **potomek re-renderuje pouze tehdy, když se změní jeho props**. Předejdeme tím defaultnímu React chování (před verzí 19), ale za cenu, že to je vlastně celkem otravné a může to být nepřehledné. Proč? Na tohle téma naráží i super článek [The Uphill Battle of Memoization](https://tkdodo.eu/blog/the-uphill-battle-of-memoization) a pokusím se ho krátce demonstrovat taky zde.

Aby mělo `memo` vůbec smysl, je **třeba minimalizovat změny props**. Proto jde použití této funkce často ruku v ruce s `useCallback()` a `useMemo()`. Tyto hooky zajistí, že **při re-renderu komponenty zůstane reference** na definovanou funkci (v případě `useCallback()`) nebo vytvořený objekt (v případě `useMemo()`) **stejná napříč re-rendery**. Pokud se taková hodnota předá potomkovi přes props, `memo` nezjistí žádnou změnu, a tím pádem nevyvolá zbytečný render potomka. Bez nich by totiž každý render rodiče znamenal znovuvytvoření všech funkcí a objektů definovaných uvnitř komponenty, a tím pádem také změnu props.

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // Se změnou stavu se *IncrementButton* nere-renderuje
  // funkce *increment* má pořád stejnou referenci a nedošlo tedy ke změně props
  return (
    <div>
        <IncrementButton onClick={increment} />
    </div>
  );
};

const IncrementButton = memo(({ onClick }) => {
  return <button onClick={onClick}>Increment</button>;
});
```

Na první pohled to může vypadat jako skvělé řešení. Ale když počet props v memoizované komponentě roste a je třeba přidat další, velice snadno se stane, že kolega/kolegyně přidají do props necachovaný callback a celá snaha o optimalizaci jde do kopru. **Memoizace není vidět “shora” a mít ji pořád na paměti je náročné**. Stejně jako to zmiňuje i odkazovaný článek, je lepší si nejdříve hrát se stavem a kompozicí komponent, až poté se uchylovat k memoizaci. Prakticky jsem tyto tři funkce použila jenom v těchto případech:  

- V místech kde jsem ještě nechtěla/nešlo překopávat existující React context. Tady jsem obalila hodnoty contextu `useMemo()` a `useCallback()`, aby zbytečně nevyvolávaly renderování. Je to zrádné, ale i nesouvisející **re-renderování jedné komponenty, která přistupuje k necachované funkci z contextu, vyvolá úplně zbytečně re-render všech uživatelů tohoto contextu**.
- **Náročnější výpočty uvnitř aplikace**, které se nemusely dělat znovu s každým renderem, jsem obalila `useMemo()`
- Pokud to opravdu nešlo vyřešit jinak, **velké a pomalé potomky** často překreslovaného rodiče **jsem obalila `memo`**
- Tyto memoizované potomky jsem po domluvě v týmu nazvala např. `MemoizedButton` , aby byly moje memoizační snahy okamžitě viditelné i z vrchu

Memoizování má tedy své místo, ale neměla by to být první věc po které sáhnete. Ono totiž cachování také není z hlediska výkonu zadarmo a jeho použití se opravdu musí vyplatit. A pokud můžete upgradovat na React 19, můžete tuto starost nechat na Meta vývojářích a věnovat se spíš architektuře a správě stavu.  

## 5. Virtualizace a zmenšení počtu DOM elementů

Celý článek jsem popisovala omezení re-renderování jednotlivých komponent a v tomto bodě půjdu ještě o krok dál. Kromě re-renderu totiž můžeme taky řešit, že by se **daná komponenta neměla renderovat vůbec, když není vidět**, dokud se k ní uživatel nedoscrolluje.

V use casu naší aplikace to byl druhý hlavní bottleneck – v jedné větší scrollovatelné  komponentě se vykreslovala spousta komponent, i když jich byl vidět jen zlomek. Šlo o očividnou potřebu optimalizace, kdy původní návrh nepočítal s možností tolika prvků. Zároveň je to ale také častý pattern, který lze vyřešit různými způsoby. Typicky jde o scrollovatelné seznamy prvků a tabulky, pro které vznikly knihovny jako [react-window](https://www.npmjs.com/package/react-window) nebo [react-virtualized](https://www.npmjs.com/package/react-virtualized). Podobně ale poslouží i nativní javascriptové řešení `IntersectionObserver`, pokud jde o nějaké složitěji pozicované komponenty (což byl můj případ). 

Místo původního řešení, které vykreslovalo celé pole položek najednou, jsem připojila na jednotlivé prvky observer a podle toho, jestli jsou vidět nebo ne, vytvořila **subset skutečně viditelných prvků, které se měly renderovat.**

```jsx
useEffect(() => {
  // Callback, který se zavolá pokaždé, když se změní viditelnost sledovaných prvků
  const observerCallback = (entries) => {
    setVisibleItems((prevVisibleItems) => {
      // Do nové množiny zkopírujeme předchozí viditelné prvky
      const newVisibleItems = new Set(prevVisibleItems);

      // Projdeme Entries, kde jsou všechny prvky, u kterých se změnila viditelnost
      entries.forEach((entry) => {
        const targetItem = entry.target;
        if (entry.isIntersecting) {
          // Nově viditelné prvky přidáme do množiny
          newVisibleItems.add(targetItem);
        } else {
          // Ty, co už zmizely, odebereme
          newVisibleItems.delete(targetItem);
        }
      });

      // Vrátíme aktualizovanou množinu viditelných prvků
      return newVisibleItems;
    });
  };

  // V useEffectu vytvoříme nový IntersectionObserver s callback funkcí
  const observer = new IntersectionObserver(observerCallback, {
    root: elementRef.current, // Element, vůči kterému se viditelnost počítá
  });

  // Observer napojíme na všechny prvky, které chceme sledovat
  allItems.forEach((item) => {
    observer.observe(item);
  });

  // Úklid po unmountování komponenty
  return (): void => {
    allItems.forEach((item) => {
      observer.unobserve(item);
    });
    observer.disconnect();
  };
}, [allItems, elementRef]);
```

Počet aktivních komponent v DOMu se tím výrazně snížil, což mělo pozitivní vliv na svižnost UI i na celkový počet DOM elementů, který by obecně neměl zbytečně růst. Počet aktuálně vykreslených prvků si lze snadno ověřit v konzoli pomocí `document.querySelectorAll('*').length`.

## Závěr

Zmíněných pět kroků samozřejmě nepokrývá všechny možnosti, jak optimalizovat. Aplikace by si zasloužila třeba víc [*lazy loadingu*](https://react.dev/reference/react/lazy) nebo přepsání dalších legacy contextů do signálů.  I tak ale těch pár relativně rychlých zásahů na klíčových místech pomohlo nastavit směr, kterým dál postupovat, a to bez nutnosti trávit půl roku refaktoringem. Pamatujete si Flamegraph chart ze začátku článku? Po tomhle sprintu vypadal o dost méně strašidelně, i když mu pár chapadel k useknutí ještě zůstalo. 

::fig[Finálná flamegraph po všech optimalizacích.]{src=assets/flamegraph-4.png}
