import { Card } from './Card';

/////////////////////////////
// Represents the source
// of Cards
//
// NOTE: For now, has no amount
// of cards, no shuffling, etc...
//
/////////////////////////////
export class Deck {

    constructor() {
        //console.log(`${this.constructor.name}.constructor()`);
    }

    public getCard() : Card {
        let card : Card = new Card();
        card.scale.set(0.25);
        return card;
    }
}
