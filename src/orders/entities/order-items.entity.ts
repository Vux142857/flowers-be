import { Product } from 'src/products/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Order from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', nullable: false })
  subTotal: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
}
