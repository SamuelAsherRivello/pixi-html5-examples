import * as PIXI from 'pixi.js';
import { Emitter } from '@pixi/particle-emitter';
import { EmitterConfig } from './EmitterConfig';

export class SuperEmitter extends PIXI.Container {
  //private emitter: Emitter;
  private elapsed: number;

  constructor(options = {}) {
    super(options);

    // Create the emitter container
    const particleContainer = new PIXI.Container();
    this.addChild(particleContainer);

    // Initialize the emitter
    //this.emitter; //new Emitter(particleContainer, EmitterConfig as any);
    this.elapsed = Date.now();

    // Bind the update function to the current instance
    this.update = this.update.bind(this);
  }

  private update(delta: number) {
    const now = Date.now();
    //this.emitter.update((now - this.elapsed) * 0.001);
    this.elapsed = now;
  }

  public onAddedToStage() {
    console.log(`${this.constructor.name}.onAddedToStage()`);
    this.visible = true;
    //this.emitter.emit = true;

  }

  public onRemovedFromStage() {
    console.log(`${this.constructor.name}.onRemovedFromStage()`);
    this.visible = false;
    //this.emitter.emit = false;

    //PIXI.Ticker.shared.remove(this.update);
  }
}
