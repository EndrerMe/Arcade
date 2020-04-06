// Vendors
import * as PIXI from 'pixi.js';
import gsap from "gsap";
import {Howl} from 'howler';

export class DetectKill {
    private enemiesArray: PIXI.Sprite[] = [];
    private bulletsArray: PIXI.Sprite[] = [];
    private enemyContainer: PIXI.Container;
    private bulletsContainer: PIXI.Container;
    private app: PIXI.Application;
    private screen: PIXI.Container;
    private sound: Howl;

    constructor(
    ) {}

    public init(enemies: PIXI.Sprite[], bullets: PIXI.Sprite[]): void {
        this.enemiesArray = enemies;
        this.bulletsArray = bullets;
        this.app.ticker.add(this.detectLoop);
        this.enemyContainer = this.screen.getChildByName('enemy_container') as PIXI.Container;
        this.bulletsContainer = this.screen.getChildByName('bullets_container') as PIXI.Container;
        this.initSound();
    }

    private detectLoop = (): void => {
        if (this.enemiesArray) {
            for (let i = 0; i < this.enemiesArray.length; i++) {
                for (let j = 0; j < this.bulletsArray.length; j++) {
                    if (this.enemiesArray[i].x <= this.bulletsArray[j].x &&
                        this.enemiesArray[i].x + 55 >= this.bulletsArray[j].x &&
                        this.enemiesArray[i].y - (55 / 2) <= this.bulletsArray[j].y &&
                        this.enemiesArray[i].y + (55 / 2) >= this.bulletsArray[j].y) {
                            this.bulletsContainer.removeChild(this.bulletsArray[j])
                            this.enemyContainer.removeChild(this.enemiesArray[i])
                            this.bulletsArray.splice(j, 1);
                            this.enemiesArray.splice(i, 1);
                            this.sound.play();
                        }
                }
            }
        }
    }

    private initSound(): void {
        this.sound = new Howl({
            src: [this.app.loader.resources.explosion_sound.url]
        });
    }

    public setApp(app: PIXI.Application): void {
        this.app = app;
    }

    public setScreen(screen: PIXI.Container): void {
        this.screen = screen;
    }
}