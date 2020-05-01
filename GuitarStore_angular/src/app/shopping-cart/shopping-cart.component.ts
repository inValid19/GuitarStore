import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GuitarOrders } from '../model/GuitarOrders';
import { Subscription } from 'rxjs';
import { GuitarOrder } from '../model/GuitarOrder';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  orderFinished: boolean;
  orders: GuitarOrders;
  total: number;
  sub: Subscription;

  @Output() 
  onOrderFinished: EventEmitter<boolean>;

  constructor(private httpClientService:  HttpClientService) {
    this.total = 0;
    this.orderFinished = false;
    this.onOrderFinished = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.orders = new GuitarOrders();
    this.loadCart();
    this.loadTotal();
  }

  private calculateTotal(guitars: GuitarOrder[]): number {
    let sum = 0;
    guitars.forEach(value => {
        sum += (value.guitar.price * value.quantity);
    });
    return sum;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  finishOrder() {
    this.orderFinished = true;
    this.httpClientService.Total;
    this.onOrderFinished.emit(this.orderFinished);
  }

  loadTotal() {
    this.sub = this.httpClientService.OrdersChanged.subscribe(() => {
        this.total = this.calculateTotal(this.orders.guitarOrders);
    });
  }

  loadCart() {
    this.sub = this.httpClientService.GuitarOrderChanged.subscribe(() => {
        let guitarOrder = this.httpClientService.SelectedGuitarOrder;
        if (guitarOrder) {
            this.orders.guitarOrders.push(new GuitarOrder(
                guitarOrder.guitar, guitarOrder.quantity));
        }
        this.httpClientService.GuitarOrders = this.orders;
        this.orders = this.httpClientService.GuitarOrders;
        this.total = this.calculateTotal(this.orders.guitarOrders);
    });
  }

  reset() {
    this.orderFinished = false;
    this.orders = new GuitarOrders();
    this.orders.guitarOrders = []
    this.loadTotal();
    this.total = 0;
  }

}
