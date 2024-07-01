import '../css/styles.css'; 
import * as PIXI from 'pixi.js';
import { CardsExample } from "./examples/CardsExample";
import { SpriteButton } from './library/SpriteButton';
import { TextExample } from './examples/TextExample';
import { ParticlesExample } from './examples/ParticlesExample';

/////////////////////////////
// Create the Pixi JS App
/////////////////////////////
const app = new PIXI.Application();

app.init({
  width: 1920,
  height: 1080,
  backgroundColor: 0x1099bb,
  resizeTo: window,
  canvas: document.getElementById('pixi-application-canvas') as HTMLCanvasElement,
});

/////////////////////////////
// Setup for 
// Pixi JS Dev Console
/////////////////////////////
(globalThis as any).__PIXI_APP__ = app; // eslint-disable-line

/////////////////////////////
// Create list of 
// Examples to show
/////////////////////////////
const examples = [
  new CardsExample(),
  new TextExample(),
  new ParticlesExample(),
];

let currentExampleIndex = -1;

function switchExample(index: number) {
  if (index === currentExampleIndex) return;

  // Remove
  if (examples[currentExampleIndex] != null)
  {
    app.stage.removeChild(examples[currentExampleIndex]);
    examples[currentExampleIndex].onRemovedFromStage();
  }


  currentExampleIndex = index;

  // Add
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
const buttons = examples.map((_, index) => {
  const button = new SpriteButton({
    text: `Example ${index + 1}`,
    textColor: '#505050',
    disabled: false,
    action: (event: string) => {
     
      if (event === SpriteButton.ActionOnPress) {
        switchExample(index);
      }
    }
  });

  button.view.x = 120 
  button.view.y = 50 + index * 80;  

  app.stage.addChild(button.view);

  return button;
});

// Initial setup
switchExample(0);

