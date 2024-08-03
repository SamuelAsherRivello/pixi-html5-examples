import { SuperApp } from '@client/core/SuperApp';
import { SuperSprite } from '@client/core/SuperSprite';
import * as PIXI from 'pixi.js';

/**
 * Custom Sprite class that handles resizing and positioning
 */
export class Example extends SuperSprite {

  // Fields ---------------------------------------
  public title: string;


  // Initialization -------------------------------
  constructor(title: string, superApp: SuperApp) {
    super(superApp);
    this.title = title;

  }

  // Methods -------------------------------------
  public override onAddedToStage() {
    super.onAddedToStage();
    //console.log(`${this.title}.onAddedToStage()`);
  }

  public override onRemovedFromStage() {
    super.onRemovedFromStage();
    //console.log(`${this.title}.onRemovedFromStage()`);
  }


  protected override onResize(superApp: SuperApp): void {
    this.position.set(this._superApp.app.renderer.width / 2, this._superApp.app.renderer.height / 2);
  }

  protected override onTick(ticker: PIXI.Ticker): void {
    // Empty implementation, to be overridden by subclasses
  }

  // Event Handlers -------------------------------

}