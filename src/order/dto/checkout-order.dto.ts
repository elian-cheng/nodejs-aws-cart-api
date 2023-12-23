import { IsString, IsNotEmpty } from 'class-validator';

class OrderAddressDTO {
  @IsString()
  comment: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class CheckoutOrderDTO {
  @IsNotEmpty()
  address: OrderAddressDTO;
}
