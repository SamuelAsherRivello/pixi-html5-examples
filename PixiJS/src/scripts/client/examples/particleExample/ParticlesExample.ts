
/////////////////////////////
// Example: Show a custom
// fire particle effect
//
// NOTE: I tried some particle plugin but 
// could not get a pre-8.0 example to work
// in 8.x. So I'm doing it custom.
//

import { SuperApp } from "@client/core/SuperApp";
import { ExampleConstants } from "../ExampleConstants";
import { SuperEmitter } from "./SuperEmitter";
import { Example } from "../Example";

/////////////////////////////
export class ParticlesExample extends Example {

    private superEmitter: SuperEmitter;

    constructor(title: string, superApp: SuperApp) {
        super(title, superApp);

        this.superEmitter = new SuperEmitter();
    }

    public override onAddedToStage() {

        // Call Super
        super.onAddedToStage();

        // Do Local
        //TODO: Replace these 2 lines with this._superApp.addToStage (child, parent)
        this.addChild(this.superEmitter);
        this.superEmitter.onAddedToStage();

        // Resize
        this._superApp.resize();

    }

    public override onResize(superApp: SuperApp) {

        // Call Super
        super.onResize(superApp);

        // Do Local
        if (!this.isAddedToStage || this.superEmitter == null) {
            return;
        }

        this.superEmitter.x = Math.max(ExampleConstants.ButtonAreaWidth, this._superApp.app.renderer.width / 2);
        this.superEmitter.y = this._superApp.app.renderer.height / 2;
        this.superEmitter.onResizedStage(this._superApp.app);
    }


    public override onRemovedFromStage() {

        // Call Super
        super.onRemovedFromStage();

        // Do Local
        this.removeChildren(); //clean anything else
    }
}

