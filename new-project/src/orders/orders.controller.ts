import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  // Implementa tus rutas y controladores aquí
}
