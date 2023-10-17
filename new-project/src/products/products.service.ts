import { Injectable } from '@nestjs/common';
import { HttpClient } from '@nestjs/common';
import { environment } from '../../environment/environment';
import { Products } from './products.dto';

@Injectable()
export class ProductsService {

  private baseUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  async create(products: Products): Promise<Products> {
    return this.httpClient.post<Products>(`${this.baseUrl}/products`, products).toPromise();
  }

  async get(id: number): Promise<Products> {
    return this.httpClient.get<Products>(`${this.baseUrl}/products/${id}`).toPromise();
  }

  async update(id: number, products: Products): Promise<Products> {
    return this.httpClient.put<Products>(`${this.baseUrl}/products/${id}`, products).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/products/${id}`).toPromise();
  }

  async patch(id: number, updates: Partial<Products>): Promise<Products> {
    return this.httpClient.patch<Products>(`${this.baseUrl}/products/${id}`, updates).toPromise();
  }

}
