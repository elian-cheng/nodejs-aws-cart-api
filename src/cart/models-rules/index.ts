//import { Cart, CartItem } from '../models';
import { Carts } from '../entity/Carts';
import { CartItems } from '../entity/CartItems';

/**
 * @param {Carts} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Carts): number {
  return cart
    ? cart.items.reduce((acc: number, { price, count }: CartItems) => {
        return (acc += price * count);
      }, 0)
    : 0;
}
