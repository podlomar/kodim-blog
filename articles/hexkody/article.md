---
title: Binární data a hex kódy
lead: Jak programátoři pracují s binárními daty, jak se binárně ukládají čísla a jak fungují tajemné hex kódy
author:
  name: Martin Podloucký
  link: https://www.linkedin.com/in/martin-podlouck%C3%BD-5b415268
  avatar: https://avatars.githubusercontent.com/u/4608335
date: 2024-07-05
---

Tento článek je čtvrtým dílem několikadílné série pro začínající programátory o tom, jak počítače pracují s daty.

- [V prvním díle](https://kodim.cz/blog/clanky/prace-s-daty) jste se dozvěděli, že všechny možné druhy dat jsou vždy jen hromady malých čísel.
- [Ve druhém díle](https://kodim.cz/blog/clanky/ciselne-soustavy) jsme si vyprávěli příběh o číselných soustavách, díky kterému už tušíte, že počítače pracují v jiné soustavě než my lidé.
- [Ve třetím díle](https://kodim.cz/blog/clanky/bity-bajty) jste konečně viděli, jak se data ukládají a přenášejí pomocí jedniček a nul.

Dnes si povíme o tom, jak se s binárními daty v reálné praxi pracuje a co jsou to hexadecimální čísla. Konečně se tak dozvíte například to, proč se barvy v CSS a jiných grafických programech často zapisují jako kódy typu `#ff64a1`.

## Binární data

Jako běžní uživatelé všechna data konzumujeme v jejich přirozené formě. Napínavé texty si čteme, audio podcasty posloucháme při uklízení, na obrázky spoře oděných slečen chlípně zíráme a tak dále. Jak už víme, všechna tato data jsou nakonec jen brutální proudy nul a jedniček. Jako programátoři se občas potřebujeme na taková data podívat přímo v této syrové podobě. Říkáme pak, že pracujeme s _binárními daty_.

Pro příklad si znovu prohlédněte našeho smajlíka z prvního článku.

::fig{src=assets/crazy-16.png}

Rozlišení tohoto obrázku je 16x16 pixelů. Zde je 16x zvětšený, abyste dobře viděli jednotlivé pixely. Když tento obrázek uložíme v dnes již trochu zastarelém formátu BMP, dostaneme soubor o velikosti 822 bajtů. Formát BMP použijeme proto, že nemá žádnou kompresi, což nám dost usnadní život. Výsledný soubor si můžete [stáhnout zde](assets/crazy-16.bmp).

Když se chceme podívat, co náš soubor obsahuje, zobrazíme si jej jako binární data. Na každý řádek vypíšeme 8 bajtů. Pro lepší orientaci každý řádek uvedeme pořadovým číslem bajtu, kterým řádek začíná. Samozřejmě jako správní programátoři číslujeme od nuly.

```
  0: 01000010 01001101 00110110 00000011 00000000 00000000 00000000 00000000
  8: 00000000 00000000 00110110 00000000 00000000 00000000 00101000 00000000
 16: 00000000 00000000 00010000 00000000 00000000 00000000 00010000 00000000
 24: 00000000 00000000 00000001 00000000 00011000 00000000 00000000 00000000
 32: 00000000 00000000 00000000 00000011 00000000 00000000 00010011 00001011
 40: 00000000 00000000 00010011 00001011 00000000 00000000 00000000 00000000
 48: 00000000 00000000 00000000 00000000 00000000 00000000 11111111 11111111
 56: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
 64: 11111111 11111111 11111111 11111111 11111111 11111101 11111110 11111110
 72: 11101110 11101101 11111011 11001100 11000010 11111000 11000011 10110111
 80: 11110111 11011100 11010111 11111001 11111011 11111011 11111110 11111111
 88: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
 96: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
104: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111100
112: 11111101 11111110 11011010 11100100 11110010 10011111 10111000 11011111
120: 10100000 10010011 11110100 10100100 10000110 11111101 10100101 10000111
128: 11111110 10100010 10000111 11111011 10101001 10110000 11101100 11010101
136: 11100001 11110000 11111011 11111100 11111110 11111111 11111111 11111111
144: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
152: 11111111 11111111 11111111 11111111 11110111 11111010 11111101 10110000
160: 11001000 11100101 01000100 10001110 11001010 01001001 01110101 11000001
168: 10011110 10000011 11111010 10101101 10001110 11111111 10101101 10001110
176: 11111110 10101001 10001011 11111110 01111110 01111111 11100100 00111100
184: 10001010 11001000 10101000 11000010 11100010 11110100 11110111 11111011
192: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
200: 11111111 11111011 11111101 11111110 10101111 11001001 11100111 00101011
208: 10001101 11001010 00010011 01011111 10001111 01000000 00111101 01111001
216: 10010011 01110111 11101011 10100011 10000101 11111010 10100011 10000101
224: 11111010 10100010 10000101 11111010 01110111 01100110 11000101 00010100
232: 01011101 10001110 00100100 10000111 11000101 10011111 10111111 11100010
240: 11111000 11111010 11111101 11111111 11111111 11111111 11111111 11111111
248: 11111111 11010100 11100011 11110011 00111111 10011010 11010110 00011011
256: 01101111 10100010 01110010 01110101 01111011 10010100 10010100 10011111
264: 10011001 10010001 11000100 10001111 10000001 11001010 01111100 01101001
272: 11000010 01110011 01011100 11000011 01001111 01000000 10001110 00001111
280: 00011001 00110000 00010100 01011011 10001000 00110001 10010010 11001111
288: 11000111 11011010 11101111 11111111 11111111 11111111 11111001 11111011
296: 11111110 10001011 10111010 11100100 00100100 10011001 11010111 00110111
304: 10001101 11000000 10011011 10110011 11001001 11001001 11010010 11011011
312: 11011110 11100001 11100101 11100001 11100011 11100111 11011001 11011010
320: 11100000 11000111 11001000 11010001 10100001 10100010 10101010 01100110
328: 01101001 01110001 00100010 00101101 01000000 00011011 01111100 10110011
336: 01111010 10110001 11100000 11110110 11111001 11111101 11101000 11110000
344: 11111001 01001110 10100111 11011111 00101011 10100100 11011100 00110101
352: 10101000 11011110 01100011 10101111 11011011 01110011 10110011 11011010
360: 01111011 10111001 11011111 10011101 11000101 11100010 10111100 11010011
368: 11100100 11010011 11011110 11101000 11011111 11100100 11101001 11010110
376: 11011000 11011011 10100010 10100100 10100111 00100101 01100101 10001111
384: 01000010 10100001 11011100 11100001 11101100 11111000 11011000 11101000
392: 11110110 00111001 10101100 11100011 00111000 10110001 11100011 10011011
400: 11000100 11011111 11001000 11001101 11010011 10110100 10111100 11000011
408: 10011111 11000110 11100010 01000100 10111100 11101100 01000010 10111100
416: 11101100 01010111 10111100 11101001 01110000 10111101 11100101 10000011
424: 10111111 11100010 10000101 10110100 11010010 00111000 10010000 10111100
432: 00110010 10100110 11011111 11001110 11100001 11110100 11010111 11101001
440: 11111000 01000001 10111000 11101100 01010101 10111101 11101010 11010100
448: 11011101 11100100 11001000 11001000 11001000 10100001 10100011 10100101
456: 11011001 11100010 11101011 01101000 11000111 11110001 01111011 11000111
464: 11101110 10111100 11010101 11100111 11000010 11010101 11100010 10010011
472: 11000101 11100010 01001010 10111111 11101111 00111110 10111011 11101101
480: 00111011 10110011 11101000 11001001 11100001 11110101 11100011 11110001
488: 11111100 01010110 11000101 11110111 01011000 11000111 11110101 11001101
496: 11011011 11100011 11110111 11110111 11110111 11111000 11111001 11111001
504: 11100000 11101010 11110001 01111101 11001011 11110000 11010100 11100010
512: 11101110 11011001 11011011 11011100 11100111 11100111 11100111 11100101
520: 11100110 11100111 10001011 11000111 11100111 01001000 11000110 11110111
528: 01001000 11000000 11110011 11010110 11101001 11111010 11110100 11111010
536: 11111110 01111110 11010100 11111101 01011001 11010100 11111110 10001110
544: 11010001 11101011 11010011 11100001 11101000 11011100 11100111 11101110
552: 10011111 11010101 11101101 10001110 11010101 11110010 11010011 11011000
560: 11011011 01011100 01011110 01100000 10101000 10101001 10101010 11110010
568: 11110010 11110010 10101010 11010000 11100100 01010100 11010000 11111110
576: 01101101 11001110 11111100 11101101 11110110 11111110 11111110 11111111
584: 11111111 10111010 11100111 11111110 01101100 11011011 11111110 01111000
592: 11100010 11111110 01111111 11100011 11111001 01111011 11011111 11111001
600: 01110010 11100011 11111110 10000110 11011100 11110110 11011100 11100011
608: 11101000 10101101 10101110 10101110 11010110 11010110 11010110 11101110
616: 11101111 11110000 10010101 11010011 11101011 01101011 11011001 11111110
624: 10101110 11100010 11111110 11111101 11111110 11111111 11111111 11111111
632: 11111111 11110000 11111001 11111110 10010111 11100101 11111110 10000111
640: 11101011 11111110 10000101 11101110 11111110 10000010 11101111 11111110
648: 01111111 11101110 11111111 01111101 11101100 11111110 10101011 11100100
656: 11110011 11100000 11101100 11110001 11011111 11101001 11101110 10101111
664: 11011010 11101000 10000011 11100100 11111010 10010001 11100011 11111110
672: 11101100 11111000 11111110 11111111 11111111 11111111 11111111 11111111
680: 11111111 11111111 11111111 11111111 11100101 11110111 11111110 10100011
688: 11110000 11111110 10011000 11111001 11111111 10010100 11111010 11111111
696: 10010000 11111010 11111111 10001110 11111010 11111110 10001101 11111000
704: 11111110 10010100 11110010 11111010 10010100 11110000 11111000 10010100
712: 11110101 11111101 10011110 11101111 11111110 11100000 11110101 11111110
720: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
728: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11101110
736: 11111011 11111110 11000010 11111000 11111110 10101001 11111100 11111110
744: 10100110 11111110 11111111 10100100 11111110 11111110 10100100 11111110
752: 11111110 10100110 11111110 11111110 10101000 11111100 11111110 10111101
760: 11111000 11111110 11101001 11111010 11111110 11111111 11111111 11111111
768: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
776: 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111
784: 11111111 11111111 11111100 11111110 11111111 11101100 11111100 11111110
792: 11011001 11111011 11111110 11001111 11111011 11111110 11010001 11111011
800: 11111110 11011010 11111011 11111110 11101011 11111100 11111110 11111011
808: 11111110 11111111 11111111 11111111 11111111 11111111 11111111 11111111
816: 11111111 11111111 11111111 11111111 11111111 11111111 
```

Přestože jsme se snažili si hodně pomoct číslováním a mezerami, dívat se takto přímo na nuly a jedničky je dost otrava. Výpis zabírá strašně místa a těžko se v něm orientuje. Programátoři si proto vymysleli, že pro zobrazování binárních dat budou puožívat ještě další číselnou soustavu.

## Hexadecimální čísla

Jako by všech těch soustav už nebylo tak akorát dost! Běžní smrtelníci počítají v desítkové soustavě, vzpurní Moraváci ve dvanáctkové, Simpsonovi možná v osmičkové a počítače ve dvojkové. Programátorům je to však evidentně pořád málo a zavedli ještě _šestnáctkovou_ nebo-li _hexadecimální_ soustavu. 

Šestnáctková soustava má, jak už název napovídá, šestnáct cifer. Z našeho příběhu o Moravácích už jste zkušení a víte, že bude potřeba vymyslet extra symboly pro cifry větší než 9. Abychom měli život jednoduchý, použijeme prostě písmena abecedy. Čísla v hexadecimální soustavě pak vypadají takto:

| Zápis | Desítkově |
|-------|-----------|
| 1     | 1         |
| 2     | 2         |
| 3     | 3         |
| ...   | ...       |
| 9     | 9         |
| a     | 10        |
| b     | 11        |
| c     | 12        |
| d     | 13        |
| e     | 14        |
| f     | 15        |
| 10    | 16        |
| 11    | 17        |
| ...   | ...       |
| 20    | 32        |
| 21    | 33        |
| ...   | ...       |
| a0    | 160       |
| a1    | 161       |
| a2    | 162       |
| ...   | ...       |
| f0    | 240       |
| f1    | 241       |
| f2    | 242       |
| ...   | ...       |
| fe    | 254       |
| ff    | 255       |

Občas se místo malých písmen používají písmena velká, takže uvidíte čísla jako `B3C` místo `b3c`. To je ale jen otázka vkusu, nemá to žádny praktický význam.

Poslední řádek této tabulky skrývá důvod, proč si programátoři hexadecimální soustavu vlastně vybrali. Poslední dvojciferné číslo `ff` je totiž nejvyšší hodnota, která se vejde do jednoho bajtu. Každý bajt se tak dá v šestnáctkové soustavě zapsat pomocí přesně dvou cifer. To se nám přávě bude hodit při výpisu binárních dat.

Pojďme vylepšit náš výpis smajlíka. Všechny bajty převedeme do hexadecimální soustavy a naskládáme 16 bajtů na řádek. Začátky řádků budeme číslovat také v hexadecimální soustavě. Výpis pak dopadne takto:

```
0000: 42 4d 36 03 00 00 00 00 00 00 36 00 00 00 28 00
0010: 00 00 10 00 00 00 10 00 00 00 01 00 18 00 00 00
0020: 00 00 00 03 00 00 13 0b 00 00 13 0b 00 00 00 00
0030: 00 00 00 00 00 00 ff ff ff ff ff ff ff ff ff ff
0040: ff ff ff ff ff fd fe fe ee ed fb cc c2 f8 c3 b7
0050: f7 dc d7 f9 fb fb fe ff ff ff ff ff ff ff ff ff
0060: ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff fc
0070: fd fe da e4 f2 9f b8 df a0 93 f4 a4 86 fd a5 87
0080: fe a2 87 fb a9 b0 ec d5 e1 f0 fb fc fe ff ff ff
0090: ff ff ff ff ff ff ff ff ff ff ff ff f7 fa fd b0
00a0: c8 e5 44 8e ca 49 75 c1 9e 83 fa ad 8e ff ad 8e
00b0: fe a9 8b fe 7e 7f e4 3c 8a c8 a8 c2 e2 f4 f7 fb
00c0: ff ff ff ff ff ff ff ff ff fb fd fe af c9 e7 2b
00d0: 8d ca 13 5f 8f 40 3d 79 93 77 eb a3 85 fa a3 85
00e0: fa a2 85 fa 77 66 c5 14 5d 8e 24 87 c5 9f bf e2
00f0: f8 fa fd ff ff ff ff ff ff d4 e3 f3 3f 9a d6 1b
0100: 6f a2 72 75 7b 94 94 9f 99 91 c4 8f 81 ca 7c 69
0110: c2 73 5c c3 4f 40 8e 0f 19 30 14 5b 88 31 92 cf
0120: c7 da ef ff ff ff f9 fb fe 8b ba e4 24 99 d7 37
0130: 8d c0 9b b3 c9 c9 d2 db de e1 e5 e1 e3 e7 d9 da
0140: e0 c7 c8 d1 a1 a2 aa 66 69 71 22 2d 40 1b 7c b3
0150: 7a b1 e0 f6 f9 fd e8 f0 f9 4e a7 df 2b a4 dc 35
0160: a8 de 63 af db 73 b3 da 7b b9 df 9d c5 e2 bc d3
0170: e4 d3 de e8 df e4 e9 d6 d8 db a2 a4 a7 25 65 8f
0180: 42 a1 dc e1 ec f8 d8 e8 f6 39 ac e3 38 b1 e3 9b
0190: c4 df c8 cd d3 b4 bc c3 9f c6 e2 44 bc ec 42 bc
01a0: ec 57 bc e9 70 bd e5 83 bf e2 85 b4 d2 38 90 bc
01b0: 32 a6 df ce e1 f4 d7 e9 f8 41 b8 ec 55 bd ea d4
01c0: dd e4 c8 c8 c8 a1 a3 a5 d9 e2 eb 68 c7 f1 7b c7
01d0: ee bc d5 e7 c2 d5 e2 93 c5 e2 4a bf ef 3e bb ed
01e0: 3b b3 e8 c9 e1 f5 e3 f1 fc 56 c5 f7 58 c7 f5 cd
01f0: db e3 f7 f7 f7 f8 f9 f9 e0 ea f1 7d cb f0 d4 e2
0200: ee d9 db dc e7 e7 e7 e5 e6 e7 8b c7 e7 48 c6 f7
0210: 48 c0 f3 d6 e9 fa f4 fa fe 7e d4 fd 59 d4 fe 8e
0220: d1 eb d3 e1 e8 dc e7 ee 9f d5 ed 8e d5 f2 d3 d8
0230: db 5c 5e 60 a8 a9 aa f2 f2 f2 aa d0 e4 54 d0 fe
0240: 6d ce fc ed f6 fe fe ff ff ba e7 fe 6c db fe 78
0250: e2 fe 7f e3 f9 7b df f9 72 e3 fe 86 dc f6 dc e3
0260: e8 ad ae ae d6 d6 d6 ee ef f0 95 d3 eb 6b d9 fe
0270: ae e2 fe fd fe ff ff ff ff f0 f9 fe 97 e5 fe 87
0280: eb fe 85 ee fe 82 ef fe 7f ee ff 7d ec fe ab e4
0290: f3 e0 ec f1 df e9 ee af da e8 83 e4 fa 91 e3 fe
02a0: ec f8 fe ff ff ff ff ff ff ff ff ff e5 f7 fe a3
02b0: f0 fe 98 f9 ff 94 fa ff 90 fa ff 8e fa fe 8d f8
02c0: fe 94 f2 fa 94 f0 f8 94 f5 fd 9e ef fe e0 f5 fe
02d0: ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ee
02e0: fb fe c2 f8 fe a9 fc fe a6 fe ff a4 fe fe a4 fe
02f0: fe a6 fe fe a8 fc fe bd f8 fe e9 fa fe ff ff ff
0300: ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff
0310: ff ff fc fe ff ec fc fe d9 fb fe cf fb fe d1 fb
0320: fe da fb fe eb fc fe fb fe ff ff ff ff ff ff ff
0330: ff ff ff ff ff ff 
```

Přestože tento kus textu vypadá jako úvodní znělka z filmu Matrix, je to mnohem přehlednější forma, jak se podívat na binární data, než vypisovat samotné nuly a jedničky. Navíc si při čtení takového zápisu můžete připadat jako opravdový hacker. Ještě se naučit trochu toho kung-fu a...

::fig{src=assets/matrix.jpg}

## Kódování čísel a endianita

V tomto článku se úplně nechceme zabývat tím, jak přesně funguje formát obrázků BMP. Když už ho tady ale máme, můžeme si na něm ukázat, jak fungují některé technické věci okolo ukládání čísel. Dost často totiž chceme v binárních datech ukládat různá čísla větší než 255. V našem příkladu může jít například o rozměry obrázku, jeho velikost v bajtech apod.

Na první pohled se zdá, že by to nemusel být žádný velký problém. Prostě každé takové číslo převedeme do dvojkové soustavy a rozsekáme na bajty. Například velikost našeho souboru se smajlíkem je 822 bajtů. Číslo 822 se v binární soustavě zapíše jako 1100110110. Když jej rozsekneme na dva bajty, dostaneme `00000011 00110110`. V hexadecimální soustavě to bude `03 36`.

Pokud chceme číslo 822 uložit do paměti, uložíme prostě tyto dva bajty. Tomuto způsobu uložení se říká _big endian_. Tady nás ale zase čeká pořádný podraz. Z toho, že tento zápis má své jméno už asi tušíte, že existuje ještě jiná možnost. Bajty totiž můžeme zapisovat také v **obráceném pořadí**. Číslo 822 pak uložíme jako `36 03`. Tento způsob se jmenuje _little endian_. Nebudu se divit, když vás mírně rozčílí, že existují dva různé způsoby, jak ukládat čísla.

Opět to má své historické důvody. Po síti se většinou data posílají ve formátu _big endian_. Naopak většina procesorů ukládá a čte data v _little endian_ formátu. Pojmy big endian a little endian zavedl v roce 1980 programátor Danny Cohen ve svém článku [On Holy Wars and a Plea for Peace](https://ieeexplore.ieee.org/document/1667115) a pojmenoval je podle boje mezi dvěma frakcemi v románu Gulliverovy cesty. Základní konflikt příběhu stojí na tom, že jedni rozbíjejí skořápku vařeného vejce z většího konce (big end) a druzí z menšího konce (little end).

::fig[Barevný tisk z vydání Gulliverových cest z roku 1860]{src=assets/gulliver.jpg}

## Rozluštění BMP souboru

Teď, když už víme, jak to chodí mezi liliputy, můžeme lépe nahlédnout pod pokličku našeho BMP souboru se smajlíkem. 

Prvních 54 bajtů jsou takzvané :term{cs=hlavičky en=headers}. Ty obsahují různé technické informace o celém obrázku. 

```
0000: 42 4d 36 03 00 00 00 00 00 00 36 00 00 00 28 00
0010: 00 00 10 00 00 00 10 00 00 00 01 00 18 00 00 00
0020: 00 00 00 03 00 00 13 0b 00 00 13 0b 00 00 00 00
0030: 00 00 00 00 00 00
```

- Všechny BMP soubory začínají dvěma bajty `42 4d`. To aby různé programy rychle poznaly, že soubor je BMP obrázek.
- Následující 4 bajty udávají velikost celého souboru. V našem případě `36 03 00 00`, což je číslo 822 zakódované v little endian pořadí. Ja zapsáno jako 4 bajty, abychom měli místo na velké obrázky.
- Dalších 48 bajtů obsahuje různé technické informace, jako šířku a výšku obrázku, počet barev apod. Tyto informace pro teď přeskočíme.

Po hlavičkách následuje samotný obrázek. Zde jsou uloženy barvy pro jednotlivé pixely. Každý pixel je uložen jako tři bajty, které udávají barevné složky: červenou, zelenou a modrou. 

```
0030:                   ff ff ff ff ff ff ff ff ff ff
0040: ff ff ff ff ff fd fe fe ee ed fb cc c2 f8 c3 b7
0050: f7 dc d7 f9 fb fb fe ff ff ff ff ff ff ff ff ff
0060: ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff fc
0070: fd fe da e4 f2 9f b8 df a0 93 f4 a4 86 fd a5 87
...
```

Vidíme, že prvních 5 pixelů má barvu `ff ff ff`, tedy všechny složky na maximum. To je čistě bílá barva, jak si můžete ověřit pohledem na obrázek smajlíka níže. Další pixel má barvu `fd fe fe`, což je velmi světle šedivá. Takto můžeme pokračovat až do konce souboru.

::fig{src=assets/crazy-16.png}

## Kde všude se potkáme s hexakódy?

Hexadecimální soustavu zde nevysvětlujeme jen tak pro srandu králíkům. V programování ji potkáte na každém kroku. Jen jste si toho možná do teď tolik nevšimali.

### Barvy v HTML a CSS

Barvy v CSS se zapisují v hexadecimálních kódech přesně tak, jak jsou uloženy v binárních souborech. Například oranžová se v CSS zapíše jako `#ff7f00`. Rovnou tedy vidíte obsahy jednotlivých bajtů pro červenou, zelenou a modrou složku.

### ID záznamů

V databázích i různě jinde často potřebujeme generovat unikátní IDčka pro záznamy nebo datové objekty. Například databáze MongoDB používá pro IDčka 12 bajtová čísla zapsaná v hexadecimální soustavě. Takové IDčko může vypadat například takto: `507f1f77bcf86cd799439011`.

### V kryptografii

Při šifrování a digitálním podpisu se hex kódy používají pro zápis šifrovacích klíčů a hashů. Pokud jste weboví vývojáři, jistě jste už někdy viděli soubor pojmenovaný jako `bundle-c3a1924e.js`. Hex číslo v názvu je hash souboru, který se používá pro ověření, že se soubor nezměnil od posledního stažení.

O šifrování a hashování se víc dozvíte v dalších článcích.

### Internatové adresy

Ve standardu IPv6 se adresy počítačů v internetu zapisují jako osm skupin po čtyřech hexadecimálních číslicích oddělených dvojtečkou. Například `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.

Starší formát IPv4, který jste jistě už někde zahlédli, ještě hex čísla nepoužíval a psaly se  4 bajty v desítkové soustavě oddělené tečkami. Například IPv4 adresa `206.189.61.50` patří serveru, na kterém běží tento web.

## Hex editor

Pokud se sami chcete podívat na binární data nějakého souboru, můžete k tomu použít nějaky hex editor. Například VS Code má rozšíření z názevm _Hex Editor_, které vám umožní zobrazit soubor v hexadecimální podobě. 

::fig{src=assets/hexeditor.png}

Existuje ale i spousta samostatných programů, které se specializují na práci s binárními daty.

- [Hex Fiend pro maxOS](https://ridiculousfish.com/hexfiend/)
- [Různé hex editory](https://apps.microsoft.com/search?query=hex+editor) v Microsoft Store
- [Editory pro Linux](https://www.tecmint.com/best-hex-editors-for-linux/) jak s grafickým, tak příkazovým rozhraním

## Závěr

V tomto článku jste viděli, jak se můžeme podívat na binární data pomocí hexadecimální soustavy a jak se binárně ukládají čísla v big endian a little endian pořadí. Přiště si povíme něco o tom, jak počítače pracují s textem.
