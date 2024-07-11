import * as PIXI from 'pixi.js';

type ParticleExtension = {
  deltaX: number;
  deltaY: number;
  deltaAlpha: number;
  deltaScale: number;
  deltaRotation: number;
  timeLifeFramesRemaining: number;
  startTint: number;
};

type Particle = PIXI.Sprite & ParticleExtension;

export class SuperEmitter extends PIXI.Container {
  private particles: Particle[] = [];
  private particleTexture: PIXI.Texture = new PIXI.Texture();
  private displacementFilter!: PIXI.DisplacementFilter;
  private displacementSprite!: PIXI.Sprite;
  private ticker: PIXI.Ticker;
  private screenWidth: number = -1;
  private screenHeight: number = -1;
  private static readonly DisplacementDeltaX = 1;
  private static readonly DisplacementDeltaY = 2;
  private static readonly TimeLifeFramesRemainingMax = 60;
  private static readonly AssetParticle = 'assets/images/fires/fire.png';
  private static readonly AssetDisplacementFilter = 'assets/images/fires/fireDisplacement.png';
  private static readonly AmountMaxConcurrentParticles = 10;

  constructor() {
    super();
    this.loadTextures();
    this.ticker = new PIXI.Ticker();
    this.ticker.add(this.onTick, this);
  }

  public async loadTextures() {
    await PIXI.Assets.load(SuperEmitter.AssetParticle);
    this.particleTexture = PIXI.Texture.from(SuperEmitter.AssetParticle);

    await PIXI.Assets.load(SuperEmitter.AssetDisplacementFilter);
    this.displacementSprite = PIXI.Sprite.from(SuperEmitter.AssetDisplacementFilter);

    this.displacementFilter = new PIXI.DisplacementFilter(this.displacementSprite);
    this.displacementSprite.texture.source.addressMode = "repeat";
    this.displacementFilter.scale.x = 10;
    this.displacementFilter.scale.y = 5;
    this.addChild(this.displacementSprite);
    this.filters = [this.displacementFilter];
  }

  public async onAddedToStage() {
    await this.loadTextures();

    for (let i = 0; i < SuperEmitter.AmountMaxConcurrentParticles; i++) {
      const particle = this.createParticle();
      this.addChild(particle);
      this.particles.push(particle);
    }

    this.ticker.start();
  }

  public onResizedStage(app: PIXI.Application) {
    this.screenWidth = app.screen.width;
    this.screenHeight = app.screen.height;

    // OPTIONAL: Comment-in to clear screen on resize
    // this.particles.forEach(this.resetParticle, this);
  }

  public onRemovedFromStage() {
    this.ticker.stop();

    this.particles.forEach(particle => {
      this.removeChild(particle);
    });
    this.particles = [];
  }

  private createParticle(): Particle {
    const particle = new PIXI.Sprite(this.particleTexture) as Particle;
    particle.anchor.set(0.5);
    this.resetParticle(particle);
    return particle;
  }

  private onTick() {
    this.displacementSprite.x += SuperEmitter.DisplacementDeltaX;
    this.displacementSprite.y += SuperEmitter.DisplacementDeltaY;

    this.particles.forEach((particle) => {
      particle.x += particle.deltaX * this.ticker.deltaTime;
      particle.y += particle.deltaY * this.ticker.deltaTime;
      particle.scale.x = Math.max(0, particle.scale.x + particle.deltaScale);
      particle.scale.y = Math.max(0, particle.scale.y + particle.deltaScale);
      particle.rotation += particle.deltaRotation * this.ticker.deltaTime;
      particle.timeLifeFramesRemaining -= this.ticker.deltaTime;
      particle.tint = this.interpolateColor(0xFF4500, particle.startTint, 1 - (particle.timeLifeFramesRemaining / SuperEmitter.TimeLifeFramesRemainingMax));

      if (particle.timeLifeFramesRemaining > SuperEmitter.TimeLifeFramesRemainingMax * 0.9) {
        particle.alpha = 1 - ((SuperEmitter.TimeLifeFramesRemainingMax - particle.timeLifeFramesRemaining) / (SuperEmitter.TimeLifeFramesRemainingMax * 0.1));
      } else if (particle.timeLifeFramesRemaining < SuperEmitter.TimeLifeFramesRemainingMax * 0.1) {
        particle.alpha = particle.timeLifeFramesRemaining / (SuperEmitter.TimeLifeFramesRemainingMax * 0.1);
      } else {
        particle.alpha = 1;
      }

      if (particle.timeLifeFramesRemaining <= 0) {
        this.resetParticle(particle);
      }
    });
  }

  getRandomValueBetween(x: number, y: number): number {
    return Math.random() * (y - x) + x;
  }

  //Super cool https://stackoverflow.com/questions/66123016/interpolate-between-two-colours-based-on-a-percentage-value
  private interpolateColor(startColor: number, endColor: number, factor: number): number {
    const startR = (startColor >> 16) & 0xFF;
    const startG = (startColor >> 8) & 0xFF;
    const startB = startColor & 0xFF;

    const endR = (endColor >> 16) & 0xFF;
    const endG = (endColor >> 8) & 0xFF;
    const endB = endColor & 0xFF;

    const r = Math.round(startR + (endR - startR) * factor);
    const g = Math.round(startG + (endG - startG) * factor);
    const b = Math.round(startB + (endB - startB) * factor);

    return ((r << 16) + (g << 8) + b) & 0xFFFFFF;
  }

  private resetParticle(particle: Particle) {
    particle.width = 150;
    particle.height = 250;
    particle.alpha = 0;
    particle.rotation = 0;
    particle.x = -this.screenWidth / 2 + this.getRandomValueBetween(-20, 20);
    particle.y = -this.screenHeight / 2 + this.getRandomValueBetween(-20, 20) - 100;
    particle.deltaRotation = this.getRandomValueBetween(-0.001, 0.001);
    particle.deltaAlpha = this.getRandomValueBetween(-0.001, -0.2);
    particle.deltaX = this.getRandomValueBetween(-0.5, 0.5);
    particle.deltaScale = this.getRandomValueBetween(- 0.00001, -0.0001);
    particle.deltaY = this.getRandomValueBetween(-2, -1);
    particle.timeLifeFramesRemaining = this.getRandomValueBetween(30, 60);
    particle.startTint = 0xFFFFFF;
  }
}
