import { Product } from 'src/products/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Order from './order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', nullable: false })
  subTotal: number;

  @Exclude()
  @ManyToOne(() => Order, (order) => order.orderItems, {
    nullable: false,
    eager: false,
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
