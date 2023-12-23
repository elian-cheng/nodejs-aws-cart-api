import { Injectable } from '@nestjs/common';
import pgClient from '../../db';
import { Order, OrderStatus } from '../models';
import { Knex } from 'knex';

@Injectable()
export class OrderService {
  async findById(orderId: string): Promise<Order> {
    return await pgClient('orders').where('id', orderId).first();
  }

  async createTransacted(trx: Knex.Transaction<any, any[]>, data: Order) {
    const order = {
      ...data,
      status: OrderStatus.OPEN,
    };

    return (
      await trx('orders').insert(order).returning('*')
    )[0] as any as Order;
  }

  update(orderId: string, data: Order) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    return pgClient('orders')
      .where('id', orderId)
      .update({ ...order, ...data });
  }
}
