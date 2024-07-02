import * as PIXI from 'pixi.js';

export class Example extends PIXI.Container {

    //TBD: I may want access to the app
    //or some part within
    public app : PIXI.Application;

    constructor(options = {}, app : PIXI.Application) {
      super(options);
      this.app = app;
    }

    public onAddedToStage() {
      console.log(`${this.constructor.name}.onAddedToStage()`);
      this.visible = true; 
    }

    // Custom event for when the container is removed from the stage
    public onRemovedFromStage() {
      console.log(`${this.constructor.name}.onRemovedFromStage()`);
      this.visible = false; 
    }

}