# Dokumentace k postování kvízu na databázi přes backend

Zdá se, že formát, ve kterém posíláme requesty (x-www-form-urlencoded), se nelíbí bodyparseru expressu posílání polí (arrays) v requestu.
Tudíž je to (možná dočasně, možná navždycky) přes parsování stringu nejdříve na pole plain stringů (strquizarr), poté přečtení každého stringu a parsování pomocí JSON.parse do finálního pole quizarr, které je poté posíláno na databázi.

## Formátování POST requestu
1. Nejdříve vytvoření objektu:
{ question: "Otázka v plain stringu", answers: ["Pole stringů, první odpověď vždy ta správná", "Špatná odpověď"]}
2. Poté dejte objekty k sobě následujícím způsobem do stringu:
"{Objekt 1}|{Objekt 2}|{Objekt 3}"
3. String pošlete v requestu pod klíčem "quiz"
## Sample
key={"question": "Kdo vytvořil tento web?", "answers": ["Vojtěch Habeš a Kryštof Bruthans", "Bill Gates", "Steve Jobs"] }|{"question": "Jakou metodu tisku využívá FDM tiskárna?", "answers": ["Additivní", "Subtraktivní", "Kombinovanou"] }