import * as PIXI from 'pixi.js';
import { Example } from "../../library/Example"; 
import { SuperEmitter } from './SuperEmitter'; 

/////////////////////////////
// Example: Show a custom
// fire particle effect
//
// NOTE: I tried some particle plugin but 
// could not get a pre-8.0 example to work
// in 8.x. So I'm doing it custom.
//
/////////////////////////////
export class ParticlesExample extends Example  {
    
    private superEmitter : SuperEmitter;

    constructor(title : string, app : PIXI.Application) {
        super(title, app);

        this.superEmitter = new SuperEmitter();
    }

    public override onAddedToStage() {

        super.onAddedToStage();
        this.addChild(this.superEmitter);
        this.superEmitter.onAddedToStage();

    }

    public onResizedStage() {
        super.onResizedStage ();
        this.superEmitter.x = this.app.renderer.width/2;
        this.superEmitter.y = this.app.renderer.height/2;
        this.superEmitter.onResizedStage(this.app);
    }

    public override onRemovedFromStage() {

        super.onRemovedFromStage();
        this.superEmitter.onRemovedFromStage();
        this.removeChild(this.superEmitter);
        this.removeChildren(); //clean anything else
    }
}
   
