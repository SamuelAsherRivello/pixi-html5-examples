import * as PIXI from 'pixi.js';

export class Example extends PIXI.Container {

    constructor(options = {}) {
      super(options);
    }

    public onAddedToStage() {
      console.log('Example added to stage');
    }

    // Custom event for when the container is removed from the stage
    public onRemovedFromStage() {
      console.log('Example removed from stage');
   
    }

}