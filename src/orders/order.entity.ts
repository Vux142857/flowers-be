import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './interfaces/orderItem.interface';
import { User } from 'src/users/user.entity';
import { StatusOrder } from './enum/StatusOrder';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @Column({ type: 'json', nullable: true })
  orderItems: OrderItem[];

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  statusOrder: StatusOrder;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
