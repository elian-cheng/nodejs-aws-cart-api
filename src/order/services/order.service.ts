import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../models';
import { Orders } from '../entity/Order';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) {}

  private orders: Record<string, Order> = {};

  async findAll(): Promise<Orders[]> {
    return this.ordersRepository.find({
      relations: {
        cart: {
          items: true,
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Order> {
    return this.orders[userId];
  }

  async findById(orderId: string): Promise<Orders> {
    return this.ordersRepository.findOne({
      relations: {
        cart: {
          items: true,
        },
      },
      where: { id: orderId },
    });
  }

  async create(data: any, userId: string): Promise<Orders> {
    const order = await this.ordersRepository.save({
      user_id: userId,
      cart_id: data.cart_id,
      delivery: data.address,
      status: 'inProgress',
      total: data.total,
    });

    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist!');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    };
  }

  async delete(orderId: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    await this.ordersRepository.delete(orderId);
    return order;
  }
}
