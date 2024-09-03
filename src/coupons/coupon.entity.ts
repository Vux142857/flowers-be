import { StatusType } from 'src/common/statusType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  code: string;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.ACTIVE,
    nullable: false,
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
