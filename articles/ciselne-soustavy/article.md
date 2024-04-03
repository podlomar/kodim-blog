---
title: Číselné soustavy
lead: Malá pohádka o tom, co jsou to číselné soustavy a proč je potřebujeme k přenášení dat.
author:
  name: Martin Podloucký
  link: https://www.linkedin.com/in/martin-podlouck%C3%BD-5b415268
  avatar: https://avatars.githubusercontent.com/u/4608335
date: 2024-04-03
draft: true
---

Toto je druhý díl série článků o tom, jak se ukládají a přenášejí data mezi počítači. V [prvním díle](/blog/clanky/prace-s-daty) jsme si letem světem pověděli o tom, jak všechna data v počítači jsou v zásadě jen kupa čísel. Teď přišel čas na malou oddechovou pohádku o číselných soustavách, než se naplno vrhneme do hlubin nul a jedniček, bitů a bajtů.

Pokud už něco a číselných soustavách víte, například ze školy nebo z profesní zkušenosti, tento článek pro vás nejspíš bude jen takové osvěžení pojmů. Pokud naopak vůbec netušíte, která bije, náš malý příběh vám snad ulehčí vstup do oblasti, která je jinak už lehce abstraktní a je v ní, hrůzo, hrůzo, potřeba i malinká špetka matematiky.

## Pohádka začíná

Bylo nebylo, za sedmero horami a sedmero řekami, ve středu Evropy byla země zvaná Česko. V této jinak klidné a mírumulovné krajině dlouhá léta bublal svár mezi dvěma hlavními oblastmi zvanými Čechy a Morava. Moravené úpěli a trpěli pod krutou nadvládou Čechů, kteří neznali jiného, než honbu za bohatstvím a mamonem. Moravané byli naopak lidé čistého srdce a hluboké duše a s odporem se ohlíželi k bezvěrné a světskými požitky prohnilé Praze. Brňáci vzhlíželi ke svému Špilasu a snili o tom, jak budou chlastat slivovicu po deckách, jíst knedlíky se švestkama a ve svých národních krojích tančit a pět písně o lásce a přírodě.

I jednoho dne došla Moravanům trpělivost a odhodlali se k vyhlášení nezávislosti. Aby se dostatečně odlišili od pokleslých Čecháčků a zmátli jejich proradné špehy, rozhodli se, že budou počítat jiným způsobem, než bylo doposud zvykem. Namísto desítkové soustavy, kterou používali Češi, se rozhodli pro takzvanou dvanáctkovou soustavu.

## Počítání do deseti

Před vyhlášením nezávislosti Moravy bylo v Česku, stejně jako ve zbytku civilizovaného světa, obvyklé počítat v takzvané _desítkové soustavě_. To znamená, že všechna čísla se zapisují pomocí deseti číslic od 0 do 9 a počítáme od jedné do deseti. Tento systém historicky souvisí s tím, že lidé mají na rukou deset prstů a tak se jim nejvíce hodilo počítat právě desítkově.

::fig{src=assets/hands10.png}

Když jako na základní škole počítáme postupně od jedničky nahoru, máme čísla

1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, ...

Všimněte si, že pro číslo deset už nemáme žádný jednociferný znak a nemáme jinou možnost, než jej zapsat pomocí dvou znaků. Podobná situace nastane po čísle 99, kde musíme přidat třetí číslici a pokračovat od 100. Vznikají nám tak víceciferná čísla.

Vezměme třeba takové úplně obyčejné číslo 3275. Když jej čteme zleva doprava, máme

- tři tisíce, tedy 3 × 1000
- dvěstě, tedy 2 × 100
- sedmdesát, tedy 7 × 10
- pět, tedy 5 × 1

Cifry na jednotlivých pozicích představují každá jiný _řád_. Zprava doleva jsou to jednotky, desítky, stovky, tisíce a tak dále. Každý řád je vždy nějaká mocnina čísla 10. Například stovka je 10^2^ = 10 × 10, tisíc je 10^3^ = 10 × 10 × 10. Prvních několik řádů a jejich názvy vidíte v tabulce níže.

| Mocnina | Celkem    | Název       |
|---------|-----------|-------------|
| 10^0^   | 1         | jedna       |
| 10^1^   | 10        | deset       |
| 10^2^   | 100       | sto         |
| 10^3^   | 1 000     | tisíc       |
| 10^4^   | 10 000    | deset tisíc |
| 10^5^   | 100 000   | sto tisíc   |
| 10^6^   | 1 000 000 | milion      |

