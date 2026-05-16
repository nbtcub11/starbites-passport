export const MENU = [
  // Popular
  { id: 10, name: 'Fantastic Jollof',  price: 100, cat: 'mains',   desc: 'Creamy jollof with chicken', popular: true, rating: 4.9,
    img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=70&auto=format&fit=crop' },
  { id: 11, name: 'Grilled Tilapia',   price: 120, cat: 'mains',   desc: 'Whole tilapia, banku & pepper', popular: true, rating: 4.7,
    img: 'https://images.unsplash.com/photo-1535399831218-d4db9aa412b5?w=400&q=70&auto=format&fit=crop' },
  { id: 12, name: 'Rich Palava Sauce', price: 95,  cat: 'mains',   desc: 'Spinach stew, smoked fish, agushi', rating: 4.6,
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70&auto=format&fit=crop' },
  { id: 13, name: 'Classic Burger',    price: 80,  cat: 'mains',   desc: 'Beef patty, special sauce', popular: true, rating: 4.7,
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=70&auto=format&fit=crop' },
  { id: 14, name: 'Pasta Carbonara',   price: 90,  cat: 'mains',   desc: 'Bacon, parmesan, cream', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=70&auto=format&fit=crop' },
  { id: 15, name: 'Grilled Chicken',   price: 95,  cat: 'mains',   desc: 'Half chicken, herbs, sides', rating: 4.6,
    img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=70&auto=format&fit=crop' },
  { id: 16, name: 'Fufu & Light Soup', price: 80,  cat: 'mains',   desc: 'Goat-meat light soup', rating: 4.8,
    img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=70&auto=format&fit=crop' },
  // Breakfast
  { id: 1, name: 'English Breakfast',  price: 85,  cat: 'breakfast', desc: 'Eggs, bacon, sausage, beans', popular: true, rating: 4.8,
    img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=70&auto=format&fit=crop' },
  { id: 2, name: 'American Pancakes',  price: 60,  cat: 'breakfast', desc: 'Stack, maple, berries', rating: 4.6,
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=70&auto=format&fit=crop' },
  { id: 3, name: 'Omelette',           price: 55,  cat: 'breakfast', desc: 'Three-egg with fillings', rating: 4.4,
    img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&q=70&auto=format&fit=crop' },
  // Pastries
  { id: 30, name: 'Meat Pie',          price: 25, cat: 'pastries', desc: 'Flaky, peppery', popular: true, rating: 4.9,
    img: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=400&q=70&auto=format&fit=crop' },
  { id: 31, name: 'Chicken Pie',       price: 30, cat: 'pastries', desc: 'Chicken & mushroom', popular: true, rating: 4.8,
    img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=70&auto=format&fit=crop' },
  { id: 32, name: 'Croissant',         price: 20, cat: 'pastries', desc: 'Buttery, French', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=70&auto=format&fit=crop' },
  // Drinks
  { id: 40, name: 'Matcha Latte',      price: 35, cat: 'drinks', desc: 'Stone-ground, oat milk', popular: true, rating: 4.7,
    img: 'https://images.unsplash.com/photo-1536013455671-3e1f3e2f0e7e?w=400&q=70&auto=format&fit=crop' },
  { id: 41, name: 'Chai Latte',        price: 30, cat: 'drinks', desc: 'Spiced, warming', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=70&auto=format&fit=crop' },
  { id: 42, name: 'Pineapple Juice',   price: 25, cat: 'drinks', desc: 'Fresh-pressed', rating: 4.8,
    img: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=70&auto=format&fit=crop' },
  { id: 43, name: 'Americano',         price: 25, cat: 'drinks', desc: 'Double shot', rating: 4.3,
    img: 'https://images.unsplash.com/photo-1494314671902-399b18174975?w=400&q=70&auto=format&fit=crop' },
  // Cocktails
  { id: 50, name: 'Jollof Cocktail',   price: 55, cat: 'bar', desc: 'Spiced rum, tropical fruit', popular: true, rating: 4.9,
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=70&auto=format&fit=crop' },
  { id: 51, name: 'Starbites Sunset',  price: 50, cat: 'bar', desc: 'Mango, passion, rum', rating: 4.7,
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=70&auto=format&fit=crop' },
  // Sides
  { id: 20, name: 'Kelewele',          price: 25, cat: 'sides', desc: 'Spiced fried plantain', popular: true, rating: 4.8,
    img: 'https://images.unsplash.com/photo-1623595119708-26b1f7500ddd?w=400&q=70&auto=format&fit=crop' },
  { id: 21, name: 'Yam Chips',         price: 25, cat: 'sides', desc: 'Crispy outside', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=70&auto=format&fit=crop' },
  { id: 22, name: 'Garden Salad',      price: 35, cat: 'sides', desc: 'Mixed greens, vinaigrette', rating: 4.2,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70&auto=format&fit=crop' },
];

export const CATEGORIES = [
  { id: 'popular',   name: 'Popular' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'mains',     name: 'Mains' },
  { id: 'sides',     name: 'Sides' },
  { id: 'pastries',  name: 'Pastries' },
  { id: 'drinks',    name: 'Drinks' },
  { id: 'bar',       name: 'Bar' },
];

export const SPECIALS = [
  {
    title: "Today's Jollof",
    sub: 'Mama Adwoa is back at the stove. Friday only.',
    cta: 'Order now',
    accent: '#FFD36C',
    img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=70&auto=format&fit=crop',
  },
  {
    title: 'Karaoke Friday',
    sub: '2-for-1 cocktails 7-10pm at the Westlands bar.',
    cta: 'See bar menu',
    accent: '#FF6FB5',
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=70&auto=format&fit=crop',
  },
  {
    title: 'Pastry Box Drop',
    sub: 'Six handmade meat pies, hot at 7am.',
    cta: 'Reserve box',
    accent: '#FFA94C',
    img: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=600&q=70&auto=format&fit=crop',
  },
];
