import * as PIXI from 'pixi.js';
import { Example } from "../../Library/Example"; 
import { SuperText } from "./SuperText"; 

/////////////////////////////
// Example: Show a custom class
// to handle some random fun
// text messages on a timer
/////////////////////////////
export class TextExample extends Example {

    private superText: SuperText;

    constructor(options = {}, app: PIXI.Application) {
        super(options, app);

        const messages = [
            { text: "Welcome! 🌞" },
            { text: "You lose! 💀"},
            { text: "You win! 🎉" }
        ];

        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 36, fill: '#ffffff' });
        this.superText = new SuperText(messages, 2, style);
    }

    public override onAddedToStage() {
        super.onAddedToStage();
        this.superText.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2);
        this.superText.anchor.set(0.5); // Center the text anchor point
        this.addChild(this.superText);
        this.superText.start();
    }

    public override onRemovedFromStage() {
        super.onRemovedFromStage();
        this.superText.stop();
        this.removeChild(this.superText);
        this.removeChildren(); // Clear out any remaining children
    }
}
