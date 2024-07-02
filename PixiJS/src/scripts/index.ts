import '../css/styles.css'; 
import * as PIXI from 'pixi.js';
import { Example } from "./library/Example";
import { SpriteButton } from './library/SpriteButton';
import { CardsExample } from "./examples/cardExample/CardsExample";
import { TextExample } from './examples/textexample/TextExample';
import { ParticlesExample } from './examples/particleExample/ParticlesExample';
import { Actions } from 'pixi-actions';
import { ExampleConstants } from './examples/ExampleConstants';
/////////////////////////////
// Create the Pixi JS App
/////////////////////////////
const app = new PIXI.Application();

async function initializeApp() {
    await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: false,
        resizeTo: window,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
        canvas: document.getElementById('pixi-application-canvas') as HTMLCanvasElement,
    });

    console.log('PIXI.Application.init()');

    /////////////////////////////
    // Setup for 
    // Pixi JS Dev Console
    /////////////////////////////
    (globalThis as any).__PIXI_APP__ = app; // eslint-disable-line

    /////////////////////////////
    // Setup for
    // FPS Display
    /////////////////////////////
    let fpsUpdateCounter = 0;
    const fpsUpdateInterval = 50; 
    const titleText = new PIXI.Text({
      text: 'Title\nFPS: 0',
      style: new PIXI.TextStyle({
          fontSize: 18,
          fill: '#ffffff'
      })
    });
    titleText.position.set(25, 10);
    app.stage.addChild(titleText);

    
    /////////////////////////////
    // Create list of 
    // Examples to show
    /////////////////////////////
    const examples = [
        new CardsExample("Cards Example", app),
        new TextExample("Text Example", app),
        new ParticlesExample("Particle Example", app),
    ];

    let currentExampleIndex = -1;

    function switchExample(index: number) {
        if (index === currentExampleIndex) return;

        // Remove current example if exists
        if (currentExampleIndex !== -1) {
            app.stage.removeChild(examples[currentExampleIndex]);
            examples[currentExampleIndex].onRemovedFromStage();
        }

        currentExampleIndex = index;

        // Add new example
        app.stage.addChild(examples[currentExampleIndex]);
        examples[currentExampleIndex].onAddedToStage();

        updateButtons();
    }

    function updateButtons() {
        buttons.forEach((button, index) => {
            button.view.interactive = index !== currentExampleIndex;
            button.view.alpha = index === currentExampleIndex ? 0.5 : 1;
        });
    }

    /////////////////////////////
    // Setup Each Example
    /////////////////////////////
    examples.forEach((example, index) => {
        app.stage.addChild(example);
        example.visible = index === currentExampleIndex; // Show only the current example
    });

    /////////////////////////////
    // Setup Each Button
    /////////////////////////////
    const buttons = examples.map((example : Example, index) => {
        const button = new SpriteButton({
            text: `${index + 1}. ${example.title}`,
            textColor: '#505050',
            disabled: false,
            action: (event: string) => {
                if (event === SpriteButton.ActionOnPress) {
                    switchExample(index);
                }
            }
        });

        button.view.x = 120; 
        button.view.y = 100 + index * 80;  
        app.stage.addChild(button.view);

        return button;
    });

    /////////////////////////////
    // Setup Tweening Library
    //
    // Source: https://github.com/srpatel/pixi-actions
    //
    /////////////////////////////
    app.ticker.add((ticker) => {
        Actions.tick(ticker.deltaTime / 60);

        //let body = document.body;
        //let sizingInfo = `Window: ${window.screen.width}x${window.screen.height}\n` +
        //                  `App: ${Math.round(app.renderer.width)}x${Math.round(app.renderer.height)}\n` +
        //                  `Body: ${Math.round(body.clientWidth)}x${Math.round(body.clientHeight)}\n';

        fpsUpdateCounter++;
        if (fpsUpdateCounter >= fpsUpdateInterval) {
            fpsUpdateCounter = 0;
            titleText.text = `${ExampleConstants.ProjectTitle}\n` +
            `FPS: ${Math.round(ticker.FPS*10)/10}`;
        }
    });


    /////////////////////////////
    // Setup Responsiveness
    //
    /////////////////////////////

    //listen to window change
    window.addEventListener('resize', onResizedStage);

    //listen to body change
    const resizeObserver = new ResizeObserver(onResizedStage);
    resizeObserver.observe(document.body);

    //propogate to examples
    function onResizedStage() {
        examples.forEach(example => {
            example.onResizedStage();
        });
    }

    // Initial setup
    onResizedStage(); 
    switchExample(0);
}

// Call the async initialization function
initializeApp().then(() => {
    //
}).catch((error) => {
    console.error('Failed PIXI.Application.init(), error= ' + error);
});
