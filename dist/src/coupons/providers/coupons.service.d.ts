import { Coupon } from '../coupon.entity';
import { Repository } from 'typeorm';
export declare class CouponsService {
    private readonly couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    createCoupon(): Promise<string>;
    getCoupons(): Promise<string>;
    getCoupon(): Promise<string>;
    updateCoupon(): Promise<string>;
    deleteCoupon(): Promise<string>;
}
