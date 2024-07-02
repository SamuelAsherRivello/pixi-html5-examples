import * as PIXI from 'pixi.js';
import { Card } from './Card';
import { CardsExample } from './CardsExample';

/////////////////////////////
// Represents a screen location
// for a collection of zero or 
// more Cards
/////////////////////////////
export class Hand extends PIXI.Sprite {

    public cards: Card[] = [];

    constructor() {
        super();
        //console.log(`${this.constructor.name}.constructor()`);
    }
}
