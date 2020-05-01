import { Guitar } from './Guitar';

export class GuitarOrder{
    guitar: Guitar;
    quantity: number;

    constructor(guitar: Guitar, quantity: number) {
        this.guitar = guitar;
        this.quantity = quantity;
    }
}