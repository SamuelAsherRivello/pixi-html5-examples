import * as PIXI from 'pixi.js';
import { Example } from "../../library/Example"; 
import { SuperEmitter } from './SuperEmitter'; 

export class ParticlesExample extends Example  {
    
    private superEmitter : SuperEmitter;

    constructor(title : string, app : PIXI.Application) {
        super(title, app);

        this.superEmitter = new SuperEmitter();
    }

    public override onAddedToStage() {

        super.onAddedToStage();

        this.addChild(this.superEmitter);

    }

    public override onRemovedFromStage() {

        super.onRemovedFromStage();

        this.removeChild(this.superEmitter);
        this.removeChildren(); //clean anything else
    }
}
   
