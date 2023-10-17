import { Injectable } from '@nestjs/common';
import { HttpClient } from '@nestjs/common';
import { environment } from '../../environment/environment';
import { Users } from './users.dto';

@Injectable()
export class UsersService {

  private baseUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  async create(users: Users): Promise<Users> {
    return this.httpClient.post<Users>(`${this.baseUrl}/users`, users).toPromise();
  }

  async get(id: number): Promise<Users> {
    return this.httpClient.get<Users>(`${this.baseUrl}/users/${id}`).toPromise();
  }

  async update(id: number, users: Users): Promise<Users> {
    return this.httpClient.put<Users>(`${this.baseUrl}/users/${id}`, users).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/users/${id}`).toPromise();
  }

  async patch(id: number, updates: Partial<Users>): Promise<Users> {
    return this.httpClient.patch<Users>(`${this.baseUrl}/users/${id}`, updates).toPromise();
  }

}
