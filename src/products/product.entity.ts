import { Category } from '../categories/category.entity';
import { StatusType } from '../common/statusType.enum';
import { Coupon } from '../coupons/coupon.entity';
import { OrderItem } from '../orders/entities/order-items.entity';
import { Suggestion } from '../suggestions/suggestion.entity';
import { Tag } from '../tags/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.ACTIVE,
    nullable: false,
  })
  status: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  slug: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  remaining: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: false })
  imageUrl: string;

  @ManyToMany(() => Tag, { eager: true, nullable: true })
  @JoinTable()
  tags?: Tag[];

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {
    nullable: true,
    cascade: ['update', 'remove'],
  })
  orderItems?: OrderItem[];

  @ManyToOne(() => Coupon, (coupon) => coupon.products, {
    nullable: true,
    eager: true,
  })
  coupon?: Coupon;

  @OneToOne(() => Suggestion, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  suggestion?: Suggestion;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
