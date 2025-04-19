---
title: Jak se z absolventky Czechitas stát mediorem?
lead: Cesta Evči, absolventky Czechitas DA Web, od juniora k mediorovi a několik tipů, co vám může na této cestě pomoct.
author:
  name: Evča Machová
  link: https://www.linkedin.com/in/eva-machova-frontend-developer
  avatar: /avatars/eva-machova.jpg
date: 2024-03-17
---

Jak se z juniora stát mediorem? Otázka za milion, na kterou časem narazí asi každý absolvent podobných rekvalifikačních kurzů. Máme za sebou intenzivní kurz, kde jsme se toho objektivně hodně naučili. Nastupujeme do nové práce na juniorskou pozici a snažíme se plnit úkoly, co dostaneme. Někdy se s nimi trápíme méně, někdy více, a kolem sebe akorát vidíme ty mega drsné seniory, kteří naši práci zvládnou o dost rychleji a často i líp. Možná jste se stejně jako já potom ptali: *“Bude ze mě někdy taky takovýhle borec? To si vůbec nedokážu přestavit. Oproti nim nic neumím.”*

::fig{src=assets/monkeyuser.png}

Bylo by krásné vám teď říct: *“Nezoufejte! Tady je pět kroků, jak se stát mediorem snadno a rychle!”* To vám ale bohužel neposkytnu, protože sama s imposter syndromem a pochybnostmi o sobě samé neustále zápasím. Co ale můžu udělat, je popsat vám svůj osobní příběh a dát pár tipů na to, co pomohlo mně a dostalo mě do pozice, kdy si říkám, že už možná vlastně nejsem junior a můžu být pyšná na svůj progress. A uvidíme, snad přesvědčím i vás, že to půjde a je jenom otázka času než pro někoho budete “borci” vy. 

### V tomhle projektu se v životě nevyznám aneb skok z bezpečných osobních projektů do skutečného světa

Na pozici junior developera jsem nastoupila v podstatě ihned po absolvování tříměsíčního kurzu Czechitas DA: Web. Měla jsem tu výhodu, že jsem zůstala ve firmě, kde jsem předtím pracovala jako tester, takže jsem z uživatelského hlediska velice dobře znala vyvíjený produkt, celý vývojářský tým, a Trello, což byl tehdy náš nástroj na issue tracking. Myslím, že ideálnější startovní pozici si málokdo může přát, a uvědomuju si, že jsem měla velké štěstí. Na akademii mi to navíc tak nějak přirozeně šlo, tak jsem si myslela, že přejít na FE s testerskými zkušenostmi bude celkem v pohodě. No… narazila jsem.

