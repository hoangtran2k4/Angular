import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Customer } from '../../shared/models/customer.model';
import { CustomersService } from '../../shared/services/customers.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  showAddModal = false;
    newCustomer = {
    FullName: '',
    Email: '',
    Phone: '',
    Gender: '',
    BirthDate: '',
    Channel: '',
    IsMember: false,
  };
addCustomer() {
  this.customerService.createCustomer(this.newCustomer as Customer).subscribe({
    next: (res) => {
      const newCustomer = res.Data;
      this.customers.push(newCustomer);
      this.showAddModal = false;
      this.newCustomer = {
        FullName: '',
        Email: '',
        Phone: '',
        Gender: '',
        BirthDate: '',
        Channel: '',
        IsMember: false,
      };
    },
    error: (err) => {
      console.error('Lỗi khi thêm khách hàng:', err);
      alert('Thêm khách hàng thất bại!');
    }
  });
}


  private customerService = inject(CustomersService);

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res.Data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách khách hàng:', err);
      }
    });
  }
}
