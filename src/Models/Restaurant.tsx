import { Menu } from './Menu';

export interface Restaurant {
  menu: Menu[];
  reviews: any[];
  visible: boolean;
  _id: string;
  name: string;
  address: string;
  createdAt: string;
  __v: number;
}
