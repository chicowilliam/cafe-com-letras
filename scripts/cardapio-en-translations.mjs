/** @typedef {{ label: string; eyebrow?: string; heading?: string }} SectionTranslation */
/** @typedef {{ name: string; description?: string }} ItemTranslation */
/** @typedef {{ label: string; matchTags?: string[]; fromId?: string; untilBeforeId?: string }} SectionItemGroupDef */

/** @type {Record<string, SectionTranslation>} */
export const SECTION_TRANSLATIONS = {
  "info-geral": {
    label: "General info",
    heading: "Information",
  },
  "bebidas-quentes": {
    label: "Hot drinks",
    eyebrow: "Hot drinks",
  },
  "bebidas-geladas": {
    label: "Cold drinks",
    eyebrow: "Cold drinks",
  },
  "cervejas-drinks": {
    label: "Beers & drinks",
    eyebrow: "Beers & draft beer",
  },
  "drinks-coqueteis": {
    label: "Drinks & cocktails",
    eyebrow: "Drinks & cocktails",
  },
  "licores-destilados": {
    label: "Liqueurs & spirits",
    eyebrow: "Liqueurs & spirits",
  },
  "compartilhar-grelhados": {
    label: "To share & from the grill",
    eyebrow: "To share",
  },
  "carnes-sanduiches": {
    label: "Meats & sandwiches",
    eyebrow: "Meats & sandwiches",
  },
  "saladas-massas": {
    label: "Salads, pasta & kids",
    eyebrow: "Salads & pasta",
  },
  veganos: {
    label: "Vegan",
    eyebrow: "Vegan",
  },
  sobremesas: {
    label: "Desserts",
    eyebrow: "Desserts",
  },
};

/** @type {Record<string, SectionItemGroupDef[]>} */
export const GROUP_TRANSLATIONS_EN = {
  "compartilhar-grelhados": [
    { label: "To share", untilBeforeId: "bifinho-de-soja" },
    { label: "From the grill", fromId: "bifinho-de-soja" },
  ],
  "saladas-massas": [
    { label: "Pasta & risotto", untilBeforeId: "salada-de-pera-e-gorgonzola" },
    { label: "Salads", matchTags: ["salada"] },
    { label: "Kids", matchTags: ["infantil"] },
    { label: "Simple pasta", fromId: "fettuccine-ao-pomodoro" },
  ],
};

const TAG_MAP = {
  cafe: "coffee",
  bebida: "drink",
  cerveja: "beer",
  drink: "drink",
  destilado: "spirit",
  compartilhar: "share",
  prato: "main",
  salada: "salad",
  infantil: "kids",
  vegano: "vegan",
  sobremesa: "dessert",
};

/** @param {string[] | undefined} tags */
export function mapTags(tags) {
  if (!tags?.length) return [];
  return tags.map((tag) => TAG_MAP[tag] ?? tag);
}

