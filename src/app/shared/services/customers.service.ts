import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { ApiService } from '../seed-work/api.service';
import { ResultResponse } from '../seed-work/result-response.model';
import { TokenStorage } from '../common/token-validity';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly endpoint = 'Customers';

  constructor(private apiService: ApiService) { }

  getCustomers(params?: HttpParams): Observable<ResultResponse<Customer[]>> {
    return this.apiService.get<Customer[]>(this.endpoint, params);
  }

  getCustomerById(id: number): Observable<ResultResponse<Customer>> {
    return this.apiService.get<Customer>(`${this.endpoint}/${id}`);
  }

  createCustomer(customer: Customer): Observable<ResultResponse<Customer>> {
    const token = TokenStorage.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.apiService.post<Customer>(this.endpoint, customer, headers);
  }
  updateCustomer(id: number, customer: Customer): Observable<ResultResponse<Customer>> {
    const token = TokenStorage.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.apiService.post<Customer>(`${this.endpoint}/${id}/put`, customer, headers);
  }
  deleteCustomer(id: number, customer: Customer): Observable<ResultResponse<Customer>> {
    const token = TokenStorage.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.apiService.post<Customer>(`${this.endpoint}/${id}/delete`, customer, headers);
  }
}
