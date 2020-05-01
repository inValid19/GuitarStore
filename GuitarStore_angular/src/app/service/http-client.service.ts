import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Guitar } from '../model/Guitar';
import { GuitarOrders } from '../model/GuitarOrders';
import { GuitarOrder } from '../model/GuitarOrder';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  guitarOrder: GuitarOrder;
  guitarOrderSubject = new Subject();

  orders: GuitarOrders = new GuitarOrders();
  
  ordersSubject = new Subject();
  totalSubject = new Subject();

  private total: number;

  GuitarOrderChanged = this.guitarOrderSubject;
  OrdersChanged = this.ordersSubject;
  TotalChanged = this.totalSubject;

  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.httpClient.get<User[]>('http://localhost:8080/users/get', {headers});
    return this.httpClient.get<User[]>('http://localhost:8484/users/get', {headers});
  }

  addUser(newUser: User) {
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.httpClient.post<User>('http://localhost:8080/users/add', newUser, {headers});
    return this.httpClient.post<User>('http://localhost:8484/users/add', newUser, {headers});
  }

  deleteUser(id) {
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.httpClient.delete<User>('http://localhost:8080/users/' + id, {headers});
    return this.httpClient.delete<User>('http://localhost:8484/users/' + id, {headers});
  }

  getGuitars() {
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.httpClient.get<Guitar[]>('http://localhost:8080/guitars/get', {headers});
    return this.httpClient.get<Guitar[]>('http://localhost:8484/guitars/get', {headers});
  }

  addGuitar(newGuitar: Guitar) {
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.httpClient.post<Guitar>('http://localhost:8080/guitars/add', newGuitar, {headers});
    return this.httpClient.post<Guitar>('http://localhost:8484/guitars/add', newGuitar, {headers});
  }

  deleteGuitar(id) {
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.httpClient.delete<Guitar>('http://localhost:8080/guitars/' + id, {headers});
    return this.httpClient.delete<Guitar>('http://localhost:8484/guitars/' + id, {headers});
  }

  getAllGuitars(){
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.httpClient.get('http://localhost:8080/guitars/get', {headers});
    return this.httpClient.get('http://localhost:8484/guitars/get', {headers});
  }

  saveOrder(order: GuitarOrders){
    let username='username'
    let password='password'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //return this.httpClient.post('http://localhost:8080/orders', order, {headers});
    return this.httpClient.post('http://localhost:8484/guitars/orders', order, {headers});
  }

  set SelectedGuitarOrder(value: GuitarOrder) {
    this.guitarOrder = value;
    this.guitarOrderSubject.next();
  }

  get SelectedGuitarOrder() {
    return this.guitarOrder;
  }

  set GuitarOrders(value: GuitarOrders) {
    this.orders = value;
    this.ordersSubject.next();
  }

  get GuitarOrders() {
    return this.orders;
  }

  get Total() {
    return this.total;
  }
}