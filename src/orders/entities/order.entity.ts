import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { StatusOrder } from '../enum/StatusOrder.enum';
import { OrderItem } from './order-items.entity';
import { PaymentMethod } from '../enum/PaymentMethod.enum';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Readable ID
  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 20, nullable: false })
  order_ID: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  fullName: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: false, default: 0 })
  shippingCost: number;

  @Column({ nullable: false, default: PaymentMethod.COD })
  paymentMethod: PaymentMethod;

  @Column({
    nullable: false,
    default: false,
  })
  isPaid: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  statusOrder: StatusOrder;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ['update', 'remove'],
    eager: true,
  })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  paidDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateReadableId() {
    this.order_ID = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
