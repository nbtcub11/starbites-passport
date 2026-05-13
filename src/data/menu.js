export const CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'mains', name: 'Mains', icon: '🍽️' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'pastries', name: 'Pastries', icon: '🥧' },
  { id: 'drinks', name: 'Drinks', icon: '☕' },
  { id: 'cocktails', name: 'Cocktails', icon: '🍸' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export const MENU_ITEMS = [
  // Breakfast
  { id: 1, name: 'English Breakfast', price: 85, category: 'breakfast', desc: 'Eggs, bacon, sausage, beans, toast', popular: true },
  { id: 2, name: 'American Pancakes', price: 60, category: 'breakfast', desc: 'Fluffy stack with maple syrup & berries' },
  { id: 3, name: 'Omelette', price: 55, category: 'breakfast', desc: 'Three-egg omelette with your choice of fillings' },
  { id: 4, name: 'French Toast', price: 50, category: 'breakfast', desc: 'Brioche with cinnamon & fresh fruit' },

  // Mains
  { id: 10, name: 'Fantastic Jollof', price: 100, category: 'mains', desc: 'Our famous creamy jollof rice with chicken', popular: true },
  { id: 11, name: 'Grilled Tilapia', price: 120, category: 'mains', desc: 'Whole grilled tilapia with banku & pepper' },
  { id: 12, name: 'Rich Palava Sauce', price: 95, category: 'mains', desc: 'Spinach stew with smoked fish & agushi' },
  { id: 13, name: 'Classic Burger', price: 80, category: 'mains', desc: 'Toasted bun, beef patty, lettuce, tomato, special sauce', popular: true },
  { id: 14, name: 'Pasta Carbonara', price: 90, category: 'mains', desc: 'Creamy pasta with bacon & parmesan' },
  { id: 15, name: 'Pizza Margherita', price: 85, category: 'mains', desc: 'Stone-baked with fresh mozzarella & basil' },
  { id: 16, name: 'Fufu & Light Soup', price: 80, category: 'mains', desc: 'Traditional fufu with goat meat light soup' },
  { id: 17, name: 'Grilled Chicken', price: 95, category: 'mains', desc: 'Herb-marinated half chicken with sides' },

  // Sides
  { id: 20, name: 'Fries', price: 30, category: 'sides' },
  { id: 21, name: 'Fried Plantains (Kelewele)', price: 25, category: 'sides', desc: 'Spiced & fried ripe plantain' },
  { id: 22, name: 'Garden Salad', price: 35, category: 'sides' },
  { id: 23, name: 'Sweet Potato Mash', price: 30, category: 'sides' },
  { id: 24, name: 'Yam Chips', price: 25, category: 'sides' },

  // Pastries
  { id: 30, name: 'Meat Pie', price: 25, category: 'pastries', popular: true },
  { id: 31, name: 'Chicken & Mushroom Pie', price: 30, category: 'pastries', popular: true },
  { id: 32, name: 'Croissant', price: 20, category: 'pastries' },
  { id: 33, name: 'Sausage Roll', price: 20, category: 'pastries' },
  { id: 34, name: 'Spring Rolls', price: 25, category: 'pastries' },

  // Drinks
  { id: 40, name: 'Matcha Latte', price: 35, category: 'drinks', popular: true },
  { id: 41, name: 'Chai Latte', price: 30, category: 'drinks' },
  { id: 42, name: 'Fresh Pineapple Juice', price: 25, category: 'drinks' },
  { id: 43, name: 'Coffee (Americano)', price: 25, category: 'drinks' },
  { id: 44, name: 'Club Beer', price: 20, category: 'drinks' },
  { id: 45, name: 'Fresh Orange Juice', price: 28, category: 'drinks' },

  // Cocktails
  { id: 50, name: 'Fantastic Jollof Cocktail', price: 55, category: 'cocktails', desc: 'Our signature cocktail — spiced rum, tropical fruit', popular: true },
  { id: 51, name: 'Starbites Sunset', price: 50, category: 'cocktails', desc: 'Mango, passion fruit, rum' },
  { id: 52, name: 'Pina Colada', price: 48, category: 'cocktails' },

  // Desserts
  { id: 60, name: 'Chocolate Lava Cake', price: 45, category: 'desserts' },
  { id: 61, name: 'Ice Cream (2 Scoops)', price: 30, category: 'desserts' },
  { id: 62, name: 'Fruit Salad', price: 25, category: 'desserts' },
];
