import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentType } from './enum/PaymentType';
import { User } from 'src/users/user.entity';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
