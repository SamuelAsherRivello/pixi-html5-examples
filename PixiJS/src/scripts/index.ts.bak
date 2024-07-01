import '../css/styles.css'; 
import * as PIXI from 'pixi.js';

/////////////////////////////
// Create the Pixi JS App
/////////////////////////////
const app = new PIXI.Application();

app.init({
  width: 800,
  height: 600,
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
// Load a flower
/////////////////////////////
PIXI.Assets.load(['assets/images/flowerTop.png']).then(() => {
  const myTexture = PIXI.Texture.from('assets/images/flowerTop.png');
  const mySprite = new PIXI.Sprite(myTexture);

  mySprite.anchor.set(0.5);
  app.stage.addChild(mySprite);


  /////////////////////////////
  // Handle per-frame 
  // interactivity / animation
  /////////////////////////////
  app.ticker.add((ticker: PIXI.Ticker) => {
    mySprite.rotation += 0.01 * ticker.deltaTime;
  });

  /////////////////////////////
  // Respond to window resize
  /////////////////////////////
  const resize = () => {
    mySprite.x = app.screen.width / 2;
    mySprite.y = app.screen.height / 2;

    const scale = Math.min(app.screen.width / mySprite.texture.width, app.screen.height / mySprite.texture.height);
    mySprite.scale.set(scale, scale);
  };

  const forceResize = () => {
    setTimeout(resize, 100);
  };

  /////////////////////////////
  // Observe window resize
  /////////////////////////////
  window.addEventListener('resize', resize);
  window.addEventListener('resize', forceResize);
  window.addEventListener('orientationchange', resize);
  window.addEventListener('orientationchange', forceResize);
  resize(); // Initial resize


}).catch((error) => {

  /////////////////////////////
  // Handle any errors 
  /////////////////////////////
  console.error('Error loading assets:', error);
});
