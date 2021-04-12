import { Menu } from './Menu';
import { Restaurant } from './Restaurant';

export interface Item {
  price: number;
  description: string;
  rating: number;
  mainImage: string;
  images: any[];
  tags: any[];
  numOfReviews: number;
  visible: boolean;
  _id: string;
  name: string;
  seller: Restaurant;
  category: string;
  reviews: any[];
  createdAt: string;
  menu: Menu;
  __v: number;
}
