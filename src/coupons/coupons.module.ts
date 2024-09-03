import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { CouponsService } from './providers/coupons.service';

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [TypeOrmModule.forFeature([Coupon])],
})
export class CouponsModule {}
