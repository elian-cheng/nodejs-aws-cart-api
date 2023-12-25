/**
 * orders:
 * id - uuid (Primary key)
 * user_id - uuid
 * cart_id - uuid (Foreign key from carts.id)
 * payment - JSON
 * delivery - JSON
 * comments - text
 * status - ENUM or text
 * total - number
 */

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Carts } from '../../cart/entity/Carts';
import { Users } from '../../users/entity/Users';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @OneToOne(() => Carts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Carts;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'json', nullable: true })
  payment: string;

  @Column({ type: 'json', nullable: true })
  delivery: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'APPROVED', 'CONFIRMED', 'SENT', 'COMPLETED', 'CANCELLED'],
    default: 'OPEN',
  })
  status: string;

  @Column({ type: 'integer', nullable: true })
  total: number;
}
