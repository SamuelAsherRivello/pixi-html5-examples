import * as PIXI from 'pixi.js';
import * as UI from '@pixi/ui';

/////////////////////////////
// Reusable Button
//
// INSPIRED BY: https://pixijs.io/ui/storybook/?path=/story/components-button-use-sprite--use-sprite&args=text:Example
//
/////////////////////////////
export class SpriteButton extends UI.Button {

    // Private member consts
    private static readonly AssetButtonDefault = 'assets/images/ui/buttonDefault.png';
    private static readonly AssetButtonHover = 'assets/images/ui/buttonHover.png';
    private static readonly AssetButtonPressed = 'assets/images/ui/buttonPressed.png';

    private static readonly ActionDown = 'down';
    private static readonly ActionUp = 'up';
    private static readonly ActionOut = 'out';
    public static readonly ActionOnPress = 'onPress';
    private static readonly ActionHover = 'hover';

    // Member variables
    private buttonView = new PIXI.Sprite();
    private textView = new PIXI.Text();
    private action: (event: string) => void = () => {};
    private isButtonDown = false; // Custom state to manage the down state

    constructor(props: { text: string, textColor: string, disabled: boolean, action: (event: string) => void }) {
        super();

        this.view = this.buttonView;
        this.view.label = `SpriteButton (${props.text})`;


        /////////////////////////////
        // Setup the states
        // up/over/down/etc...
        /////////////////////////////
        const textures = [
            SpriteButton.AssetButtonDefault,
            SpriteButton.AssetButtonHover,
            SpriteButton.AssetButtonPressed
        ];

        PIXI.Assets.load(textures).then(() => {

            const defaultTexture = PIXI.Texture.from(SpriteButton.AssetButtonDefault);
            const hoverTexture = PIXI.Texture.from(SpriteButton.AssetButtonHover);
            const pressedTexture = PIXI.Texture.from(SpriteButton.AssetButtonPressed);
            this.buttonView.texture = defaultTexture;
            this.buttonView.anchor.set(0.5);


            /////////////////////////////
            // Setup text
            /////////////////////////////
            this.textView = new PIXI.Text({
                text: props.text,
                style: new PIXI.TextStyle({
                    fontSize: 20,
                    fontFamily: 'Arial',
                    align: 'center',
                    fill: props.textColor
                })
            });

            this.textView.anchor.set(0.5);
            this.textView.position.set(0, 0);
            this.enabled = !props.disabled;
            this.action = props.action;

            //TODO: (Low Priority) This shows deprecated. 
            this.buttonView.addChild(this.textView);

            /////////////////////////////
            // Setup Interactivity
            /////////////////////////////
            this.onPress.connect(() => this.handleEvent(() => this.press()));
            this.onHover.connect(() => this.handleEvent(() => this.hover()));
            this.onDown.connect(() => this.handleEvent(() => this.down()));
            this.onUp.connect(() => this.handleEvent(() => this.up()));
            this.onOut.connect(() => this.handleEvent(() => this.out()));
        });
    }

    private handleEvent(callback: () => void) {
        if (this.enabled) {
            callback();
        } else {
            console.log('Button disabled, event not handled');
        }
    }

    override down() {
        if (!this.isButtonDown) {
            this.buttonView.texture = PIXI.Texture.from(SpriteButton.AssetButtonPressed);
            this.action(SpriteButton.ActionDown);
            this.isButtonDown = true;
        }
    }

    override up() {
        if (this.isButtonDown) {
            this.buttonView.texture = PIXI.Texture.from(SpriteButton.AssetButtonHover);
            this.action(SpriteButton.ActionUp);
            this.isButtonDown = false;
        }
    }

    override out() {
        if (!this.isButtonDown) {
            this.buttonView.texture = PIXI.Texture.from(SpriteButton.AssetButtonDefault);
        }
        this.action(SpriteButton.ActionOut);
    }

    override press() {
        this.action(SpriteButton.ActionOnPress);
    }

    override hover() {
        if (!this.isButtonDown) {
            this.buttonView.texture = PIXI.Texture.from(SpriteButton.AssetButtonHover);
        }
        this.action(SpriteButton.ActionHover);
    }
}
