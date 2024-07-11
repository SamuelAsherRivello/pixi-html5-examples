import * as PIXI from 'pixi.js';
import { Actions } from 'pixi-actions';
import { SuperApp } from '@src/scripts/library/core/SuperApp';
import { Example } from '@src/scripts/library/project/Example';
import { CardsExample } from '@src/scripts/examples/cardExample/CardsExample';
import { TextExample } from '@src/scripts/examples/textExample/TextExample';
import { ParticlesExample } from '@src/scripts/examples/particleExample/ParticlesExample';
import { SpriteButton } from '@src/scripts/library/project/SpriteButton';
import Stats from 'stats.js';
import { InstructionsText } from './library/core/InstructionsText';


/////////////////////////////
// PIXI Configuration
/////////////////////////////
PIXI.AbstractRenderer.defaultOptions.roundPixels = true; // Crisp pixels
PIXI.AbstractRenderer.defaultOptions.resolution = window.devicePixelRatio || 1; // Crisp pixels


/////////////////////////////
// Setup Stats
/////////////////////////////
const stats = new Stats();
stats.showPanel(0);
stats.dom.className = 'stats-panel';
document.body.appendChild(stats.dom);


/////////////////////////////
// Create App
/////////////////////////////
const superAppConst = new SuperApp(1920, 1080, 'pixi-application-canvas');


/////////////////////////////
// Setup Pixi JS DevTools
// https://bit.ly/pixijs-devtools
/////////////////////////////
(globalThis as any).__PIXI_APP__ = superAppConst.app;


/////////////////////////////
// Handle App Initialize
/////////////////////////////
function onInitializeCompleted(superApp: SuperApp) {


  /////////////////////////////
  // Create Instruction Text
  /////////////////////////////
  const instructionsText = new InstructionsText('Click Menu Buttons');
  instructionsText.x = 2;
  instructionsText.y = stats.dom.clientHeight - 10;
  superApp.addToStage(instructionsText);


  /////////////////////////////
  // Update Systems Every Frame
  /////////////////////////////
  superApp.app.ticker.add((ticker) => {

    stats.begin();
    Actions.tick(ticker.deltaTime / 60);
    stats.end();
  });


  /////////////////////////////
  // Setup Each Example
  /////////////////////////////
  const examples: Example[] = [
    new CardsExample("Cards Example", superApp),
    new TextExample("Text Example", superApp),
    new ParticlesExample("Particle Example", superApp),
  ];

  let currentExampleIndex = -1;

  function switchExample(index: number) {
    if (index === currentExampleIndex) return;

    // Remove current example if exists
    if (currentExampleIndex !== -1) {
      superApp.removeFromStage(examples[currentExampleIndex]);
    }

    currentExampleIndex = index;

    // Add new example
    superApp.addToStage(examples[currentExampleIndex]);
    updateButtons();
  }


  /////////////////////////////
  // Setup Each Button
  /////////////////////////////
  const buttons = examples.map((example: Example, index) => {
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
    button.view.y = 120 + index * 80;
    superApp.addToStage(button.view);

    return button;
  });


  function updateButtons() {
    buttons.forEach((button, index) => {
      button.view.interactive = index !== currentExampleIndex;
      button.view.alpha = index === currentExampleIndex ? 0.5 : 1;
    });
  }

  // Initial setup
  switchExample(0);

}


/////////////////////////////
// Handle App Error
/////////////////////////////
function onInitializeError(error: Error) {
  console.error(`PIXI.Application.init() failed. error = ${error}`);
}


/////////////////////////////
// Initialize App
/////////////////////////////
superAppConst.addListener(SuperApp.EVENT_INITIALIZE_COMPLETE, onInitializeCompleted);
superAppConst.addListener(SuperApp.EVENT_INITIALIZE_ERROR, onInitializeError);

(async () => {
  await superAppConst.init();
})();
