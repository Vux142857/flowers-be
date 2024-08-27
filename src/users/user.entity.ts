import { Exclude } from 'class-transformer';
import { StatusType } from 'src/common/statusType.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
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

  // @Exclude()
  // @Column({ type: 'varchar', nullable: true })
  // verifyPasswordToken: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  // @Column({ type: 'uuid', nullable: true })
  // roleId: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    nullable: false,
    default: StatusType.ACTIVE,
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
