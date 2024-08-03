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

    private messages: string[];
    private emojis: string[];
    private interval: number;
    private currentIndex: number;
    private fontSizes: number[];

    constructor(messages: string[], emojis: string[], fontSizes: number[], interval: number, style: PIXI.TextStyle) {
        super({ text: "", style: style });

        this.messages = messages;
        this.emojis = emojis;
        this.fontSizes = fontSizes;

        this.interval = interval;
        this.currentIndex = 0;
        this.timer = 0;
        this.updateText();
    }

    private updateText() {

        this.style.fontSize = this.getRandomValueFromArray(this.fontSizes);
        const message = this.getRandomValueFromArray(this.messages);
        const emoji = this.getRandomValueFromArray(this.emojis);

        //50/50 chance per ordering
        if (this.getRandomValueFromArray([true, false])) {
            this.text = message + emoji;
        }
        else {
            this.text = emoji + message;
        }

    }

    private getRandomValueFromArray<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    public start() {

        let timeDelayBetweenCalls = (this.interval * 1000) / ExampleConstants.TimeScale;
        this.stop();
        this.timer = setInterval(() => {
            this.updateText();
        }, timeDelayBetweenCalls);
    }

    public stop() {
        if (this.timer) {
            clearInterval(this.timer as NodeJS.Timeout);
        }
    }
}
