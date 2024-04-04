---
title: Jak počítače pracují s daty
lead: Jak počítače převádějí texty, obrázky, video nebo audio na čísla, aby je mohly uložit do paměti nebo poslat po síti.
author:
  name: Martin Podloucký
  link: https://www.linkedin.com/in/martin-podlouck%C3%BD-5b415268
  avatar: https://avatars.githubusercontent.com/u/4608335
date: 2024-03-17
---

Tento článek začiná několikadílnou sérii pro začínající programátory, kteří se chtějí zorientovat v tom, jak počítače interně pracují s daty. 

Během svojí práce nebo studia jste už možná narazili na některé z těchto problémů:

- Máte načíst kus binárního souboru z disku nebo ze sítě a vlastně vám úplně není jasné, co to vlastně binární soubor je, co to jsou bity a bajty a kde se vlastně vzaly.
- Někde na vás vybafly tajemné shluky čísal a písmen v hexadecimálním formátu jako `0b10e7888dee8539917fd84870d28a70` a netušíte, kde se takové věci berou a proč vůbec někdo chce kombinovat čísla a písmena.
- Snažíte se přečíst textový soubor, ale všechny diakritické znaky vypadají jako rozsypaná rýže a začnete se ztrácet v pojmech jako UTF-8, ASCII, nebo Unicode.
- Žonglujete s různými formáty obrázků a zajímá vás, co to technicky znamená, že je obrázek uložený jako JPEG, PNG, nebo GIF.

Všechny tyto pojmy si postupně vysvětlíme do dostatečné hloubky, abyste se nemuseli při konverzaci se zkušenějšími kolegy cítit jako spadlí z višně a mohli se pustit do různých technických problémů s větší jistotou.

## Data jsou čísla

Slovem _data_ v tomto případě rozumíme cokoliv, co se dá uložit do nějaké počítačové paměti (pevný disk, RAM, flashka...) nebo poslat po drátovém, optickém nebo bezdrátovém spojení. Tedy například:

- všechna textová data (HTML, JSON, CSV...),
- binární soubory různých formátů (PDF, ZIP, TAR...),
- obrázky (JPEG, PNG, GIF...),
- videa (MP4, AVI, MKV...),
- zvukové soubory (MP3, WAV, FLAC...),
- spustitelné programy a knihovny (DLL, EXE, SO...),
- a spousta dalšího.

Hlavní myšlenka ukládání dat v počítači spočívá v tom, že počítačová paměť je v zásadě velká krabice na čísla. Všechno, co se do ní ukládá, se tak musí nakonec nějakým způsobem převést na posloupnost relativně malých čísel. Každé takové číslo musí být v rozmezí 0&nbsp;-&nbsp;255, aby se vešlo do jedné paměťové buňky. Takovému číslu říkáme :term{en=byte cs=bajt}.

Proč je rozsah jednoho bajtu jen 0&nbsp;-&nbsp;255 si řekneme v dalším díle této série. Předtím alespoň naznačíme, jak se různé druhy dat převedou na bajty a do detailu se každému formátu budeme věnovat v dalších článcích.

## Textová data

U textových dat máme úkol zdánlivě docela snadný. Každý kousek textu se skládá z jednotlivých znaků. Nabízí se tedy každý znak zakódovat jako jeden bajt. Řekneme tak, že například písmeno `A` dostane číslo `65`, písmeno `z` čísla `122`, a tak dále. Textový řetězec `Jelenovi pivo nelej!` se tak převede na posloupnost čísel takto:

::fig{src=assets/jelen.png}

Samozřejmě, skutečný život není nikdy tak jednoduchý a rád nám hází klacky pod nohy. Různé světové jazyky používají různé podivné znaky jako třeba `č`, `ř`, `ö`, `ß`, `ç`, `þ` a to jsme ještě ani nezavítali do Číny nebo Japonska. Celosvětově je znaků tolik, že by se nám do rozsahu 0 - 255 rozhodně nevešly. Tento problém se snaží řešit různé způsoby kódování znaků jako ASCII nebo UTF-8, na které si posvítíme v dalších článcích.

## Obrázky

Při kódování obrázků využijeme toho, že počítačové monitory zobrazují obraz pomocí malých barevných bodů, které nazýváme _pixely_. Každý pixel je malý čtvereček, který může mít libovolnou barvu. Toto je například macro fotografie ikonky tohoto webu na monitoru počítače:

::fig{src=assets/pixely.jpg}

Když se zadíváte pozorně, možná si všimnete, že každý pixel se skládá ze tří barevných složek: červené, zelené a modré. Na obrázku níže jsou jednotlivé složky vidět ještě lépe:

::fig{src=assets/barevne-slozky.jpg}

Barvu pixelu tak můžeme popsat pomocí tří čísel, která určují, jak moc má svítit jeho červená, zelená a modrá část. Ano, uhodli jste: každou barevnou složku zakódujeme do jednoho bajtu, tedy jako číslo v rozsahu 0&nbsp;-&nbsp;255. Tomuto rozpětí už nikdy neunikneme.

