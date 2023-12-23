export type Order = {
  id?: string;
  user_id: string;
  cart_id: string;
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: OrderStatus;
  total: number;
};

export enum OrderStatus {
  OPEN = 'OPEN',
  PAYED = 'PAYED',
  CONFIRMED = 'CONFIRMED',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
