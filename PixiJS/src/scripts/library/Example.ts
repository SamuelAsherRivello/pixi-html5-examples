import * as PIXI from 'pixi.js';

export class Example extends PIXI.Container {

    //TBD: I may want access to the app
    //or some part within
    public app : PIXI.Application;
    public title  : string;

    constructor(title : string, app : PIXI.Application) {
      super({});
      this.title = title;
      this.app = app;
    }

    public onAddedToStage() {
      //console.log(`${this.constructor.name}.onAddedToStage()`);
      this.visible = true; 
    }

    public onResizedStage() {
      //console.log(`${this.constructor.name}.onResizedStage()`);
      this.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2);
    }

    // Custom event for when the container is removed from the stage
    public onRemovedFromStage() {
      //console.log(`${this.constructor.name}.onRemovedFromStage()`);
      this.visible = false; 
    }

}