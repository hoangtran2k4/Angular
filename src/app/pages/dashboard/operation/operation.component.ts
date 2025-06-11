import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-operation',
  imports: [NgFor],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.css',
})
export class OperationComponent {
  rows = [
    {
      label: 'N+0',
      values: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    },
    {
      label: 'N+1',
      values: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    },
    {
      label: 'N+2',
      values: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    },
    {
      label: 'N+3',
      values: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    },
    {
      label: 'N+4',
      values: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    },
    {
      label: 'N5+',
      values: [
        '11 (18)',
        '-',
        '-',
        '5 (9)',
        '-',
        '3 (3)',
        '1 (2)',
        '2 (3)',
        '-',
        '-',
      ],
    },
  ];

  partners = [
    {
      name: 'KPL-Kids Plaza',
      total: '22 (35)',
      days: ['-', '-', '-', '-', '-', '22 (35)'],
    },
  ];
}
