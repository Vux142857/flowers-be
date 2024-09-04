import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentType } from './enum/PaymentType';
import { User } from 'src/users/user.entity';
import Order from 'src/orders/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.COD,
  })
  paymentType: string;

  @OneToOne(() => Order, (order) => order.payment, { nullable: true })
  @JoinColumn()
  order: Order;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
