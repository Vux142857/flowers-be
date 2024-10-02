import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Payment } from 'src/payments/payment.entity';
import { StatusOrder } from '../enum/StatusOrder.enum';
import { OrderItem } from './order-items.entity';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Readable ID
  @Index()
  @Column({ type: 'varchar', length: 20, nullable: false })
  order_ID: string;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  statusOrder: StatusOrder;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: ['insert', 'update', 'remove'],
    eager: true,
  })
  orderItems: OrderItem[];

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateReadableId() {
    this.order_ID = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
