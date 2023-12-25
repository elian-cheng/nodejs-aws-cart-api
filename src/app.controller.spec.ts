import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [AuthModule],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('healthCheck should be trythy', () => {
      expect(appController.healthCheck()).toBeTruthy();
    });
  });
});
