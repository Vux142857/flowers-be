import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { StatusOrder } from './enum/StatusOrder.enum';
import { OrderItem } from 'src/order-items/order-items.entity';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  statusOrder: StatusOrder;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
  orderItems: OrderItem[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
