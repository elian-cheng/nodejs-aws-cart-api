/**
 * cartItems:
 * id - uuid (Primary key)
 * cart_id - uuid (Foreign key from carts.id)
 * product_id - uuid
 * price - integer
 * count - integer (Number of items in a cart)
 */

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from '../entity/Carts';

@Entity('cart_items')
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @ManyToOne(() => Carts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Carts;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'integer', nullable: false, default: 1 })
  price: number;

  @Column({ type: 'integer', nullable: false })
  count: number;
}
