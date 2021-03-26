import { Item } from './Item';

export interface Menu {
  items: Item[];
  visible: boolean;
  _id: string;
  name: string;
  restaurant: string;
  __v: number;
}