/** @type {Record<string, ItemTranslation>} */
export const ITEM_TRANSLATIONS = {
  "cafe-espresso-gourmet-do-dia": {
    name: "Daily Gourmet Espresso",
    description: "also available short or carioca style",
  },
  "cafe-espresso-duplo": {
    name: "Double Espresso",
  },
  "cafe-macchiato": {
    name: "Macchiato",
    description: "espresso with steamed milk",
  },
  "cafe-coado-v60-200ml": {
    name: "V60 Pour-Over Coffee 200ml",
  },
  "cafe-com-leite": {
    name: "Coffee with Milk",
    description: "regular or vegan",
  },
  latte: {
    name: "Latte",
    description:
      "steamed milk with a touch of traditional or vegan espresso",
  },
  cappucino: {
    name: "Cappuccino",
    description:
      "espresso and steamed milk (cocoa powder and cinnamon optional); regular or vegan",
  },
  "cappucino-em-sache": {
    name: "Instant Cappuccino Sachet",
    description: "regular or light; with milk or water",
  },
  "cafe-mocha": {
    name: "Mocha",
    description: "espresso, steamed milk and chocolate sauce",
  },
  "cafe-vienense": {
    name: "Viennese Coffee",
    description:
      "espresso, steamed milk, dark chocolate and whipped cream",
  },
  "cafe-foam": {
    name: "Foam Coffee",
    description:
      "espresso, steamed milk, white chocolate and chocolate sauce",
  },
  cafecolate: {
    name: "Cafécolate",
    description:
      "espresso, steamed milk, chocolate sauce and whipped cream",
  },
  "chocolate-quente": {
    name: "Hot Chocolate",
    description: "with whipped cream",
  },
  choconhaque: {
    name: "Choconhaque",
    description: "dark chocolate, steamed milk and brandy",
  },
  "chas-e-infusoes-em-sache": {
    name: "Bagged Teas & Infusions",
    description: "ask your server for available options",
  },
  "cha-de-hortela": {
    name: "Mint Tea",
  },
  "cha-de-gengibre-limao-e-mel": {
    name: "Ginger, Lemon & Honey Tea",
  },
  "acrescimo-de-chantilly": {
    name: "Extra Whipped Cream",
  },
  "agua-mineral-300ml": {
    name: "Mineral Water 300ml",
    description: "still or sparkling",
  },
  "agua-mamba-lata-350ml": {
    name: "Mamba Water Can 350ml",
    description: "still or sparkling",
  },
  "agua-tonica-lata-350ml": {
    name: "Tonic Water Can 350ml",
  },
  "refrigerante-lata-350ml": {
    name: "Soft Drink Can 350ml",
    description: "and Guaraná Antártica Zero",
  },
  "schweppes-citrus-lata-350ml": {
    name: "Schweppes Citrus Can 350ml",
  },
  "cafe-gelado-300ml": {
    name: "Iced Coffee 300ml",
    description:
      "espresso, steamed milk, vanilla syrup and whipped cream",
  },
  "milkshake-300ml": {
    name: "Milkshake 300ml",
    description: "coffee or chocolate with chocolate sauce",
  },
  "suco-do-dia-300ml": {
    name: "Juice of the Day 300ml",
    description: "ask your server for available options",
  },
  "suco-detox-do-dia-300ml": {
    name: "Detox Juice of the Day 300ml",
    description: "ask your server for available options",
  },
  "suco-de-laranja-300ml": {
    name: "Fresh Orange Juice 300ml",
  },
  "e-laranja-300ml": {
    name: "e laranja 300ml",
  },
  "limonada-suica-300ml": {
    name: "Swiss Lemonade 300ml",
  },
  "suco-integral-de-uva-300ml": {
    name: "Whole Grape Juice 300ml",
  },
  "mate-gelado-300ml": {
    name: "Iced Mate 300ml",
    description: "with lemon and mint syrup",
  },
  "energetico-regular-250ml": {
    name: "Energy Drink Regular 250ml",
  },
  "soda-italiana-300ml": {
    name: "Italian Soda 300ml",
    description: "ask your server for available flavors",
  },
  "chope-pilsen-300ml": {
    name: "Draft Pilsen 300ml",
  },
  "chope-pilsen-480ml": {
    name: "Draft Pilsen 480ml",
  },
  "heineken-330ml": {
    name: "Heineken 330ml",
  },
  "heineken-zero-330ml": {
    name: "Heineken Zero 330ml",
  },
  "lagunitas-355ml": {
    name: "Lagunitas 355ml",
  },
  "praya-355ml": {
    name: "Praya 355ml",
  },
  "blue-moon-355ml": {
    name: "Blue Moon 355ml",
    description: "lower intensity — up to 5 — higher intensity",
  },
  mojito: {
    name: "Mojito",
    description: "rum, lime, mint, ice, sugar and soda water",
  },
  "cosmopolitan-do-cafe": {
    name: "Cosmopolitan do Café",
    description: "vodka, cherry brandy and triple sec | dry or sweet",
  },
  margarita: {
    name: "Margarita",
    description: "tequila, lime, cointreau and salt",
  },
  "drink-de-verao": {
    name: "Summer Drink",
    description: "beer, lime and salt",
  },
  "aperol-spritz": {
    name: "Aperol Spritz",
  },
  "kir-royale": {
    name: "Kir Royale",
    description: "sparkling wine and crème de cassis",
  },
  caipirinha: {
    name: "Caipirinha",
    description: "cachaça, lime and sugar",
  },
  caipiroska: {
    name: "Caipiroska",
    description:
      "vodka, fruit of the day and sugar (ask the team for available fruits)",
  },
  "gin-tonica": {
    name: "Gin & Tonic",
    description: "gin, tonic water, lime, Sicilian lemon and orange",
  },
  negroni: {
    name: "Negroni",
  },
  fitzgerald: {
    name: "Fitzgerald",
    description:
      "gin, lemon juice, sugar syrup, aromatic bitters and ice",
  },
  "a-hora-da-estrela": {
    name: "A Hora da Estrela",
    description:
      "vodka, elderflower syrup, Thai lime juice, vanilla soda and jabuticaba foam",
  },
  "capitao-bala": {
    name: "Capitão Bala",
    description:
      "cachaça, almond syrup, Thai lime juice, Nib bitter and ginger ale",
  },
  iracema: {
    name: "Iracema",
    description:
      "cachaça, elderflower syrup, Thai lime juice, vanilla soda and thyme",
  },
  moramora: {
    name: "Moramora",
    description:
      "blackberry, strawberry, carbonated ginger syrup and strawberry syrup",
  },
  pimentonica: {
    name: "Pimentônica",
    description: "strawberry and pink peppercorn",
  },
  rabico: {
    name: "Rabicó",
    description: "rapadura syrup, Thai lime juice and ginger ale",
  },
  "limoncello-dose-50ml": {
    name: "Limoncello 50ml shot",
    description: "lemon liqueur",
  },
  "licor-43-dose-50ml": {
    name: "Licor 43 50ml shot",
    description: "marula liqueur",
  },
  "jack-daniel-s-old-no-7": {
    name: "Jack Daniel's Old No. 7",
  },
  "johnnie-walker-red-label": {
    name: "Johnnie Walker Red Label",
  },
  "johnnie-walker-black-label": {
    name: "Johnnie Walker Black Label",
  },
  "vodka-absolut": {
    name: "Absolut Vodka",
  },
  "gin-beefeater": {
    name: "Beefeater Gin",
  },
  "tequila-jose-cuervo": {
    name: "José Cuervo Tequila",
  },
  "cachaca-vale-verde": {
    name: "Vale Verde Cachaça",
  },
  "dupla-de-pao-de-queijo": {
    name: "Cheese Bread Duo",
    description: "2 pieces",
  },
  "paes-de-queijo-recheados": {
    name: "Stuffed Cheese Breads",
    description:
      "with buffalo mozzarella, sun-dried tomato and fresh basil, or with Canastra cheese and apricot jam // 8 pieces",
  },
  "bruschettas-classicas": {
    name: "Classic Bruschetta",
    description: "with buffalo mozzarella and Italian tomato // 6 pieces",
  },
  "bruschettas-de-cogumelos": {
    name: "Mushroom Bruschetta",
    description: "button mushroom cream and parmesan // 6 pieces",
  },
  "carpaccio-de-carne-classico": {
    name: "Classic Beef Carpaccio",
    description:
      "with caper sauce, parmesan and arugula // served with baguette",
  },
  "fish-and-chips": {
    name: "Fish and Chips",
    description:
      "catch of the day breaded in panko flour // served with potato chips and aioli",
  },
  "queijo-brie-assado": {
    name: "Baked Brie",
    description: "stuffed with red fruit jam // served with baguette",
  },
  "novo-tartare-de-salmao": {
    name: "New Salmon Tartare",
    description: "with potato chips",
  },
  "tabua-pub": {
    name: "Pub Platter",
    description:
      "onion rings, rustic potatoes, mozzarella sticks and breaded chicken // served with honey mustard, guava barbecue and gorgonzola sauces",
  },
  "iscas-de-file-aos-tres-molhos": {
    name: "Beef Tenderloin Bites with Three Sauces",
    description:
      "300g fillet mignon, roti, gorgonzola and hot mustard sauces // served with basil baguette, lemon and olive oil or mustard and honey",
  },
  "bifinho-de-soja": {
    name: "Soy Steak",
  },
  "file-de-frango": {
    name: "Chicken Breast",
  },
  "peixe-branco": {
    name: "White Fish",
  },
  salmao: {
    name: "Salmon",
  },
  "file-bovino": {
    name: "Beef Tenderloin",
  },
  "file-com-fritas-do-cafe": {
    name: "Fillet with Fries — Café Style",
    description:
      "200g fillet mignon over gorgonzola sauce // served with French fries",
  },
  "pf-do-cafe": {
    name: "Café PF",
    description:
      "200g fillet mignon topped with egg, rice, beans, collard greens and onion-bacon farofa // served with salad or French fries",
  },
  "file-a-parmegiana": {
    name: "Parmigiana Fillet",
    description:
      "fillet mignon served with fresh fettuccine in butter and sage",
  },
  funghi: {
    name: "Funghi",
    description: "with truffled cream cheese fonduta",
  },
  jabuticaba: {
    name: "Jabuticaba",
    description: "with mashed potatoes and mixed greens",
  },
  "mussarela-de-bufala": {
    name: "Buffalo Mozzarella",
    description:
      "with caper cream, lemon butter, spinach and almonds",
  },
  "bobo-de-camarao": {
    name: "Shrimp Bobó",
    description: "served with coconut rice",
  },
  "salmao-ao-molho-shimeji": {
    name: "Salmon with Shimeji Sauce",
    description:
      "with watercress risotto and bacon, basil baguette, lemon and olive oil or mustard and honey",
  },
  "sanduiche-caprese": {
    name: "Caprese Sandwich",
    description:
      "buffalo mozzarella, sun-dried tomato, arugula and basil pesto on baguette",
  },
  "hamburguer-mineirices": {
    name: "Mineirices Burger",
    description:
      "200g homemade burger, semi-cured Serro cheese, bacon caramelized in cane molasses, crispy collard greens and guava barbecue on corn bread // served with fries or mixed greens and tomato",
  },
  "crepe-de-cogumelos": {
    name: "Mushroom Crêpe",
    description:
      "with shiitake, shimeji, button mushrooms, zucchini and Catupiry cheese in Dijon mustard sauce // served with mixed greens",
  },
  "crepe-de-salmao": {
    name: "Salmon Crêpe",
    description:
      "with leek and passion fruit sauce // served with mixed greens",
  },
  "ravioli-de-mussarela-de-bufala": {
    name: "Buffalo Mozzarella Ravioli",
    description: "with pomodoro and basil sauce",
  },
  "fettuccine-trifolati": {
    name: "Fettuccine Trifolati",
    description:
      "handmade pasta in white truffle mushroom sauce with shiitake, shimeji and button mushrooms",
  },
  "pappardelle-com-iscas-de-file": {
    name: "Pappardelle with Beef Tenderloin Bites",
    description:
      "in pomodoro sauce with buffalo mozzarella, confit tomato and arugula",
  },
  "fettuccine-al-limone": {
    name: "Fettuccine al Limone",
    description:
      "handmade pasta in Sicilian lemon cream sauce with shrimp",
  },
  "risoto-de-parmesao-e-file": {
    name: "Parmesan & Beef Risotto",
    description: "beef cubes, wine sauce and button mushrooms",
  },
  "risoto-de-camaroes": {
    name: "Shrimp Risotto",
    description: "in pomodoro sauce with black olives",
  },
  "salada-de-pera-e-gorgonzola": {
    name: "Pear & Gorgonzola Salad",
    description:
      "mixed greens, caramelized pear, gorgonzola cheese and cashews",
  },
  "salada-caesar": {
    name: "Caesar Salad",
    description:
      "romaine lettuce, grilled chicken breast strips and the Café's Caesar dressing",
  },
  "salada-de-salmao-curado": {
    name: "Cured Salmon Salad",
    description: "with green apple, greens and mustard caviar",
  },
  "pf-infantil": {
    name: "Kids' PF",
    description:
      "rice, beans, diced fillet, French fries and tomato salad",
  },
  "fettuccine-ao-pomodoro": {
    name: "Fettuccine Pomodoro",
    description: "handmade pasta in rustic pomodoro sauce",
  },
  chocolate: {
    name: "Chocolate",
    description: "ask for available ice cream flavors",
  },
  "dadinhos-de-tapioca": {
    name: "Tapioca Cheese Bites",
    description:
      "with lupin beans, served with cane molasses // 12 pieces",
  },
  "tabua-pub-vegana": {
    name: "Vegan Pub Platter",
    description:
      "breaded cassava mozzarella, black-eyed pea fritters, onion rings and finger potatoes // served with vegan cheddar, Jack Daniel's barbecue and mayo sauces",
  },
  "veg-crispy": {
    name: "Veg Crispy",
    description:
      "cornbread bun, breaded soy burger, Italian tomato, romaine lettuce, vegan mayo and carrot bacon // served with potato chips",
  },
  "veg-cheddar": {
    name: "Veg Cheddar",
    description:
      "cornbread bun, grilled soy burger, Italian tomato, romaine lettuce, vegan cheddar and caramelized onion // served with potato chips",
  },
  "moqueca-de-banana-da-terra": {
    name: "Plantain Moqueca",
    description: "with coconut rice and dendê farofa",
  },
  "ravioli-de-queijo-de-castanha": {
    name: "Cashew Cheese Ravioli",
    description:
      "in carrot cream with mushrooms and sautéed spinach",
  },
  "pf-vegano": {
    name: "Vegan PF",
    description:
      "grain patty (quinoa and millet with mushrooms, cashews and walnuts); rice, beans, collard greens, fried plantain and spicy sauce",
  },
  "risoto-de-palmito-pupunha": {
    name: "Heart of Palm & Pupunha Risotto",
    description: "and mushrooms roasted in herb olive oil",
  },
  paella: {
    name: "Paella",
    description:
      "with brown rice, vegetables (carrot, zucchini, bell pepper, cauliflower, broccoli, button mushrooms) finished with cashews, seaweed, paellero seasoning and smoked hot paprika",
  },
  "brownie-mix": {
    name: "Brownie Mix",
    description:
      "with white chocolate, dark chocolate and walnut chips, served with vanilla ice cream",
  },
  "petit-gateau-de-chocolate": {
    name: "Chocolate Petit Gâteau",
    description: "with crème anglaise and vanilla ice cream",
  },
  "pudim-da-vovo": {
    name: "Grandma's Pudding",
    description: "condensed milk pudding with coconut milk",
  },
  tiramisu: {
    name: "Tiramisù",
    description:
      "classic Italian dessert with mascarpone cream, coffee, Amaretto liqueur and ladyfingers",
  },
  "torta-de-limao": {
    name: "Lemon Pie",
    description: "with meringue",
  },
  "brownie-vegano": {
    name: "Vegan Brownie",
    description: "with sorbet of the day",
  },
  "tiramisu-de-frutas-vermelhas": {
    name: "Red Berry Tiramisù",
    description: "with Amaretto liqueur and cashew cream",
  },
  "tortinha-de-banana": {
    name: "Banana Tart",
    description: "with tangerine sorbet and coconut cream",
  },
};
