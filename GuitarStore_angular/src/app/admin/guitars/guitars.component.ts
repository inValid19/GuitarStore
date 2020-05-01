import { Component, OnInit, ViewChild } from '@angular/core';
import { Guitar } from 'src/app/model/Guitar';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GuitarOrder } from 'src/app/model/GuitarOrder';
import { GuitarOrders } from 'src/app/model/GuitarOrders';
import { Subscription } from 'rxjs';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';
import { OrdersComponent } from 'src/app/orders/orders.component';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  orderFinished = false;
  @ViewChild('guitarsC', {static: false})
  guitarsC: GuitarsComponent;

  @ViewChild('shoppingCartC',{static: false})
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC',{static: false})
  ordersC: OrdersComponent;

  guitarOrders: GuitarOrder[] = [];
  //guitars: Guitar[] = [];
  selectedGuitarOrder: GuitarOrder;
  private shoppingCartOrders: GuitarOrders;
  sub: Subscription;
  guitarSelected: boolean = false;


  guitars: Array<Guitar>;
  action: string;
  selectedGuitar: Guitar;
  guitarsRecieved: Array<Guitar>;
  
  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.guitarOrders = [];
    this.loadGuitars();
    this.loadOrders();
    this.refreshData();
  }

  addToCart(order: GuitarOrder) {
    this.httpClientService.SelectedGuitarOrder = order;
    this.selectedGuitarOrder = this.httpClientService.SelectedGuitarOrder;
    this.guitarSelected = true;
  }


  removeFromCart(guitarOrder: GuitarOrder) {
    let index = this.getGuitarIndex(guitarOrder.guitar);
    if (index > -1) {
        this.shoppingCartOrders.guitarOrders.splice(
            this.getGuitarIndex(guitarOrder.guitar), 1);
    }
    this.httpClientService.GuitarOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.httpClientService.GuitarOrders;
    this.guitarSelected = false;
  }

  getGuitarIndex(guitar: Guitar): number {
    return this.httpClientService.GuitarOrders.guitarOrders.findIndex(
        value => value.guitar === guitar);
  }

  isGuitarSelected(guitar: Guitar): boolean {
    return this.getGuitarIndex(guitar) > -1;
  }

  loadGuitars() {
    this.httpClientService.getAllGuitars()
        .subscribe(
            (guitars: any[]) => {
                this.guitars = guitars;
                this.guitars.forEach(guitar => {
                    this.guitarOrders.push(new GuitarOrder(guitar, 0));
                })
            },
            (error) => console.log(error)
        );
  }
  
  loadOrders() {
    this.sub = this.httpClientService.OrdersChanged.subscribe(() => {
        this.shoppingCartOrders = this.httpClientService.GuitarOrders;
    });
  }

  reset() {
    this.guitarOrders = [];
    this.loadGuitars();
    this.httpClientService.GuitarOrders.guitarOrders = [];
    this.loadOrders();
    this.guitarSelected = false;

    this.orderFinished = false;
    this.guitarsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  refreshData(){
    this.httpClientService.getGuitars().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
	      // get the parameter id. this will be the id of the guitar whose details 
	      // are to be displayed when action is view.
	      const id = params['id'];
	      // if id exists, convert it to integer and then retrive the guitar from
	      // the guitars array
        if (id) {
          this.selectedGuitar = this.guitars.find(guitar => {
            return guitar.id === +id;
          });
        }
      }
    );
  }

  // we will be taking the guitars response returned from the database
  // and we will be adding the retrieved   
  handleSuccessfulResponse(response) {
    this.guitars = new Array<Guitar>();
    //get guitars returned by the api call
    this.guitarsRecieved = response;
    for (const guitar of this.guitarsRecieved) {
    
      const guitarwithRetrievedImageField = new Guitar();
      guitarwithRetrievedImageField.id = guitar.id;
      guitarwithRetrievedImageField.name = guitar.name;
      //populate retrieved image field so that guitar image can be displayed
      guitarwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + guitar.picByte;
      guitarwithRetrievedImageField.type = guitar.type;
      guitarwithRetrievedImageField.price = guitar.price;
      guitarwithRetrievedImageField.picByte=guitar.picByte;
      this.guitars.push(guitarwithRetrievedImageField);
    }
  }

  addGuitar() {
    this.selectedGuitar = new Guitar();
    this.router.navigate(['admin', 'guitars'], { queryParams: { action: 'add' } });
  }

  viewGuitar(id: number) {
    this.router.navigate(['admin', 'guitars'], { queryParams: { id, action: 'view' } });
  }
  
}
