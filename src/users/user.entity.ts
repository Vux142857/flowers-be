import { Exclude } from 'class-transformer';
import { StatusType } from 'src/common/statusType.enum';
import Order from 'src/orders/order.entity';
import { Payment } from 'src/payments/payment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  lastName: string;

  @Index()
  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Exclude()
  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  @Column({ type: 'uuid', nullable: true })
  subscribedId: string;

  @Column({ type: 'varchar', nullable: true })
  googleId: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  forgotPasswordToken: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    nullable: false,
    default: StatusType.ACTIVE,
  })
  status: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