Celkově tedy číslo 3275 můžeme rezepsat jako 3 × 1000 + 2 × 100 + 7 × 10 + 5 × 1.

## Počítání do dvanacti

Moravané jsou lidé výjimečné tvořiví a také zákeřní. Zavedli proto počítání ve _dvanáctkové soustavě_, kde se naopak všechno točí kolem čísla 12. Pro takový způsob počítání je potřeba umět jedním znakem napsat nejen čísla 0 až 9, ale také 10 a 11. Tyto znaky by mělo být snadné napsat a zároveň by se neměly snadno splést s žádným jiným běžně používaným znakem nebo písmenem.

Moravané se po dlouhých diskuzích dohodli, že si vypůjčí znaky z Arménské abecedy. Pro čísla 10 použili znak "vo" `Ո`, pro 11 znak "et" `Ը`. Tyto znaky mají také výhodu v tom, že se dají hezky zobrazit na digitálních displejích.

::fig{src=assets/digits.png}

Co se týče slov pro jednotlivá čísla, při počítání se hezky vyslovuje číslo "deset", ale "jedenáct" je už trochu dlouhé. Moravané si tak pro číslo 11 vymysleli slovo "jedin". Zároveň však mohli použít krásné české slovo "tucet", které se hodí pro číslo 12. A tak se nakonec naučili natruc Čechům počítat takto:

| Zápis | Slovy            | Desítkově |
|-------|------------------|-----------|
| 1     | jedna            | 1         |
| 2     | dva              | 2         |
| 3     | tři              | 3         |
| 4     | čtyři            | 4         |
| 5     | pět              | 5         |
| 6     | šest             | 6         |
| 7     | sedm             | 7         |
| 8     | osm              | 8         |
| 9     | devět            | 9         |
| Ո     | deset            | 10        |
| Ը     | jedin            | 11        |
| 10    | tucet            | 12        |
| 11    | tucet jedna      | 13        |
| 12    | tucet dva        | 14        |
| 13    | tucet tři        | 15        |
| ...   | ...              | ...       |
| 19    | tucet devět      | 21        |
| 1Ո    | tucet deset      | 22        |
| 1Ը    | tucet jedin      | 23        |
| 20    | dvatucet         | 24        |
| 21    | dvatucet jedna   | 25        |
| ...   | ...              | ...       |
| 29    | dvatucet devět   | 33        |
| 2Ո    | dvatucet deset   | 34        |
| 2Ը    | dvatucet jedin   | 35        |
| 30    | třitucet         | 36        |
| 31    | třitucet jedna   | 36        |
| ...   | ...              | ...       |
| Ո9    | desettucet devět | 129       |
| ՈՈ    | desettucet deset | 130       |
| ՈԸ    | desettucet jedin | 131       |
| Ը0    | jedintucet       | 132       |
| Ը1    | jedintucet jedna | 133       |
| ...   | ...              | ...       |
| Ը9    | jedintucet devět | 141       |
| ԸՈ    | jedintucet deset | 142       |
| ԸԸ    | jedintucet jedin | 143       |
| 100   | gros             | 144       |

S čísel ve dvanáctkové soustavě se vám ze začátku může pořádně zatočit hlava. Je potřeba si zvyknout na to, že po čísle 9 (devět) vždy následuje ještě číslo Ո (deset) a po něm Ը (jedin). Až pak se dostaneme k prvnímu dvojcifernému číslu, které se sice píše 10, ale znamneá "tucet". Analogicky pak po čísle ԸԸ (jedintucet jedin) následuje první trojciferné číslo 100, které Moravané pojmenovali "gros", protože jim české slovo "veletucet" bylo příliš dlouhé.

Počítání do dvanácti jinak také vychází s počítání na prstech. Místo jednotlivých prstů však počítáme články prstů mimo palec. 

::fig{src=assets/hand12.png}

## Převod mezi soustavami

Pro další výklad začíná být nešikovné, že některá čísla ve dvanáctkové soustavě vypadají stejně jako v desítkové soustavě. Například číslo "tucet tři" (13) ve dvánáctkové soustavě vypadá stejné jako číslo třináct (13) v desítkové soustavě. Aby nám z toho nepraskla žilka v mozku, potřebujeme jasně vědět, v jaké soustavě se pohybujeme. Moravné proto zavedli zvyk, že čísla ve dvanáctkové soustavě se píší s indexem ₁₂. Číslo 49₁₂ tedy znamená "čtyřtucet devět", což je v desítkové soustavě 57. Číslo 10₁₂ je "tucet", což je v desítkové soustavě 12. Naopak číslo 10 se ve dvanáctkové soustavě zapisuje jako Ո₁₂.

