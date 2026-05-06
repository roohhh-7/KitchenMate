export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  cookTime: string;
  cuisineType: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookingSteps: string[];
  imageUrl: string;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Paneer Bhurji",
    description: "A quick and easy scrambled paneer dish cooked with onions, tomatoes, and spices.",
    ingredients: ["paneer", "onion", "tomato", "green chili", "coriander", "cumin", "turmeric", "salt", "oil"],
    cookTime: "15 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Crumble the paneer into small pieces.",
      "Heat oil in a pan, add cumin seeds and let them splutter.",
      "Add finely chopped onions and green chilies, sauté until onions are golden.",
      "Add chopped tomatoes and cook until soft.",
      "Stir in turmeric and salt.",
      "Add the crumbled paneer and mix well. Cook for 2-3 minutes.",
      "Garnish with fresh coriander leaves and serve hot."
    ],
    imageUrl: "https://images.unsplash.com/photo-1631515243349-e0cb45bb8237?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Egg Fried Rice",
    description: "A simple and comforting fried rice made with leftover rice and eggs.",
    ingredients: ["rice", "egg", "onion", "soy sauce", "black pepper", "salt", "oil", "garlic", "carrot"],
    cookTime: "20 mins",
    cuisineType: "Indo-Chinese",
    difficulty: "Easy",
    cookingSteps: [
      "Heat oil in a wok or large pan.",
      "Scramble the eggs in the pan, then remove and set aside.",
      "In the same pan, add chopped garlic, onions, and carrots. Stir-fry for 2 minutes.",
      "Add cooked rice and mix well.",
      "Add soy sauce, black pepper, and salt. Toss until the rice is evenly coated.",
      "Return the scrambled eggs to the pan and mix.",
      "Serve hot."
    ],
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Bread Omelette",
    description: "A classic street-style breakfast combining bread and a spiced omelette.",
    ingredients: ["bread", "egg", "onion", "green chili", "coriander", "salt", "butter", "black pepper"],
    cookTime: "10 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Beat eggs in a bowl with chopped onions, green chilies, coriander, salt, and black pepper.",
      "Heat butter on a pan.",
      "Pour the egg mixture onto the pan.",
      "Immediately place two slices of bread on the wet egg mixture, then flip the slices to coat both sides.",
      "Once the bottom is cooked, flip the entire omelette with the bread.",
      "Fold the edges of the omelette over the bread and fold the bread slices together.",
      "Cook until both sides are golden brown."
    ],
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Dal Fry & Jeera Rice",
    description: "Comforting yellow lentils tempered with spices, served with cumin rice.",
    ingredients: ["toor dal", "onion", "tomato", "garlic", "cumin", "mustard seeds", "turmeric", "rice", "ghee", "salt"],
    cookTime: "30 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Wash and boil the toor dal with turmeric and salt until soft.",
      "For the tadka (tempering), heat ghee in a small pan, add mustard seeds, cumin, and chopped garlic.",
      "Add chopped onions and sauté until golden, then add tomatoes and cook until soft.",
      "Pour the tadka over the boiled dal.",
      "For the rice: heat ghee, add cumin seeds, then add cooked rice and toss gently.",
      "Serve dal fry with jeera rice."
    ],
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Masala Maggi",
    description: "The ultimate midnight snack loaded with veggies and extra spices.",
    ingredients: ["maggi noodles", "onion", "tomato", "capsicum", "green chili", "butter", "maggi masala", "salt"],
    cookTime: "10 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Heat butter in a pan, add chopped onions and green chilies. Sauté until translucent.",
      "Add chopped tomatoes and capsicum. Cook for 2 minutes.",
      "Add 2 cups of water and bring to a boil.",
      "Break the Maggi noodles and add to the boiling water along with the tastemaker (Maggi masala).",
      "Cook for 2-3 minutes until the water is absorbed.",
      "Serve hot."
    ],
    imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Vegetable Upma",
    description: "A savory semolina porridge packed with vegetables, perfect for breakfast.",
    ingredients: ["sooji", "onion", "carrot", "peas", "mustard seeds", "urad dal", "curry leaves", "green chili", "oil", "salt"],
    cookTime: "20 mins",
    cuisineType: "South Indian",
    difficulty: "Medium",
    cookingSteps: [
      "Dry roast the sooji (semolina) in a pan until fragrant, then set aside.",
      "Heat oil, add mustard seeds, urad dal, and curry leaves.",
      "Add chopped onions, green chilies, and sauté. Add chopped carrots and peas.",
      "Pour 2.5 cups of water and add salt. Bring to a rolling boil.",
      "Gradually add the roasted sooji while stirring continuously to avoid lumps.",
      "Cover and cook on low heat for 3-4 minutes.",
      "Fluff and serve warm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "7",
    title: "Chole (Chickpea Curry)",
    description: "Spicy and tangy chickpea curry, great with rice or bread.",
    ingredients: ["chickpeas", "onion", "tomato", "ginger", "garlic", "chole masala", "turmeric", "chili powder", "oil", "salt"],
    cookTime: "25 mins",
    cuisineType: "North Indian",
    difficulty: "Medium",
    cookingSteps: [
      "If using canned chickpeas, drain and rinse. If using dried, soak overnight and boil.",
      "Heat oil in a pan, add finely chopped onions, ginger, and garlic. Sauté until golden.",
      "Add chopped tomatoes, turmeric, chili powder, and chole masala. Cook until oil separates.",
      "Add the chickpeas and a little water. Simmer for 10 minutes.",
      "Mash a few chickpeas to thicken the gravy.",
      "Garnish with coriander and serve."
    ],
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "8",
    title: "Kanda Poha",
    description: "Flattened rice cooked with onions, peanuts, and mild spices.",
    ingredients: ["poha", "onion", "peanuts", "mustard seeds", "turmeric", "green chili", "curry leaves", "lemon", "sugar", "salt", "oil"],
    cookTime: "15 mins",
    cuisineType: "Maharashtrian",
    difficulty: "Easy",
    cookingSteps: [
      "Wash poha in a colander and let it drain. Gently mix in salt, a pinch of sugar, and turmeric.",
      "Heat oil in a pan. Fry peanuts until crunchy, remove and set aside.",
      "In the same oil, add mustard seeds, curry leaves, and green chilies.",
      "Add finely chopped onions and sauté until translucent.",
      "Add the soaked poha and roasted peanuts. Toss gently.",
      "Cover and cook on low heat for 2 minutes.",
      "Squeeze fresh lemon juice on top and serve."
    ],
    imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "9",
    title: "Aloo Fry (Potato Fry)",
    description: "Crispy and spicy pan-fried potatoes.",
    ingredients: ["potato", "oil", "mustard seeds", "cumin", "turmeric", "chili powder", "coriander powder", "salt"],
    cookTime: "20 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Peel and chop potatoes into small cubes.",
      "Heat oil in a pan, add mustard seeds and cumin.",
      "Once they splutter, add the potato cubes and sauté for a few minutes.",
      "Add turmeric, chili powder, coriander powder, and salt.",
      "Mix well, cover, and cook on low heat until potatoes are tender.",
      "Remove cover and roast for a few more minutes for extra crispiness."
    ],
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "10",
    title: "Lemon Rice",
    description: "Tangy and nutty rice flavored with lemon and tempered spices.",
    ingredients: ["rice", "lemon", "peanuts", "mustard seeds", "urad dal", "chana dal", "turmeric", "curry leaves", "green chili", "oil", "salt"],
    cookTime: "15 mins",
    cuisineType: "South Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Use leftover cooked rice or cool freshly cooked rice.",
      "Heat oil in a pan. Add mustard seeds, urad dal, and chana dal. Fry until dals are golden.",
      "Add peanuts and roast them.",
      "Add green chilies, curry leaves, and turmeric.",
      "Turn off the heat, add lemon juice and salt. Mix well.",
      "Pour this mixture over the rice and mix gently until evenly colored."
    ],
    imageUrl: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "11",
    title: "Tomato Chutney Sandwich",
    description: "Quick sandwiches with spicy tomato-onion filling.",
    ingredients: ["bread", "tomato", "onion", "garlic", "chili powder", "butter", "salt", "oil"],
    cookTime: "15 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Heat oil in a pan, add minced garlic and finely chopped onions. Sauté until soft.",
      "Add chopped tomatoes, chili powder, and salt. Cook until mushy and the oil separates.",
      "Let the mixture cool slightly.",
      "Spread the tomato mixture between two slices of bread.",
      "Toast the sandwich on a pan with butter until both sides are golden and crisp."
    ],
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "12",
    title: "Milk Toast",
    description: "Sweet, caramelized toast soaked in milk.",
    ingredients: ["bread", "milk", "sugar", "butter", "cinnamon"],
    cookTime: "5 mins",
    cuisineType: "Global",
    difficulty: "Easy",
    cookingSteps: [
      "Heat a pan and melt a little butter.",
      "Place two slices of bread stacked on top of each other and toast the bottom.",
      "Flip the bread stack.",
      "Pour a little milk over the bread, let it absorb.",
      "Sprinkle sugar and a pinch of cinnamon on top.",
      "Cook until the milk evaporates and the bread is soft and caramelized."
    ],
    imageUrl: "https://images.unsplash.com/photo-1484723091791-c0e7e8fac6eb?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "13",
    title: "Onion Raita with Paratha",
    description: "Cool yogurt dip with onions, served with flaky parathas.",
    ingredients: ["yogurt", "onion", "green chili", "cumin powder", "salt", "frozen paratha"],
    cookTime: "10 mins",
    cuisineType: "North Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Whisk yogurt in a bowl until smooth.",
      "Add finely chopped onions, green chilies, roasted cumin powder, and salt. Mix well.",
      "Heat a tawa (griddle). Cook frozen parathas according to package instructions until crisp and flaky.",
      "Serve hot parathas with the cold onion raita."
    ],
    imageUrl: "https://images.unsplash.com/photo-1626779836855-4680fb3eb723?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "14",
    title: "Cheese Garlic Bread",
    description: "Quick homemade cheesy garlic bread using regular bread.",
    ingredients: ["bread", "garlic", "butter", "cheese", "oregano", "chili flakes"],
    cookTime: "10 mins",
    cuisineType: "Italian",
    difficulty: "Easy",
    cookingSteps: [
      "Mix softened butter with minced garlic and a pinch of oregano.",
      "Spread the garlic butter on slices of bread.",
      "Top with grated cheese (mozzarella or processed cheese).",
      "Toast on a pan with a lid on low heat until the cheese melts, or bake in an oven for 5 mins.",
      "Sprinkle chili flakes before serving."
    ],
    imageUrl: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "15",
    title: "Tomato Rice",
    description: "Flavorful one-pot rice dish made with tomatoes and spices.",
    ingredients: ["rice", "tomato", "onion", "garlic", "mustard seeds", "cumin", "turmeric", "chili powder", "garam masala", "oil", "salt"],
    cookTime: "25 mins",
    cuisineType: "South Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Heat oil in a pan, add mustard seeds and cumin.",
      "Add chopped onions and minced garlic. Sauté until golden.",
      "Add chopped tomatoes, turmeric, chili powder, and garam masala. Cook until tomatoes are completely soft and mushy.",
      "Add cooked rice and mix gently until the rice is evenly coated with the tomato masala.",
      "Serve hot with a dollop of yogurt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1563242690-3486114eb919?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "16",
    title: "Boiled Egg Sandwich",
    description: "Healthy and filling sandwich with boiled eggs and mayo.",
    ingredients: ["bread", "egg", "mayonnaise", "mustard", "black pepper", "salt", "lettuce"],
    cookTime: "15 mins",
    cuisineType: "Global",
    difficulty: "Easy",
    cookingSteps: [
      "Boil eggs for 10 minutes until hard-boiled. Cool, peel, and chop.",
      "In a bowl, mix chopped eggs, mayonnaise, a dash of mustard, salt, and black pepper.",
      "Place lettuce on a slice of bread.",
      "Spread the egg salad over the lettuce.",
      "Top with another slice of bread and cut in half."
    ],
    imageUrl: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "17",
    title: "Aloo Paratha (Simplified)",
    description: "Stuffed flatbread with spiced potato filling.",
    ingredients: ["wheat flour", "potato", "onion", "green chili", "coriander", "cumin powder", "salt", "ghee", "water"],
    cookTime: "30 mins",
    cuisineType: "North Indian",
    difficulty: "Medium",
    cookingSteps: [
      "Knead wheat flour with water and a pinch of salt into a soft dough. Let it rest.",
      "Boil and mash potatoes. Mix in chopped onions, chilies, coriander, cumin powder, and salt.",
      "Take a small ball of dough, roll it out slightly, place a portion of the potato filling in the center.",
      "Seal the edges and roll it out gently into a flatbread.",
      "Cook on a hot tawa (griddle), applying ghee on both sides until golden brown spots appear."
    ],
    imageUrl: "https://images.unsplash.com/photo-1626779836855-4680fb3eb723?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "18",
    title: "Mushroom Matar",
    description: "Mushrooms and green peas in a rich onion-tomato gravy.",
    ingredients: ["mushroom", "peas", "onion", "tomato", "ginger", "garlic", "garam masala", "turmeric", "cream", "oil", "salt"],
    cookTime: "25 mins",
    cuisineType: "Indian",
    difficulty: "Medium",
    cookingSteps: [
      "Wash and slice mushrooms. Boil the green peas.",
      "Heat oil, sauté finely chopped onions, ginger, and garlic until brown.",
      "Add pureed tomatoes, turmeric, and garam masala. Cook until oil separates.",
      "Add sliced mushrooms and cooked peas. Simmer for 10 minutes.",
      "Stir in a splash of cream and serve hot with roti."
    ],
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "19",
    title: "Curd Rice",
    description: "Comforting and cooling rice mixed with yogurt and tempered.",
    ingredients: ["rice", "yogurt", "milk", "mustard seeds", "urad dal", "ginger", "green chili", "curry leaves", "oil", "salt"],
    cookTime: "15 mins",
    cuisineType: "South Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Mash overcooked soft rice well.",
      "Mix the mashed rice with yogurt, a little milk, and salt until creamy.",
      "Heat oil in a small pan, add mustard seeds, urad dal, chopped ginger, green chilies, and curry leaves.",
      "Pour this tempering over the curd rice and mix well.",
      "Serve chilled or at room temperature."
    ],
    imageUrl: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "20",
    title: "Oats Chilla",
    description: "Savory and healthy pancake made from oats and vegetables.",
    ingredients: ["oats", "besan", "onion", "tomato", "green chili", "coriander", "turmeric", "salt", "oil", "water"],
    cookTime: "15 mins",
    cuisineType: "Indian",
    difficulty: "Easy",
    cookingSteps: [
      "Blend rolled oats into a coarse powder.",
      "In a bowl, mix oats powder, a tablespoon of besan (gram flour), chopped onions, tomatoes, chilies, coriander, turmeric, and salt.",
      "Add water to make a pourable batter.",
      "Heat a pan, pour a ladle of batter, and spread it lightly.",
      "Drizzle oil around the edges and cook until golden brown on both sides."
    ],
    imageUrl: "https://images.unsplash.com/photo-1616641885973-19602c34d3d2?q=80&w=600&auto=format&fit=crop"
  }
];
