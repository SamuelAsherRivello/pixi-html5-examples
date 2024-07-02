import * as PIXI from 'pixi.js';

/////////////////////////////
// Represents one playing card 
// from a typical poker deck.
//
// NOTE: Only the card back is 
// relevant here. No #. No suit.
//
/////////////////////////////
export class Card extends PIXI.Sprite {

    // Consts
    private static readonly AssetCardBack = 'assets/images/cards/back01.png';

    constructor() {
        super();
        //console.log(`${this.constructor.name}.constructor()`);

        this.anchor.set(0.5);
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.loadTexture();
    }

    private async loadTexture() {

        //TODO: OPTIMIZATION - If this is NOT cached automatically, 
        //Then load it in the deck and pass the texture to the card
        await PIXI.Assets.load(Card.AssetCardBack);

        //
        this.texture = PIXI.Texture.from(Card.AssetCardBack);
    }
}