Moravané rozhodně nejsou pozadu se jmény pro jednotlivé řády. Jen místo mocniny deseti používají mocniny dvanácti. Názvy řádů ve dvanáctkové soustavě vymysleli takto:

| Mocnina | Desítkově | Dvanáctkově | Název  |
|---------|-----------|-------------|--------|
| 12^0^   | 1         | 1₁₂         | jedna  |
| 12^1^   | 12        | 10₁₂        | tucet  |
| 12^2^   | 144       | 100₁₂       | gros   |
| 12^3^   | 1 728     | 1 000₁₂     | kámen  |
| 12^4^   | 20 736    | 10 000₁₂    | kopec  |
| 12^5^   | 248 832   | 100 000₁₂   | ranec  |
| 12^6^   | 2 985 984 | 1 000 000₁₂ | meloun |

Vezměme si tak třeba číslo 1Ո8Ը₁₂, což přečteme jako "kámen deset grosů osmtucet jedin". Toto číslo se rozloží jako:

- jeden kámen, tedy 1 × 1728
- deset grosů, tedy 10 × 144
- osmtucet, tedy 8 × 12
- jedin, tedy 11 × 1

Dohromady tedy 1Ո8Ը₁₂ = 1728 + 1440 + 96 + 11 = 3275. A máme zpět číslo, které jsme si před chvílí ukázali v desítkové soustavě.

Zde jsou další příklady:

- 97₁₂ (devěttucet sedm) = 9 × 12 + 7 × 1 = 108 + 7 = 115
- 2Ո3₁₂ (dva grosy desettucet tři) = 2 × 144 + 10 × 12 + 3 × 1 = 288 + 120 + 3 = 411
- ԸՈՈԸ₁₂ (jedin kamenů deset grosů desettucet jedin) = 11 × 1728 + 10 × 144 + 10 × 12 + 11 × 1 = 19008 + 1440 + 120 + 11 = 20579

## Proč to všechno?

Nápad počítat ve dvanáctkové soustavě může na první počtení působit bláznivě. Není ovšem vůbec náhoda, že

- rok má 12 měsíců a zvěrokruh má 12 znamení,
- den má 2 × 12 hodin,
- hodina má 60 minut a minuta 60 sekund, což je 5 × 12,
- hudební stupnice má 12 tónů.

Rozdělení časových jednotek na dvanáct dílů pochází od starých Egypťanů, kteří v té době opravdu používali dvanáctkovou soustavu a počítali pomocí článků na prstech jedné ruky.

V principu nám nic nebrání mít číselnou soustavu o libovolném základu. Například postavičky ze seriálu Simpsonovi mají prokazatelně na rukou pouze čtyři prsty, takže by se jim určitě hodila osmičková soustava místo desítkové. Kdyby naopak počítali články prstů jako Egypťané, měli by soustavu devítkovou.

::fig{src=assets/homer.jpg}

Ať už je však náš příběh o souboji Moravy a Čech jakkoliv sugestivní, nakonec asi Moravácí přeci jen převrat neplánují a už vůbec si tajně nahýčkají vlastní číselnou soustavu. U programátorů je však situace jiná. Ve světě software se totiž setkáme minimálně se třemi číselnými soustavami:

- **Dvojková (Binární soustava)** o základu 2 - používá se pro ukládání a přenos dat úplně ve všech digitálních zařízeních.
- **Šestnáctková (Hexadecimální soustava)** se základem 16 - používá se pro lidsky čitelný zápis dat. Například barvy v HTML jako `#FFA500` jsou čísla v šestnáctkové soustavě.
- **Čtyřiašedesátková (base64)** se základem 64 - používá se pro kódování binárních dat do textové podoby. Například identifikátor videa na YouTube jako `dQw4w9WgXcQ`, který vidíte v URL adrese, je číslo v čtyřiašedesátkové soustavě. Schválně zkuste toto video na YouTube najít.

O dvojkové a šestnáctkové soustavě si podrobně povíme v dalším dílu této série. Dozvíte se, co jsou to bity, bajty, nuly a jedničky a proč vlastně má smysl tomuhle všemu aspoň trošku rozumět. 
