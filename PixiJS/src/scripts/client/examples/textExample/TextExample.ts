import { SuperApp } from '@client/core/SuperApp';
import * as PIXI from 'pixi.js';
import { SuperText } from './SuperText';
import { Example } from '../Example';

/////////////////////////////
// Example: Show a custom class
// to handle some random fun
// text messages on a timer
/////////////////////////////
export class TextExample extends Example {

    private superText: SuperText;

    constructor(title: string, superApp: SuperApp) {
        super(title, superApp);

        const messages: string[] = [
            "Welcome!",
            "You lose!",
            "You win!",
            "Good bye!",
            "You tie!",
            "Game over!"
        ];

        const emojis: string[] = [
            "🌞",
            "💀",
            "🎉"
        ];

        const fontSizes: number[] = [
            30,
            60,
            90
        ];

        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fill: '#ffffff' });
        this.superText = new SuperText(messages, emojis, fontSizes, 2, style);
        this.superText.anchor.set(0.5); // Center the text anchor point
    }

    public override onAddedToStage() {
        super.onAddedToStage();
        this.addChild(this.superText);
        this.superText.start();

    }

    public override onResize(superApp: SuperApp) {

        // Call Super
        super.onResize(superApp);

        // Do Local
        if (!this.isAddedToStage) {
            return;
        }

        this.superText.position.set(
            this._superApp.app.screen.height * 0.2,
            -this._superApp.app.screen.height * 0.2);
    }

    public override onRemovedFromStage() {
        super.onRemovedFromStage();
        this.superText.stop();
        this.removeChild(this.superText);
        this.removeChildren(); // Clear out any remaining children
    }
}
