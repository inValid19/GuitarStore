import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { GuitarsComponent } from '../admin/guitars/guitars.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private collapsed = true;
  orderFinished = false;

  @ViewChild('guitarsC', {static: false})
  guitarsC: GuitarsComponent;

  @ViewChild('shoppingCartC',{static: false})
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC',{static: false})
  ordersC: OrdersComponent;

  constructor(private loginService:AuthenticationService) { }

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.orderFinished = false;
    this.guitarsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }
}
