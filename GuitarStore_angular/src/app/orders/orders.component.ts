import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GuitarOrders } from '../model/GuitarOrders';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: GuitarOrders;
  total: number;
  paid: boolean;
  sub: Subscription;

  constructor(private httpClientService: HttpClientService) {
      this.orders = this.httpClientService.GuitarOrders;
  }

  ngOnInit() {
    this.paid = false;
    this.sub = this.httpClientService.OrdersChanged.subscribe(() => {
      this.orders = this.httpClientService.GuitarOrders;
    });
    this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.httpClientService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
    this.sub = this.httpClientService.TotalChanged.subscribe(() => {
      this.total = this.httpClientService.Total;
    });
  }
}
