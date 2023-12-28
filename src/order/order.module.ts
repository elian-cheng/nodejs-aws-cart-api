import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services';
import { OrderController } from './order.controller';
import { Orders } from './entity/Order';
@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
