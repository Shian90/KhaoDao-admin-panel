import { Menu } from './Menu';
import { Restaurant } from './Restaurant';

export interface Item {
  price: number;
  description: string;
  mainImage: string;
  images: any[];
  tags: any[];
  numberOfReviews: number;
  visible: boolean;
  _id: string;
  name: string;
  seller: Restaurant;
  category: string;
  totalRating: number;
  adminRating: number;
  reviews: any[];
  createdAt: string;
  menu: Menu;
  __v: number;
}