Samozřejmě čím více pixelů použijeme, tím detailnější budeme mít obraz. Příklad různých rozlišení je vidět na následujícím obrázku:

::fig{src=assets/smajlici.png}

Kdybychom vzali například 6.&nbsp;řádek z obrázku s rozlišením 16x16 pixelů, zakódování barev do tří složek by vypadalo takto:

::fig{src=assets/radek.png}

Jak už jsme zvyklí, v praxi nás vždy něco kousne do zádi. Kódování barev do tří složek je sice jednoduché, ale vytváří obrovské množství dat. Například full HD obrázek o velikost 1920x1080 pixelů by při tomto způsobu kódování zabíral cca 6&nbsp;MB (6 milionů bajtů) paměti. To je například pro účely webových stránek ohromně moc. Používají se proto různé způsoby komprese, které se snaží snížit množství dat, aniž by se příliš zhoršila kvalita obrazu. O nich si také povíme v dalších článcích.

## Video

S videem to máme myšlenkově docela jednoduché, protože video je jen série obrázků, které se zobrazují rychle za sebou. Samozřejmě hned narazíme ještě na brutálnější problém s objemem dat. U videí je běžné zobrazovat 30 snímků za vteřinu. Kdybychom nedejbože ukládali každý obrázek bez komprese, 1&nbsp;minuta full HD videa by zabrala cca 10&nbsp;GB paměti. I kdyby se nám povedlo každý snímek zvlášt zkomprimovat na desetinu jeho původní velikosti, stále bychom měli 1&nbsp;GB na každou minutu videa. Při takhle zabijáckém datovém toku byste si na Netflixu nebo na YouTube nic moc nepustili.

Videa proto používají ještě drsnější kompresní techniky, které se například snaží využít toho, že se většina snímků v průběhu videa jen málo liší od snímku předchozího. O těchto technikách si také povíme v dalších článcích.

## Audio

U kódování audia je třeba se na chvíli vrátit do hodin středoškolské fyziky a vzpomenout si, že zvuk vzniká kmitáním nebo-li stlačováním a rozpínámím vzduchu. Toto vzduchové vlnění se šíří od zdroje, například reproduktoru počítače, k uchu posluchače.

::fig{src=assets/loudspeaker-waveform.gif}

Kmitání vzduchu je u většiny běžných zvuků relativně rychlé. Lidské ucho dokáže vnímat zvuky v rozsahu 20 - 20&nbsp;000 kmitů za vteřinu. Pusťte si například [zvuk zvonku](assets/ding.mp3), který má cca 2&nbsp;500 kmitů za vteřinu a trvá přesně jednu vteřinu.

Malíčký výsek zvukové vlny zvonku si můžeme zobrazit na grafu, který ukazuje 25 kmitů v rámci 10&nbsp;ms, tedy jedné setiny sekundy:

::fig{src=assets/wave.png}

Pokud chceme tuto vlnu zakódovat do bajtů, musíme ji rozsekat na vzorky, podobně jako jsme sekali obraz na pixely. Každý vzorek bude číslo od 0 do 255 udávající, jak moc se vzduch v daném okamžiku stlačuje nebo rozpíná. Stejně jako u obrazu, čím víc máme vzorků, tím kvalitněji můžeme zvuk zakódovat.

Takto by například vypadala zvuková vlna rozsekaná do 8&nbsp;000 vzorků za sekundu, tedy 80 vzorků za 1/100 sekundy. To je kvalita, kterou používají například některé telefonní hovory.

::fig{src=assets/sampling1.png}

Toto určitě není moc dobrá kvalita zvuku. Porovnejte [hlas Morgana Freemana](assets/freeman.mp3) v originální kvalitě a v kvalitě [8&nbsp;000 vzorků za sekundu](assets/freeman2.mp3).

Kdybychom chtěli kvalitnější zvuk, můžeme zvýšit vzorkovací frekvenci na 16&nbsp;000 vzorků za sekundu:

::fig{src=assets/sampling2.png}

nebo na 32&nbsp;000 vzorků za sekundu:

::fig{src=assets/sampling3.png}

Pro slušnou kvalitu bychom ale chtěli mít alespoň 44&nbsp;100 vzorků za sekundu a dva bajty na vzorek. To je kvalita, kterou používají například audio&nbsp;CD. Pokud máme stereo nahrávku v této kvalitě, zabere jedna minuta zvuku cca 10&nbsp;MB paměti. To je sice mnohem méně než u videa, ale stále je to docela dost. Proto se i zvukové soubory komprimují, například do formátu MP3.

## Závěr

Všechny základní druhy dat jsme proletěli jen tak letem světem, abyste si vytvořili nějaké úplně základní povědomí o tom, co všechno se při ukládání a přenášení dat řeší za problémy. V [dalším díle](/blog/clanky/ciselne-soustavy) se pořádně podíváme na číselné soustavy, abychom si připravili půdu pro bity a bajty, nuly a jedničky.
