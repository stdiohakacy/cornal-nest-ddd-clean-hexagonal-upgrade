import { OrderDTO } from '../dtos/order.dto';

export const ORDER_QUERY_PORT = Symbol('ORDER_QUERY_PORT');
export interface OrderQueryPortInterface {
  findOrdersByCustomer(customerId: string): Promise<OrderDTO[]>;
}
