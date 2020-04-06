// Vendors
import * as PIXI from 'pixi.js';

import { DetectKill, EnemyLoop, FireLoop, PlayerLoop } from 'shared/services'

export class Main {
    private enemyLoop: EnemyLoop;
    private fireLoop: FireLoop;
    private playerLoop: PlayerLoop;
    private detectKill: DetectKill;
    private enemies: PIXI.Sprite[];
    private bullets: PIXI.Sprite[];

    constructor(
        private app: PIXI.Application,
        private screen: PIXI.Container,
        private scene: HTMLElement
    ) {}

    public init(): void {
        const mainScreen = new PIXI.Graphics();
        mainScreen.beginFill();
        mainScreen.drawRect(0, 0, this.app.view.width, this.app.view.height);
        
        this.screen.addChild(mainScreen);

        this.screenSetup();
    }

    private screenSetup(): void {
        this.loadBackground();
        this.initComponents();
        this.setCompoentData();
        this.enemyLoop.init();
        this.playerLoop.init();
        this.fireLoop.init();
        this.scene.addEventListener('pointerdown', this.fireLoop.fireBullet);
        this.getComponentData();
        this.detectKill.init(this.enemies, this.bullets);
    }

    private getComponentData(): void {
        this.enemies = this.enemyLoop.getEnemies();
        this.bullets = this.fireLoop.getBullets();
    }

    private setCompoentData(): void {
        this.enemyLoop.setApp(this.app);
        this.enemyLoop.setScene(this.scene);
        this.enemyLoop.setScreen(this.screen);

        this.fireLoop.setApp(this.app);
        this.fireLoop.setScreen(this.screen);
        this.fireLoop.setScene(this.scene);

        this.playerLoop.setScreen(this.screen);
        this.playerLoop.setApp(this.app);

        this.detectKill.setApp(this.app);
        this.detectKill.setScreen(this.screen);
    }

    private loadBackground(): void {
        const bg = PIXI.Sprite.from(this.app.loader.resources.mainBg.texture);
        this.screen.addChild(bg);
    }

    private initComponents() : void {
        this.detectKill = new DetectKill();
        this.playerLoop = new PlayerLoop();
        this.fireLoop = new FireLoop();
        this.enemyLoop = new EnemyLoop();
    }

}