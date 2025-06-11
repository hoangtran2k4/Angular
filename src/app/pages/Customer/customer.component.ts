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
    NbEvaIconsModule,
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  private customerService = inject(CustomersService);

  customers: Customer[] = [];

  showAddModal = false;
  isEditMode = false;
  selectedCustomerId: number | null = null;

  newCustomer: Customer = this.initEmptyCustomer();

  ngOnInit(): void {
    this.loadCustomers();
  }
  private formatDateOnly(date: string | Date | null): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }


  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res.Data.map((customer: Customer) => ({
          ...customer,
          CreatedAt: this.formatDateOnly(customer.CreatedAt),
          BirthDate: this.formatDateOnly(customer.BirthDate),
        }));
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách khách hàng:', err);
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedCustomerId = null;
    this.newCustomer = this.initEmptyCustomer();
    this.showAddModal = true;
  }

  openEditModal(customer: Customer): void {
    this.isEditMode = true;
    this.selectedCustomerId = customer.CustomerID;
    this.newCustomer = { ...customer };
    this.showAddModal = true;
  }

  saveCustomer(): void {
    if (this.isEditMode && this.selectedCustomerId !== null) {
      this.customerService.updateCustomer(this.selectedCustomerId, this.newCustomer).subscribe({
        next: (res) => {
          const updated = res.Data;
          const index = this.customers.findIndex(c => c.CustomerID === updated.CustomerID);
          if (index !== -1) this.customers[index] = updated;
          this.closeModal();
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật khách hàng:', err);
          alert('Cập nhật khách hàng thất bại!');
        }
      });
    } else {
      this.customerService.createCustomer(this.newCustomer).subscribe({
        next: (res) => {
          this.customers.push(res.Data);
          this.closeModal();
        },
        error: (err) => {
          console.error('Lỗi khi thêm khách hàng:', err);
          alert('Thêm khách hàng thất bại!');
        }
      });
    }
  }

  closeModal(): void {
    this.showAddModal = false;
    this.resetForm();
    this.isEditMode = false;
    this.selectedCustomerId = null;
  }

  resetForm(): void {
    this.newCustomer = this.initEmptyCustomer();
  }

  private initEmptyCustomer(): Customer {
    return {
      CustomerID: 0,
      FullName: '',
      Email: '',
      Phone: '',
      Gender: '',
      BirthDate: '',
      Channel: '',
      IsMember: false,
      CreatedAt: '',
      UpdatedAt: null,
    };
  }
  deleteCustomer(customer: Customer) {
    if (confirm(`Bạn có chắc chắn muốn xoá khách hàng "${customer.FullName}"?`)) {
      this.customerService.deleteCustomer(customer.CustomerID, customer).subscribe({
        next: (res) => {
          this.customers = this.customers.filter(c => c.CustomerID !== customer.CustomerID);
          alert('Xoá khách hàng thành công.');
        },
        error: (err) => {
          console.error('Lỗi khi xoá khách hàng:', err);
          alert('Xoá khách hàng thất bại!');
        }
      });
    }
  }

}