Stále si pamatuju svůj první stylovací bug, který mi v Trellu přistál. Šlo o nějakou jednoduchou věc - změna barvy nebo borderu v komponentě z [Ant Designu](https://ant.design/). V dev tools jsem si změnu poměrně rychle naklikala, takže přece stačilo najít komponentu v naší codebase a změnit pár řádků v CSS. Sebevědomě jsem otevřela náš projekt a nestačila se divit. Místo pár složek začalo dlouhé hledání mezi stovkou komponent, které doprovázelo spousta otázek: *Jaký je sakra rozdíl mezi pages a screens? Proč je tady tolik složek? Co to jsou libs a resources? A proč jsou někdy komponenty tady a jindy tam?* Když jsem se konečně proklikala do části kódu, kam jsem potřebovala, přišly další problémy: *No jo, ale jak změním styl té komponenty jenom tady a ne všude? A jak sakra může @display zařizovat media queries? Co to vůbec je?* Zkoušela jsem googlit, četla dokumentaci Ant Designu a když nic nepomáhalo, nakonec potupně psala služebně starší kolegyni, zda mi to nevysvětlí. Připadala jsem si jako největší loser, který neumí ani nastylovat jednoduchou věc.

Fast forward o rok a půl později, kdy mi přijde úplně normální se jít kolegy/ně zeptat na komponentu, kterou nemůžu najít. Stejně tak když se mě někdo zeptá, rozhodně si o něm nemyslím, že je loser a něco neumí. Vyznat se v codebase nějakou dobu trvá a navíc v týmu každý sprint přidáváme spoustu nových funkcí. Po tom, co jsem sama (wtf!) upgradovala Ant Design na novou verzi, která zásadně změnila stylování napříč celou codebase, mi přišlo úplně samozřejmé všem vysvětlit, jak se s tím bude nejlépe pracovat. A jsem mnohem radši, když se někdo zeptá jak na to, než aby pak třeba nevědomky vytvářel něco, co už se nepoužívá.

:::box{type=tip}
Přestup na nový (a první velký) projekt je šok a může trvat klidně měsíce, než se v tom člověk zorientuje.

A je to úplně normální. Místo toho se snažit pochopit všechno sami a hned, je lepší nechat si vysvětlit stukturu projektu a základní firemní best practices od zkušenějších kolegů. A nepřestávat se ptát. Přes extension [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) je vidět, kdo v daném místě dělal poslední commit, a to je často nejlepší kandidát na to, kam si zajít pro radu.
:::

### Jsem hrozně pozadu a musím se stát odborníkem přes noc

Druhá velká překážka, které jsem v počátcích čelila, byla moje neznalost TypeScriptu. Svoji první Reactí komponentu jsem vystřihla do pár minut, jak jsem byla na kurzu zvyklá. A pak všechno zčervenalo a přišla další salva otázek: *Co to je interface? A proč najednou funkce vrací “void” a ne “undefined”? Proč nás tohle nenaučili už na akademii, když je to v praxi potřeba?* Připadala jsem si hrozně pozadu a bylo mi blbé se ptát, protože jsem měla pocit, že bych to měla už dávno umět. Snažila jsem se tedy ostatní co nejrychleji dohnat a večery trávila samostudiem dokumentace. Protože mi přišlo, že nemám čas začínat úplně od základů a do práce potřebuju znát spíše pokročilejší věci, přeskočila jsem první kapitoly, hledala co znamenají špičaté závorky a snažila se naučit co nejrychleji psát věci stejně jako moji pokročilí kolegové. Sice jsem nevěděla k čemu ten TypeScript vlastně je, ale postupně jsem pochopila, že v Reactu s TypeScriptem se musí props definovat s kouzelným slůvkem `interface` a že před `useState` **se zase píše ten typ ve špičatých závorkách. Když mi kolega řekl, ať použiju `type guard`*,* nastudovala jsem si, jak se píše a používá, aniž bych věděla co to je `type narrowing` a proč je třeba. 

Dneska mám ke vzdělávání dost odlišný přístup.  I když už třeba umím používat složitější složené nebo parametrické typy, neustále se vracím k úplným základům TypeScriptu (a taky Reactu a JavaScriptu), abych opravdu pochopila principy, které za nimi stojí. Když narazím na něco nového, nesnažím se to naučit co nejrychleji používat (*hlavně abych nezdržovala!*), ale věnuji čas hlubšímu pochopení, čtu si dokumentaci i články přímo v práci, a když něco nechápu, zeptám se seniornějšího kolegy. Často z toho bývá zajímavá diskuze, protože zjistíme, že on té věci taky třeba úplně nerozumí a společně se něco nového naučíme. Zpětně už taky chápu, proč nás na akademii nesnažili nadrtit používat TypeScript s Reactem a proč naopak věnovali čas vysvětlování tvoření DOMu a psaní čistého JavaScriptu, i když se mohlo zdát, že jsou nám po příchodu Reactu tyhle znalosti k ničemu. Sice mi jejich význam dochází až teď, ale pořád na nich stavím a jsem vděčná, že jsem jim věnovala čas.

:::box{type=tip}
Nikdo neumí všechno dokonale a každý má mezery.

Za to, že ještě něco neumíte se není třeba stydět. Než se snažit rychle získat přehled o všech pokročilých konstrukcích za víkend, raději bych se ujistila, že opravdu chápu co za nimi stojí a proč něco nějak funguje. Vůbec není špatné začít od nuly a ptát se na věci typu *Co je to vlastně ten stav?,* nebo zkoumat, jak funguje algoritmus, které denně používám v metodě `.sort()`. Doporučuju už zmíněné první kapitoly dokumentací nebo třeba nadcházející kurz [Kódím.cz:](http://Kódím.cz)[Programování a algoritmy pro praxi.](https://kodim.cz/kurzy/zaklady-algo/lekce)
:::

### Vůbec netuším, jak tohle udělat, takže na to nemám

Poslední a největší věc, ve které pociťuju rozdíl, je strach z neznáma a náročnějších úkolů. Moje první vývojářské měsíce na mě naštěstí nebyl velký tlak a často jsem si mohla vybírat věci, na kterých jsem chtěla pracovat. Brala jsem si tehdy jenom úkoly, u kterých jsem přesně věděla, jak je vyřešit a jak budu postupovat. Když mi přistálo něco, na co jsem si nevěřila, hodila jsem to na někoho seniornějšího. Samozřejmě to ale nešlo věčně a přišel první velký úkol, který jsem musela udělat, i když jsem neměla nejmenší tušení, kde začít, nebo jak ho nedejbože vyřešit. Jenom jsem seděla, googlila (to bylo ještě před chatGPT 😅) a nemohla se pohnout. S pomocí kolegy seniora jsem to nakonec po několik týdnech nějak dotáhla, ale bylo tam plno momentů, kdy jsem se ptala na nějakou věc několikrát a připadala si neschopně (*yet again*). A pak přišlo code review a kolega si uvědomil, že ten návrh nefunguje a je třeba to celé předělat. Tehdy jsem měla chuť se zase vrátit ke svým jednoduchým bugům a říkala jsem si, že na takovéhle úkoly asi ještě nemám.

Za rok a půl mi přistálo už několik úkolů podobného rázu a zjistila jsem zajímavou věc - vždycky jsem to nějak zvládla, ty věci teď běží na produkci a fakt je jakože někdo používá. Někdy jsem potřebovala pomoct víc, někdy míň, někdy to bylo fakt náročné a kola code review nekonečná, ale vždycky to nějak dopadlo a vždy mě to hrozně posunulo. Dnes takové věci vyhledávám a když nemám pár sprintů větší úkol, prosím nadřízeného, aby pro mě něco našel, i když vím, že to zpočátku bude náročné. U každého code review počítám s tím, že to možná budu muset přepisovat, ale už to nevidím jako svou chybu, za kterou bych se měla bičovat, ale jako příležitost k tomu naučit se napsat nějakou věc jiným způsobem a lépe. 

:::box{type=tip}
Velké a těžké úkoly jsou náročné pro všechny a je jasné, že pro juniory víc. 

Počítá se s tím, že s nimi bude potřeba pomoct a může se klidně stát, že bude nutné něco předělávat. Nakonec to ale vždycky stojí za to a ta radost z toho, že to nakonec funguje a někdo to používá, je neskutečná. Můžete po něčem větším skočit v práci, nebo si doma rozjet projekt, na který si myslíte, že nemáte. Uvidíte, že nejspíš jo. 🙂
:::

### Shrnutí

Takže jak na toho mediora a od kdy už se za něj můžu považovat? Bude to nejspíš hodně individuální, ale pro mě ta změna nastala s uvědoměním, že “*nějak napíšu skoro cokoliv, i když mi to možná bude trvat a budu se muset ptát*”. Samozřejmě mám pořád horší dny, kdy má imposter syndrom jasnou převahu a já si připadám jako věčný začátečník. V těhle chvílích je ale dobré se zastavit, ohlédnout se zpátky a porovnat se se sebou samým a svými reálnými začátky. Myslím, že většina z nás pak zjistí, jak ohromné pokroky už jsme udělali. Mně samotné došlo, že k mnoha věcem už přistupuju jinak a lépe, mám znalosti a zkušenosti, o které se můžu opřít, a už vím, že je v pořádku se často ptát a je to součástí práce programátora. Pevně doufám, že stejně tak mnozí z vás objeví, že automaticky zvládají spoustu věcí, které je odlišují od juniorů a přibližují k těm “borcům” seniorům. A pokud jste opravdu v začátcích a nacházíte se spíše v těch prvních odstavcích každého tématu, vidíte, že v tom nejste sami a že to nebude trvat věčně. Snad vás na vaší cestě moje tipy aspoň trochu inspirují.
