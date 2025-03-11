import { IsNotEmpty, IsString } from 'class-validator';

export class OrderItemDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}
