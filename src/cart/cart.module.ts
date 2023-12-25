import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { Carts } from './entity/Carts';
import { CartItems } from './entity/CartItems';
import { Orders } from 'src/order/entity/Order';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Carts, CartItems, Orders])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
