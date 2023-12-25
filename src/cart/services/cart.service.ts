import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from '../entity/Carts';
import { Repository } from 'typeorm';
import { CartItems } from '../entity/CartItems';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,

    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
  ) {}

  async findByUserId(userId: string): Promise<Carts> {
    return await this.cartsRepository.findOne({
      relations: {
        items: true,
      },
      where: { user_id: userId, status: 'OPEN' },
    });
  }

  async createByUserId(userId: string) {
    return await this.cartsRepository.save({
      user_id: userId,
      items: [],
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { product, count }): Promise<Carts> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const cartItem = await this.cartItemsRepository.findOne({
      where: { cart_id: id, product_id: product.id },
    });

    if (cartItem) {
      if (count === 0) {
        await this.cartItemsRepository.delete(cartItem.id);
        return await this.cartsRepository.findOne({
          relations: {
            items: true,
          },
          where: { id },
        });
      }

      await this.cartItemsRepository.update(cartItem.id, {
        count: count,
      });

      return await this.cartsRepository.findOne({
        relations: {
          items: true,
        },
        where: { id },
      });
    }

    await this.cartItemsRepository.save({
      cart_id: id,
      product_id: product.id,
      price: product.price,
      count: count,
    });

    return await this.cartsRepository.findOne({
      relations: {
        items: true,
      },
      where: { id },
    });
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartsRepository.delete({ user_id: userId });
  }

  async setOrderStatus(userId: string, status: string): Promise<Carts> {
    const cart = await this.findByUserId(userId);
    if (!cart) {
      throw new Error('Cart does not exist!');
    }

    return await this.cartsRepository.save({
      ...cart,
      status,
    });
  }
}
