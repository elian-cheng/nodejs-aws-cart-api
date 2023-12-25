/**
 * carts:
 * id - uuid (Primary key)
 * user_id - uuid, not null (It's not Foreign key, because there is no user entity in DB)
 * created_at - date, not null
 * updated_at - date, not null
 * status - enum ("OPEN", "ORDERED")
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CartItems } from './CartItems';
import { Users } from 'src/users/entity/Users';

@Entity('carts')
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @OneToMany(() => CartItems, (cartItems) => cartItems.cart)
  items: CartItems[];

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
    default: 'OPEN',
  })
  status: string;
}
