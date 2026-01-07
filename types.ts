export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

export type ViewState = 
  | 'home' 
  | 'catalog' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'login' 
  | 'register'
  | 'profile' 
  | 'wishlist' 
  | 'success' 
  | '404';

export interface User {
  name: string;
  email: string;
  id: string;
  balance: number;
}