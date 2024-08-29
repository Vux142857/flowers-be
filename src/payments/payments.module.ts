import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './providers/payments/payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment])],
})
export class PaymentsModule {}
