import * as PIXI from 'pixi.js';
import { Actions, Interpolations } from 'pixi-actions';
import { Example } from "../../library/Example"; 
import { ExampleConstants } from "../ExampleConstants"; 
import { Card } from './Card';

/////////////////////////////
// Example: Show 2 hands of 
// cards with animation
/////////////////////////////
export class CardsExample extends Example {
    
    // Constants
    private static readonly TimeMoveCardDuration = 2;   // use '2' in production
    private static readonly TimeDelayBetweenCards = 1;  // use '1' in production
    private static readonly AmountCardTotal = 144;      // use '144' in production 
    private static readonly PositionCardOffsetY = -4; 
    private static readonly PositionHandOffsetX = 100; 
   
    private hand01: PIXI.Point = new PIXI.Point();
    private hand02: PIXI.Point = new PIXI.Point();;
    private cards: Card[] = [];

    constructor(title : string, app: PIXI.Application) {
        super(title, app);
        this.onResizedStage();
    }

    public override onAddedToStage() {
        super.onAddedToStage();

        // Create Card at Hand01
        for (let order = 0; order < CardsExample.AmountCardTotal; order++) {
            
            let depth = order;

            let card = this.getCard();
            card.scale.set(0.2);
            card.x = this.hand01.x;
            card.y = this.hand01.y + CardsExample.PositionCardOffsetY * order; 
            card.zIndex = depth;
            this.addChild(card);
            this.sortChildren();
            this.cards[order] = card;
        }


        let timeDelayBetweenCards = 
            CardsExample.TimeDelayBetweenCards / ExampleConstants.TimeScale;

        let timeMoveCardDuration = 
            CardsExample.TimeMoveCardDuration / ExampleConstants.TimeScale;

        // Move Card to Hand02
        let order02 = 0;
        for (let i = this.cards.length - 1; i >= 0; i--) {

            order02++;
            let myDepth = order02;

            let card: Card = this.cards[i];

            let action = Actions.sequence(

                Actions.delay(order02 * timeDelayBetweenCards),
                Actions.runFunc( () =>
                {
                    let newDepth = CardsExample.AmountCardTotal + myDepth;
                    card.zIndex = newDepth;
                    this.sortChildren();
                }),
                Actions.parallel(

                    Actions.moveTo(card, 
                        this.hand02.x, 
                        this.hand02.y + CardsExample.PositionCardOffsetY * order02,
                        timeMoveCardDuration, 
                        Interpolations.fade),

                        //BONUS: Rotate 180d just for fun
                        Actions.rotateTo(card, Math.PI, timeMoveCardDuration)
                )
            );
            action.play();
        }
    }

    public getCard() : Card {
        let card : Card = new Card();
        return card;
    }

    public onResizedStage() {
        super.onResizedStage ();

        this.hand01.x = this.app.renderer.width * .06;
        this.hand01.y = this.app.renderer.height * .42;

        this.hand02.x = this.hand01.x + CardsExample.PositionHandOffsetX;
        this.hand02.y = this.hand01.y;
        
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
