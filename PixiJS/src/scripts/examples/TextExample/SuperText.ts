import * as PIXI from 'pixi.js';
import { ExampleConstants } from '../ExampleConstants';

/////////////////////////////
// Example: Show a custom class
// to handle some random fun
// text messages on a timer
/////////////////////////////

export class SuperText extends PIXI.Text {

    //Helpful: https://stackoverflow.com/questions/51376589/typescript-what-type-is-setinterval
    private timer: number | ReturnType<typeof setInterval>;

    private messages: { text: string}[];
    private interval: number;
    private currentIndex: number;



    constructor(messages: { text: string}[], interval: number, style: PIXI.TextStyle) {
        super({text :"", style : style});
        this.messages = messages;
        this.interval = interval;
        this.currentIndex = 0;
        this.timer = 0;
        this.updateText();
    }

    private updateText() {
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.text = message.text;
    }

    public start() {

        let timeDelayBetweenCalls = (this.interval * 1000) / ExampleConstants.TimeScale;
        this.stop(); 
        this.timer = setInterval(() => {
            this.updateText();
        }, timeDelayBetweenCalls );
    }

    public stop() {
        if (this.timer) {
            clearInterval(this.timer as NodeJS.Timeout);
        }
    }
}
