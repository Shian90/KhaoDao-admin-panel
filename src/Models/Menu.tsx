import { Item } from './Item';
import { Restaurant } from './Restaurant';

export interface Menu {
  items: Item[];
  visible: boolean;
  _id: string;
  name: string;
  restaurant: Restaurant;
  __v: number;
}
