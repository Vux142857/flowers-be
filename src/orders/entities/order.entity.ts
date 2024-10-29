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
import { User } from 'src/users/user.entity';
import { PaymentMethod, StatusOrder } from '../enum/StatusOrder.enum';
import { OrderItem } from './order-items.entity';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Readable ID
  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 20, nullable: false })
  order_ID: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  phone: number;

  address: string;

  @Column()
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
