import * as PIXI from 'pixi.js';
import { Actions, Interpolations } from 'pixi-actions';
import { Example } from "../../Library/Example"; 
import { ExampleConstants } from "./ExampleConstants"; 
import { Card } from './Card';
import { Deck } from './Deck';
import { Hand } from './Hand';

/////////////////////////////
// Example: Show 2 hands of 
// cards with animation
/////////////////////////////
export class CardsExample extends Example {
    
    // TODO: Use production values
    // Private member consts
    private static readonly TimeMoveCardDuration = 2; // use '2' in production
    private static readonly TimeDelayBetweenCards = 1; // use '1' in production
    private static readonly AmountCardTotal = 144; // use '144' in production 
    private static readonly PositionCardOffsetY = -4; 
    private static readonly PositionHandOffsetX = 200; 
   
    private deck: Deck = new Deck();
    private hand01: Hand = new Hand();
    private hand02: Hand = new Hand();
    private cards: Card[] = [];

    constructor(options = {}, app: PIXI.Application) {
        super(options, app);

        this.hand01.x = app.renderer.width / 2;
        this.hand01.y = app.renderer.height - 100;

        this.hand02.x = this.hand01.x + CardsExample.PositionHandOffsetX;
        this.hand02.y = this.hand01.y;
    }

    public override onAddedToStage() {
        super.onAddedToStage();

        // Create Card at Hand01
        for (let order = 0; order < CardsExample.AmountCardTotal; order++) {
            
            let depth01 = order;

            let card = this.deck.getCard();
            card.scale.set(0.2);
            card.x = this.hand01.x;
            card.y = this.hand01.y + CardsExample.PositionCardOffsetY * order; 
            card.zIndex = depth01;
            this.addChild(card);
            this.sortChildren();
            this.cards[order] = card;
        }


        let timeDelayBetweenCards = 
            CardsExample.TimeDelayBetweenCards / ExampleConstants.TimeScale;

        let timeMoveCardDuration = 
            CardsExample.TimeMoveCardDuration / ExampleConstants.TimeScale;

        // Move Card to Hand02
        let depth02 = 0;
        for (let i = this.cards.length - 1; i >= 0; i--) {

            depth02++;
            let myDepth = depth02;

            let card: Card = this.cards[i];
            let action = Actions.sequence(
                Actions.delay(depth02 * timeDelayBetweenCards),
                Actions.runFunc( () =>
                {
                    let newDepth = CardsExample.AmountCardTotal + myDepth;
                    card.zIndex = newDepth;
                    this.sortChildren();
                }),
                Actions.moveTo(card, 
                    this.hand02.x, 
                    this.hand02.y + CardsExample.PositionCardOffsetY * depth02,
                    timeMoveCardDuration, 
                    Interpolations.smooth2)
            );
            action.play();
        }
    }

    public override onRemovedFromStage() {
        super.onRemovedFromStage();

         // Remove tweens
        for (let i = 0; i < this.cards.length; i++)
        {
            Actions.remove (this.cards[i]);
        }

        // Remove all children and clear out any arrays
        this.removeChildren();
        this.cards = [];
    }
}
