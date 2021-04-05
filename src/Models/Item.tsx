import { Restaurant } from './Restaurant';

export interface Item {
  price: number;
  description: string;
  rating: number;
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
  __v: number;
}
