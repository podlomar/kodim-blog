---
title: Co jsou to bity a bajty
lead: Proč se říká, že počítače pracují s nulami a jedničkami a co jsou to bity, bajty nebo kibibajty.
author:
  name: Martin Podloucký
  link: https://www.linkedin.com/in/martin-podlouck%C3%BD-5b415268
  avatar: https://avatars.githubusercontent.com/u/4608335
date: 2024-06-12
draft: true
---

Tento článek je třetím dílem několikadílné série pro začínající programátory o tom, jak počítače pracují s daty.

- [V prvním díle](https://kodim.cz/blog/clanky/prace-s-daty) jste se dozvěděli, že všechny možné druhy dat jsou vždy jen hromady malých čísel.
- [Ve druhém díle](https://kodim.cz/blog/clanky/ciselne-soustavy) jsme si vyprávěli příběh o číselných soustavách, díky kterému už tušíte, že počítače pracují v jiné soustavě než my lidé.

Máme tak všechno krásně připraveno, abychom se konečně dostali k jádru pudla a podívali se, co se skrývá za často omýlaným tvrzením, že **počítače pracují s nulami a jedničkami**.

## Skladování a přenos dat

Když pracujeme se všemi možnými druhy dat, jako jsou texty, obrázky, audio a video, vždycky chceme taková data umět jednak někde skladovat, jednak někam posílat.

Na ukládání dat používáme spousty různých technologii, většinu z nich jste jistě už někde potkali:

- operační paměť (RAM) uvnitř počítače, která je velmi rychlá, ale data v ní jsou uložena jen do restartu počítače nebo mobilního telefonu,
- pevný disk (harddisk), který je pomalejší, ale data na něm zůstávají i po vypnutí počítače,
- flash paměti vhodné pro fyzické přenášení dat mezi zařízeními,
- optická média jako CD, DVD nebo Blu-ray disky,
- dnes už zastaralé způsoby ukládání jako diskety, magnetické pásky nebo dokonce děrné štítky.

Pokud chceme naopak data přenášet z místa na místo, používáme

- elektrické vodiče uvnitř počítače pro přenos dat mezi jednotlivými komponentami jako procesor, pamět, grafická karta nebo disk,
- bezdrátové technologie jako Wi-Fi, Bluetooth nebo mobilní sítě (GSM, 5G),
- optické kabely pro rychlé přenosy dat v rámci počítačových sítí.

Teď to skoro vypadá, že vás ze všech těchto technologií čeká nějaká drsná zkouška. Nebojte! Tento výčet uvádíme jen pro představu, jak různorodé všemožné technologie můžou být. Pokud chceme najít dobrý způsob pro kódování dat jak pro ukládání tak pro přenus, musíme vymyslet něco opravdu univerzálního a jednoduchého.

## Jedničky a nuly

Teď konečně přichází myšlenka za všechny prachy. Jak už jsme viděli, pro reprezentaci jakýchkoliv dat nám stačí umět zakódovat tato data jako malá čísla. Navíc z našeho příběhu o číselných soustavých víme, že čísla můžeme zapisovat pomocí deseti cifer, ale taky klidně třeba dvanácti jako Moraváci nebo osmi jako Simmpsonovi.

S odvážným nápadem však už v roce 1689 přišel Německý matematik [Gottfried Wilhelm Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz). Ten v takhle dávných dobách samozřejmě neměl o počítačích ani páru. Stejně ho ale napadlo, že by mohlo být výhodné používat pro reprezentaci čísel **pouze dvě cifry**. Tedy cifry 0 a 1.

::fig{src=assets/leibniz.jpg}

Tím vznikla takzvaná __binární soustava__ nebo také __dvojková soustava__. Funguje na stejných principech jako už známe z desítkové nebo osmičkové soustavy, jen budeme mít cifer zatraceně málo.

- V desítkové soustavě máme cifry 0 až 9. Po čísle 9 (devět) nám všechny dojdou a musíme začít skládat dvouciferná čísla 10 (deset), 11 (jedenáct), 12 (dvanáct), atd.
- V osmičkové soustavě máme pouze cifry 0 až 7 a dvouciferná čísla musíme začít skládat už pro 10 (osm), 11 (devět), 12 (deset), atd.

Ve dvojkové soustavě však máme v nabídce pouze cifry 0 a 1. Dojdou tedy hodně rychle. Už číslo „dva“ musíme zapsat jako 10 a číslo  „tři“ jako 11. Tím jsme dost rychle vyčerpali všechna dvojciferná čísla a musíme už začít skládat trojciferná. Tabulka prvních několika čísel v binární soustavě tak vypadá takto:

| Desítkově | Binárně |
|-----------|---------|
| 0         | 0       |
| 1         | 1       |
| 2         | 10      |
| 3         | 11      |
| 4         | 100     |
| 5         | 101     |
| 6         | 110     |
| 7         | 111     |
| 8         | 1000    |
| 9         | 1001    |
| 10        | 1010    |
| 11        | 1011    |
| 12        | 1100    |
| 13        | 1101    |
| 14        | 1110    |
| 15        | 1111    |
| 16        | 10000   |

## Bity a bajty

Všechna data jaká si umíme představit se tedy nakonec uloží nebo přenesou jako nějaký surový blok nul a jedniček, například takovýto:

```
0100101001100101011011000110010101101110011011110111011001101001001000000111000001101001011101100110111100100000011011100110010101101100011001010110101000100001
```

Jednotlivým cifrám v takovém bloku říkáme _bity_. Slovo bit pochází z anglického _binary digit_, tedy _dvojková číslice_. Bit je nejmenší jednotkou informace, kterou počítač dokáže zpracovat. Výše uvedený blok obsahuje přesně 160 bitů.

V našem ukázkovém bloku bitů je zakódována posloupnost nějakých čísel. Jak ale poznáme, kde jedno číslo končí a druhé začíná? Abychom si vždy byli jistí, dohodneme se, že budeme každý blok dat vizuálně dělit na menší části po osmi bitech.

```
01001010 01100101 01101100 01100101 01101110 01101111 01110110 01101001 00100000 01110000 01101001 01110110 01101111 00100000 01101110 01100101 01101100 01100101 01101010 00100001
```

Jednomu takovému osmibitovému bloku pak budeme říkat česky _bajt_, anglicky _byte_. Slovo byte vychází z anglického _by eight_. Náš ukázkový blok tak obsahuje přesně 20 bajtů. Když je převedeme zpátky do desítkové soustavy, dostaneme následující posloupnost čísel:

```
74 101 108 101 110 111 118 105 32 112 105 118 111 32 110 101 108 101 106 33
```

Pokud si tyto čísla převedeme zpět do znaků získáme už známý text:

```
Jelenovi pivo nelej!
```

Největší binární číslo, které můžeme zapsat pomocí osmi bitů je 11111111, tedy desítkově 255. Do jednoho bajtu se nám tedy vždy vejde pouze jedno číslo v rozmezí 0 až 255. Konečně tak dostáváme odpověď na otázku, proč jsme už od samého začátku chtěli všechna data rozsekat na malá čísla v rozmezí 0 až 255. 

## Proč právě 8 bitů?

Kde jsme přišli na to, že osm bitů je ideální délka pro jeden bajt? K tomuto rozhodnutí došlo v polovině 70. let minulého století, kdy společnost IBM začala vyrábět počítač [System/360](https://en.wikipedia.org/wiki/IBM_System/360), což byl první komerční počítač určený jak pro vědecké tak pro podnikové účely. Tehdy v IBM soupeřily dva návrhy na délku bajtů. Jeden návrh byl používat 6 bitů na bajt, druhý návrh byl pro 8 bitů. Nakonec z různých technických důvodů zvítězil návrh s osmi bity.

::fig{src=assets/system-360.jpg}

Na tomto příkladu je dobře vidět, že přestože informační technologie často považujeme za symbol moderní doby, většina principů, na kterých počítače stojí a fungují, jsou staré více než půl století nebo pocházejí dokonce ze 17. století.

## Paměťové jednotky

Jak už jsme si řekli na začátku, data chceme jednak ukládat do paměti, jednak přenášet pomocí různých telekomunikančích prostředků. Abychom vyjádřili, kolik dat dokážeme někam uložit nebo poslat, používáme jednotky odvozené od bitů a bajtů.

Když data ukládáme do paměti, jako základní jednotkou používáme jeden bajt. Tuto jednotku značíme velkým písmenem B. Pro větší objemy dat pak používáme násobky jako kB (kilobajt), MB (megabajt) nebo GB (gigabajt). Teď je ovšem třeba se připravit na pořádny podraz. Z běžného žívota jsem zvyklí, že kilometr je tisíc metrů a třeba megawatt je milion wattů. Z technických důvodů souvisejících s adresováním RAM pamětí, se však jeden kilobajt historicky počitá ne jako 1000 bajtů, ale jako 1024 bajtů. Stejně tak jeden megabajt je 1024 kilobajtů a jeden gigabajt je 1024 megabajtů. 

Když si tedy například do svého počítače koupíte pamět RAM s kapacitou 8 GB, dostanete za své peníze přesně 8 589 934 592 bajtů. 

Zmatení však, milé děti, nekončí. Když totiž data přenášíme po síti, používáme jednotky odvozené od bitů. Základní jednotkou je tedy jeden bit, který značíme malým písmenem b. Pro větší objemy dat pak používáme násobky jako kb (kilobit), Mb (megabit) nebo Gb (gigabit). Lidé od telekomunikací nemusí řešit žádné technologie kolem adresování pamětí, takže většinou počítají jeden kilobit standardně jako 1000 bitů, jeden megabit jako 1000 kilobitů a tak dále. 

Například český operátor Vodafone v době psaní tohoto článku nabízí tři tarify pro domácí internet s rychlostmi 250 Mb/s, 500 Mb/s a 1 Gb/s. To znamená, že v nejpomalejším tarifu můžete přenést 250 000 000 bitů za sekundu. Když toto číslo vydělíme osmi, dostaneme 31 250 000 bajtů za sekundu, což je 31.25 MB/s pokud počítáme v násobcích 1000, nebo 29.8 MB/s pokud počítáme v násobcích 1024.

::fig{src=assets/vodafone.png}

Je vidět, že pokud objem dat počítáme v násobcích 1024, přenesová rychlost vypadá menší. Tohoto si už dávno povšimnuli i výrobci pevných disků. Když vyrobí disk o velikosti přesně 1 000 000 000 bajtů, přepočteno podle násobků 1024 by takový disk měl kapacitu 0.93 TB. To se na krabici s novým diskem špatně vyjímá. Takže výrobci pevných disků začali také uvádět kapacitu disků v násobcích 1000, tedy jeden kilobajt počítají jako 1000 bajtů, nikoliv jako 1024.

## Chcete se zbláznit?

Pokud se bavíme o přenosové rychlosti vašeho připojení k interntu, tak tu ovlivňuje asi tak milion různých faktorů. Takže pokud váš operátor avízuje rychlost 31.25 MB/s, a ve skutečnosti je to jen 29.8 MB/s, tak je to vlastně úplně jedno.

Pokud však jste někdo, kdo chce přesně vyjadřovat objemy dat například v technických nebo vědeckých textech, tak se z nejasností ohledně velikosti předpon kilo, mega a giga můžete tak akorát střelit do hlavy.

Mezinárodní standardizační komise IEC se proto v roce 1998 rozhodla udělat ve věcech pořádek. V podstatě řekla, že předpony kilo, mega a giga by se měli používat pro násobky 1000 jako ve všech ostatních oborech. Pro násobky 1024 pak zavedli speciální veselé předpony kibi, mebi a gibi. Kibi (KiB) od spojení _kilo binary_, mebi (MiB) od _mega binary_ atd. Oznančení pro násobky 1024 tedy vypadá takto:

- 1 KiB = 1024 B
- 1 MiB = 1024 KiB
- 1 GiB = 1024 MiB

Správně by tedy výrobci RAM pamětí měli uvádět jejich kapacitu v jednotkách GiB místo GB. Většina z nich na to ale samozřejmě kašle. Zároveň pperátoři by měli uvádět rychlosti připojení k internetu v jednotkách Mb/s a myslet tím 1 000 000 bitů za sekundu. Jestli to ale tak skutečně myslí ví jen Bůh nebo v lepším případě marketingové oddělení.




