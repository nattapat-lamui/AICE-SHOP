import { Product } from './types';

export const CATEGORIES = ['All', 'Sneakers', 'T-Shirts', 'Hoodies', 'Accessories', 'Collectibles'];
export const BRANDS = ['All', 'Nike', 'Adidas', 'Supreme', 'Stüssy', 'Carhartt', 'New Balance', 'AICE'];

export const PRODUCTS: Product[] = [
  // Hoodies
  {
    id: '1',
    name: 'Cyber Glitch Hoodie',
    price: 85.00,
    category: 'Hoodies',
    brand: 'AICE',
    description: 'Heavyweight fleece with distinctive glitch aesthetics.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: '2',
    name: 'Void Black Hoodie',
    price: 95.00,
    category: 'Hoodies',
    brand: 'AICE',
    description: 'Pitch black, oversized, tactical drawstrings.',
    image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Neon Spike Hoodie',
    price: 110.00,
    category: 'Hoodies',
    brand: 'AICE',
    description: 'Features reflective neon strips for night visibility.',
    image: 'https://images.unsplash.com/photo-1520423465871-08636dd8e58a?auto=format&fit=crop&w=800&q=80',
    isOnSale: true
  },
  {
    id: 'h4',
    name: 'Stüssy 8-Ball Fleece',
    price: 140.00,
    category: 'Hoodies',
    brand: 'Stüssy',
    description: 'Iconic 8-ball graphic on back. Relaxed fit.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=800&q=80',
  },

  // T-Shirts
  {
    id: '4',
    name: 'Acid Wash Tee',
    price: 45.00,
    category: 'T-Shirts',
    brand: 'AICE',
    description: 'Vintage treated cotton with oversized fit.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'System Failure Tee',
    price: 50.00,
    category: 'T-Shirts',
    brand: 'AICE',
    description: 'Graphic tee featuring digital decay artwork.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: '6',
    name: 'Oversized Blank',
    price: 35.00,
    category: 'T-Shirts',
    brand: 'Carhartt',
    description: 'High density cotton, boxy fit, essential basic.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't4',
    name: 'Box Logo Tee',
    price: 180.00,
    category: 'T-Shirts',
    brand: 'Supreme',
    description: 'The classic box logo. You know what it is.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't5',
    name: 'Vintage Nike Air',
    price: 65.00,
    category: 'T-Shirts',
    brand: 'Nike',
    description: '90s deadstock vintage tee.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
  },

  // Sneakers
  {
    id: '7',
    name: 'Strider X1',
    price: 220.00,
    category: 'Sneakers',
    brand: 'AICE',
    description: 'High-top technical sneakers with ankle support.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: '8',
    name: 'Urban Runner Low',
    price: 180.00,
    category: 'Sneakers',
    brand: 'Adidas',
    description: 'Lightweight, breathable, built for the concrete jungle.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '9',
    name: 'Retro Chunky 90s',
    price: 150.00,
    category: 'Sneakers',
    brand: 'New Balance',
    description: 'Dad shoes but make them fashion. Ultra comfortable.',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80',
    isOnSale: true
  },
  {
    id: 's4',
    name: 'Jordan 1 High',
    price: 350.00,
    category: 'Sneakers',
    brand: 'Nike',
    description: 'The sneaker that started it all. Mocha colorway.',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's5',
    name: 'Yeezy Boost',
    price: 400.00,
    category: 'Sneakers',
    brand: 'Adidas',
    description: 'Cloud-like comfort. Futuristic silhouette.',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's6',
    name: 'Dunk Low Panda',
    price: 210.00,
    category: 'Sneakers',
    brand: 'Nike',
    description: 'Black and white essential. Goes with everything.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },

  // Accessories
  {
    id: '10',
    name: 'Platform Boots',
    price: 160.00,
    category: 'Accessories',
    brand: 'AICE',
    description: 'Chunky sole leather boots for urban exploration.',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '11',
    name: 'Visor 3000',
    price: 35.00,
    category: 'Accessories',
    brand: 'AICE',
    description: 'Futuristic shield sunglasses.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '12',
    name: 'Tactical Bag',
    price: 85.00,
    category: 'Accessories',
    brand: 'Carhartt',
    description: 'Crossbody bag with modular attachment points.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '13',
    name: 'Bucket Hat',
    price: 40.00,
    category: 'Accessories',
    brand: 'Stüssy',
    description: 'Wide brim hat for incognito mode.',
    image: 'https://images.unsplash.com/photo-1565354972821-22877b10298a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'a5',
    name: 'Logo Beanie',
    price: 45.00,
    category: 'Accessories',
    brand: 'Supreme',
    description: 'Knitted beanie with embroidered box logo.',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
  },

  // Collectibles
  {
    id: '14',
    name: 'Vinyl Art Toy',
    price: 150.00,
    category: 'Collectibles',
    brand: 'AICE',
    description: 'Limited edition vinyl figure. Numbered 1/500.',
    image: 'https://images.unsplash.com/photo-1616084666687-0b19280d859b?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: '15',
    name: 'Deck - Series 1',
    price: 75.00,
    category: 'Collectibles',
    brand: 'Supreme',
    description: 'Maple wood skateboard deck with exclusive art print.',
    image: 'https://images.unsplash.com/photo-1520045864981-8c47da0a9c01?auto=format&fit=crop&w=800&q=80',
  },
];

export const MOCK_USER = {
  name: 'Alex Doe',
  email: 'alex@example.com',
  id: '99482',
  balance: 1240.50
};