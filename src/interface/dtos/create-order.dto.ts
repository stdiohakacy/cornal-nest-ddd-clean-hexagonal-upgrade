import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDTO } from './address.dto';
import { OrderItemDTO } from './order-item.dto';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
