// Vendors
import gsap from "gsap";
// Services
import { DetectKill, CreateElement, ResultPopupsMurkup, ChangeComplexityLevel } from 'shared/services';

// Components
import { Enemy } from 'components';

export class EnemyLoop extends Enemy {
    private app: PIXI.Application;
    private screen: PIXI.Container;
    private scene: HTMLElement;
    private enemies: PIXI.Sprite[] = [];
    private container: PIXI.Container;
    private quantity: number = 30;
    private quantityInMove: number = 3;
    private spawnRate: number = 5000;

    constructor(
    ) {
        super();
    }

    public init(): void {
        this.container = CreateElement.createContainer(this.width, this.height);
        this.container.name = 'enemy_container'
        this.screen.addChild(this.container);
        this.enemies = CreateElement.createEnemies(
            this.scene, 
            this.width, 
            this.height, 
            this.container,
            this.app,
            this.quantity,
            this.health
            );
        this.changeComplexityLevel();
        this.app.ticker.add(this.gameLoop);
        this.addQuantityMove();
    }

    private changeComplexityLevel(): void {
        ChangeComplexityLevel.newComplexityLevel.subscribe((res) => {
            switch(res) {
                case 1:
                    this.speedY = 1;
                    this.spawnRate = this.spawnRate * 1;
                    this.quantity = 30;
                    break;
                case 2: 
                    this.speedY = 1.35;
                    this.spawnRate = this.spawnRate * 0.85;
                    this.quantity = 45;
                    break;
                case 3:
                    this.speedY = 1.7;
                    this.spawnRate = this.spawnRate * 0.7;
                    this.quantity = 50;
                    break;
            }
        })
    }

    private addQuantityMove(): void {
        const interval = setInterval(() => {

            if (this.quantityInMove < this.enemies.length) {
                this.quantityInMove += 1;
            }

            this.spawnRate = Math.random() * (50000 - 10000) + 10000;
        }, this.spawnRate);

        if (this.quantityInMove === this.enemies.length) {
            clearInterval(interval);
        }
    }

    public tryAgain(): void {
        this.quantityInMove = 3;
        this.app.ticker.remove(this.gameLoop);
        for (let i = 0; i < this.enemies.length; i++) {
            this.container.removeChild(this.enemies[i])
        }
        this.enemies = CreateElement.createEnemies(
            this.scene, 
            this.width, 
            this.height, 
            this.container,
            this.app,
            this.quantity,
            this.health
            );
        this.app.ticker.add(this.gameLoop);
    }

    public gameLoop = (): void => {
        if (this.enemies.length === 0) {
            ResultPopupsMurkup.toggleWinPopup(true);
            this.app.ticker.remove(this.gameLoop);
            return;
        }
        this.checkPosition();
        this.move();
    }

    private checkPosition(): void {
        const width = this.scene.offsetWidth;
        const height = this.scene.offsetHeight;

        if (this.enemies[0].y >= height / 1.4) {
            ResultPopupsMurkup.toggleLoosePopup(true)
            // const popup = document.getElementById('loose_popup');
            // popup.style.display = 'flex';
            // gsap.to('#window_loose', {x: 0, y: -this.scene.offsetHeight / 2, duration: 1, ease: "none"})
            this.app.ticker.remove(this.gameLoop);
        }
    }

    private move(): void {
        for (let i = 0; i < (
                this.quantityInMove < this.enemies.length ? this.quantityInMove :
                this.enemies.length
            ); i++) {
            this.enemies[i].visible = true;
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