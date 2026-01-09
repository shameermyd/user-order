import { Injectable, NotFoundException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private httpService: HttpService,
  ) {}

  async createOrder(data: any) {
    const { userId, product, price } = data;

    try {
      const userResponse = await firstValueFrom(
        this.httpService.get(`http://localhost:3000/users/${userId}`)
      );

      this.logger.log(`User response: ${JSON.stringify(userResponse)}`);
      const user = userResponse.data;

      const order = new this.orderModel({ userId, product, price });
      await order.save();

      return {
        orderId: order._id,
        product: order.product,
        price: order.price,
        user,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderById(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    try {
      const userResponse = await firstValueFrom(
        this.httpService.get(`http://localhost:3000/users/${order.userId}`)
      );
      const user = userResponse.data;

      return {
        orderId: order._id,
        product: order.product,
        price: order.price,
        user,
      };
      
    } catch (error) {
      return {
        orderId: order._id,
        product: order.product,
        price: order.price,
        user: { message: 'User not found' },
      };
    }
  }
}

