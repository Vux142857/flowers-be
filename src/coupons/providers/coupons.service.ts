import { Injectable } from '@nestjs/common';
import { Coupon } from '../coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async createCoupon() {
    return 'createCoupon';
  }

  async getCoupons() {
    return 'getCoupons';
  }

  async getCoupon() {
    return 'getCoupon';
  }

  async updateCoupon() {
    return 'updateCoupon';
  }

  async deleteCoupon() {
    return 'deleteCoupon';
  }
}
