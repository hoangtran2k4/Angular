import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-customer',
  standalone: true, // ✅ CẦN THÊM DÒNG NÀY
  imports: [
    NgFor,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  customers = [
    {
      CustomerID: 1,
      FullName: 'Nguyễn Văn A',
      Email: 'a@example.com',
      Phone: '0901234567',
      Gender: 'M',
      BirthDate: '1990-01-01',
      Channel: 'Website',
      IsMember: true,
      CreatedAt: '2024-06-01 10:00:00',
      UpdatedAt: '2024-06-10 15:30:00'
    },
    {
      CustomerID: 2,
      FullName: 'Trần Thị B',
      Email: null,
      Phone: '0912345678',
      Gender: 'F',
      BirthDate: null,
      Channel: 'Shopee',
      IsMember: false,
      CreatedAt: '2024-06-05 14:20:00',
      UpdatedAt: null
    }
  ];
}
