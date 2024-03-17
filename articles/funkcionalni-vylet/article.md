---
title: Výlet do funkcionálního programování
lead: Funkcionální programování se v moderních JS frameworcích používá na každém kroku. Ukážeme si, na jakých myšlenkách funkcionální programování stojí a jak jej dobře využít ve svých projektech.
author:
  name: Martin Podloucký
  # link: https://www.linkedin.com/in/martinpodloucky/
  # avatar: https://avatars.githubusercontent.com/u/4608335
date: 2024-03-09
draft: true
---

Dnes se zaměříme na jednu z často diskutovaných oblastí v programování - funkcionální programování. Možná jste o něm slyšeli děsivé historky, možná naopak vůbec nevíte, která bije. Uděláme proto takový rychlý průlet světem funkcionálního programování a vysvětlíme si, jak se liší od tradičního imperativního přístupu.

Funkcionální programování staví na trochu jin principy než klasický imperativní přístup. Základními pojmy jsou imutabilita a čisté funkce. Možná vás to zaráží, ale pojďme to rozebrat.

Imutabilita je koncept, který nám říká, že datové struktury by neměly být změnitelné. To znamená, že když máme hodnotu uloženou v proměnné, neměla by se měnit. Zdá se to být zvláštní na první pohled, ale ve skutečnosti to nám poskytuje jistotu a předvídatelnost v našem kódu.

Nechme si to na příkladu: Máme objekt, který reprezentuje barvu, a chceme změnit červenou na zelenou. Ve funkcionálním programování bychom vytvořili novou instanci objektu s požadovanou změnou, zatímco v imperativním přístupu bychom původní objekt přímo změnili. To může vést k nečekaným problémům, zejména ve větších aplikacích.

Druhým klíčovým konceptem jsou čisté funkce. Čistá funkce je taková, která vrací stejnou hodnotu pro stejné vstupní parametry a nemá žádné vedlejší efekty. To znamená, že provádí pouze operace na základě vstupních dat a neovlivňuje žádné jiné části programu.

Pokud se podíváme na jednoduchý příklad funkce, která přijímá číslo a vrátí jeho druhou mocninu, je to ideální příklad čisté funkce. Nemění žádné globální proměnné ani stav programu, prostě vstup převede na výstup.

Abychom to shrnuli, funkcionální programování nám dává nástroje k vytváření kódu, který je snadno udržovatelný, předvídatelný a bezpečný. I když to může na první pohled vypadat složitě, je to vlastně způsob, jak si programátoři usnadňují život.

V dalších článcích se podíváme na praktické příklady funkcionálního programování a ukážeme si, jak můžete začlenit tyto principy do svých vlastních projektů. Buďte připraveni na úžasnou cestu do světa funkcionálního programování!
