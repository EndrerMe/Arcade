// Vendors
import * as PIXI from 'pixi.js';

// Services
import { DetectKill, CreateElement } from 'shared/services';

// Components
import { Enemy } from 'components';

export class EnemyLoop extends Enemy {
    private createElement: CreateElement;
    private app: PIXI.Application;
    private screen: PIXI.Container;
    private scene: HTMLElement;
    private enemies: PIXI.Sprite[] = [];
    private whichWay: string = 'left';
    private container: PIXI.Container;

    constructor(
    ) {
        super();
    }

    public init(): void {
        this.createElement = new CreateElement()
        this.container = this.createElement.createContainer(this.width, this.height);
        this.container.name = 'enemy_container'
        this.screen.addChild(this.container);
        this.enemies = this.createElement.createEnemies(
            this.scene, 
            this.width, 
            this.height, 
            this.container,
            this.app
            );
        this.app.ticker.add(this.gameLoop);
    }

    public gameLoop = (): void => {
        if (this.enemies.length === 0) {
            this.app.ticker.remove(this.gameLoop);
            return;
        }
        this.checkPosition();
        this.move();
    }

    private checkPosition(): void {
        const width = this.scene.offsetWidth;
        const height = this.scene.offsetHeight;
        
        if (this.enemies[this.enemies.length - 1].x <= 5) {
            this.whichWay = 'right';
        } 

        if (this.enemies[0].x >= width - 55) {
            this.whichWay = 'left';
        }

        if (this.enemies[0].y >= height / 1.4) {
            this.speedY = 0;
            this.speedX = 0;
        }
    }

    private move(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.whichWay === 'right') {
                this.enemies[i].x += this.speedX;
            }
            
            if (this.whichWay === 'left') {
                this.enemies[i].x -= this.speedX;
            }
    
            this.enemies[i].y += this.speedY;
        }
    }

    
    public setApp(app: PIXI.Application): void {
        this.app = app;
    }

    public setScreen(screen: PIXI.Container): void {
        this.screen = screen;
    }

    public setScene(scene: HTMLElement): void {
        this.scene = scene;
    }

    public getEnemies(): PIXI.Sprite[] {
        return this.enemies;
    }
}