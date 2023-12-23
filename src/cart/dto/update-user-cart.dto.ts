import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

class ProductUpdateUserCartDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdateUserCartDTO {
  @IsNotEmpty()
  product: ProductUpdateUserCartDTO;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}
