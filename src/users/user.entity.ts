import { Exclude } from 'class-transformer';
import { Role } from '../auth/enums/role-type.enum';
import { StatusType } from '../common/statusType.enum';
import Order from '../orders/entities/order.entity';
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

  @Index()
  @Column({ type: 'varchar', length: 96, nullable: true })
  firstName: string;

  @Index()
  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Exclude()
  @Column({ type: 'varchar', length: 128, nullable: true })
  password?: string;

  @Column({ type: 'uuid', nullable: true, unique: true })
  @Index()
  subscribedId: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
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

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
    default: [Role.CUSTOMER],
  })
  roles: Role[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
