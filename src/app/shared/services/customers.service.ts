import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { ApiService } from '../seed-work/api.service';
import { ResultResponse } from '../seed-work/result-response.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly endpoint = 'Customers';

  constructor(private apiService: ApiService) {}

  getCustomers(params?: HttpParams): Observable<ResultResponse<Customer[]>> {
    return this.apiService.get<Customer[]>(this.endpoint, params);
  }

  getCustomerById(id: number): Observable<ResultResponse<Customer>> {
    return this.apiService.get<Customer>(`${this.endpoint}/${id}`);
  }

  createCustomer(customer: Customer): Observable<ResultResponse<Customer>> {
    return this.apiService.post<Customer>(this.endpoint, customer);
  }
}
