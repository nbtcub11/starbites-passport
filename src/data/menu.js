export const CATEGORIES = [
  { id: 'popular', name: 'Popular', icon: '🔥' },
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
  { id: 1, name: 'English Breakfast', price: 85, category: 'breakfast', desc: 'Eggs, bacon, sausage, beans, toast', popular: true, rating: 4.8, reviews: 234 },
  { id: 2, name: 'American Pancakes', price: 60, category: 'breakfast', desc: 'Fluffy stack with maple syrup & berries', rating: 4.6, reviews: 128 },
  { id: 3, name: 'Omelette', price: 55, category: 'breakfast', desc: 'Three-egg omelette with your choice of fillings', rating: 4.4, reviews: 89 },
  { id: 4, name: 'French Toast', price: 50, category: 'breakfast', desc: 'Brioche with cinnamon & fresh fruit', rating: 4.5, reviews: 67 },

  // Mains
  { id: 10, name: 'Fantastic Jollof', price: 100, category: 'mains', desc: 'Our famous creamy jollof rice with chicken', popular: true, rating: 4.9, reviews: 512 },
  { id: 11, name: 'Grilled Tilapia', price: 120, category: 'mains', desc: 'Whole grilled tilapia with banku & pepper', popular: true, rating: 4.7, reviews: 198 },
  { id: 12, name: 'Rich Palava Sauce', price: 95, category: 'mains', desc: 'Spinach stew with smoked fish & agushi', rating: 4.6, reviews: 156 },
  { id: 13, name: 'Classic Burger', price: 80, category: 'mains', desc: 'Toasted bun, beef patty, lettuce, tomato, special sauce', popular: true, rating: 4.7, reviews: 342 },
  { id: 14, name: 'Pasta Carbonara', price: 90, category: 'mains', desc: 'Creamy pasta with bacon & parmesan', rating: 4.5, reviews: 134 },
  { id: 15, name: 'Pizza Margherita', price: 85, category: 'mains', desc: 'Stone-baked with fresh mozzarella & basil', rating: 4.4, reviews: 187 },
  { id: 16, name: 'Fufu & Light Soup', price: 80, category: 'mains', desc: 'Traditional fufu with goat meat light soup', rating: 4.8, reviews: 276 },
  { id: 17, name: 'Grilled Chicken', price: 95, category: 'mains', desc: 'Herb-marinated half chicken with sides', rating: 4.6, reviews: 203 },

  // Sides
  { id: 20, name: 'Fries', price: 30, category: 'sides', rating: 4.5, reviews: 445 },
  { id: 21, name: 'Fried Plantains (Kelewele)', price: 25, category: 'sides', desc: 'Spiced & fried ripe plantain', popular: true, rating: 4.8, reviews: 389 },
  { id: 22, name: 'Garden Salad', price: 35, category: 'sides', rating: 4.2, reviews: 78 },
  { id: 23, name: 'Sweet Potato Mash', price: 30, category: 'sides', rating: 4.4, reviews: 112 },
  { id: 24, name: 'Yam Chips', price: 25, category: 'sides', rating: 4.5, reviews: 167 },

  // Pastries
  { id: 30, name: 'Meat Pie', price: 25, category: 'pastries', popular: true, rating: 4.9, reviews: 678 },
  { id: 31, name: 'Chicken & Mushroom Pie', price: 30, category: 'pastries', popular: true, rating: 4.8, reviews: 423 },
  { id: 32, name: 'Croissant', price: 20, category: 'pastries', rating: 4.5, reviews: 234 },
  { id: 33, name: 'Sausage Roll', price: 20, category: 'pastries', rating: 4.3, reviews: 189 },
  { id: 34, name: 'Spring Rolls', price: 25, category: 'pastries', rating: 4.4, reviews: 145 },

  // Drinks
  { id: 40, name: 'Matcha Latte', price: 35, category: 'drinks', popular: true, rating: 4.7, reviews: 298 },
  { id: 41, name: 'Chai Latte', price: 30, category: 'drinks', rating: 4.5, reviews: 167 },
  { id: 42, name: 'Fresh Pineapple Juice', price: 25, category: 'drinks', rating: 4.8, reviews: 356 },
  { id: 43, name: 'Coffee (Americano)', price: 25, category: 'drinks', rating: 4.3, reviews: 234 },
  { id: 44, name: 'Club Beer', price: 20, category: 'drinks', rating: 4.4, reviews: 445 },
  { id: 45, name: 'Fresh Orange Juice', price: 28, category: 'drinks', rating: 4.6, reviews: 189 },

  // Cocktails
  { id: 50, name: 'Fantastic Jollof Cocktail', price: 55, category: 'cocktails', desc: 'Our signature cocktail — spiced rum, tropical fruit', popular: true, rating: 4.9, reviews: 312 },
  { id: 51, name: 'Starbites Sunset', price: 50, category: 'cocktails', desc: 'Mango, passion fruit, rum', rating: 4.7, reviews: 178 },
  { id: 52, name: 'Pina Colada', price: 48, category: 'cocktails', rating: 4.5, reviews: 134 },

  // Desserts
  { id: 60, name: 'Chocolate Lava Cake', price: 45, category: 'desserts', rating: 4.8, reviews: 198 },
  { id: 61, name: 'Ice Cream (2 Scoops)', price: 30, category: 'desserts', rating: 4.5, reviews: 267 },
  { id: 62, name: 'Fruit Salad', price: 25, category: 'desserts', rating: 4.3, reviews: 89 },
];

// Previous orders for reorder feature (per customer)
export const PREVIOUS_ORDERS = {
  1: [ // Kwame
    { id: 'po1', date: '2026-05-08', items: [30, 43], location: 'Osu To-Go' },
    { id: 'po2', date: '2026-05-03', items: [31, 40], location: 'Osu To-Go' },
  ],
  2: [ // Ama
    { id: 'po3', date: '2026-05-10', items: [1, 45], location: 'Tesano Express' },
    { id: 'po4', date: '2026-05-07', items: [40, 32], location: 'Tesano Express' },
  ],
  3: [ // Nana Adjei
    { id: 'po5', date: '2026-05-11', items: [10, 11, 50, 50], location: 'East Legon Signature' },
    { id: 'po6', date: '2026-05-05', items: [12, 16, 15, 20], location: 'East Legon Signature' },
  ],
  4: [ // Mr. Rob
    { id: 'po7', date: '2026-05-12', items: [50, 17, 23], location: 'East Legon Signature' },
    { id: 'po8', date: '2026-05-11', items: [1, 42, 43], location: 'East Legon Signature' },
    { id: 'po9', date: '2026-05-10', items: [13, 20, 44, 44], location: 'East Legon Signature' },
  ],
};
