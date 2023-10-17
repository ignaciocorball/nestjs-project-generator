import { Injectable } from '@nestjs/common';
import { HttpClient } from '@nestjs/common';
import { environment } from '../../environment/environment';
import { Orders } from './orders.dto';

@Injectable()
export class OrdersService {

  private baseUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  async create(orders: Orders): Promise<Orders> {
    return this.httpClient.post<Orders>(`${this.baseUrl}/orders`, orders).toPromise();
  }

  async get(id: number): Promise<Orders> {
    return this.httpClient.get<Orders>(`${this.baseUrl}/orders/${id}`).toPromise();
  }

  async update(id: number, orders: Orders): Promise<Orders> {
    return this.httpClient.put<Orders>(`${this.baseUrl}/orders/${id}`, orders).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/orders/${id}`).toPromise();
  }

  async patch(id: number, updates: Partial<Orders>): Promise<Orders> {
    return this.httpClient.patch<Orders>(`${this.baseUrl}/orders/${id}`, updates).toPromise();
  }

}
