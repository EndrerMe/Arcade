// Vendors
import gsap from "gsap";
import {Howl} from 'howler';

// Services
import { Score } from 'shared/services';

export class DetectKill {
    private enemiesArray: PIXI.Sprite[] = [];
    private bulletsArray: PIXI.Sprite[] = [];
    private enemyContainer: PIXI.Container;
    private bulletsContainer: PIXI.Container;
    private app: PIXI.Application;
    private screen: PIXI.Container;
    private score: PIXI.Text;
    private sound: Howl;
    private explosionAnim: PIXI.AnimatedSprite;
    private explosionSheet: PIXI.Spritesheet;

    constructor(
    ) {}

    public init(enemies: PIXI.Sprite[], bullets: PIXI.Sprite[]): void {
        this.enemiesArray = enemies;
        this.bulletsArray = bullets;
        this.app.ticker.add(this.detectLoop);
        this.enemyContainer = this.screen.getChildByName('enemy_container') as PIXI.Container;
        this.bulletsContainer = this.screen.getChildByName('bullets_container') as PIXI.Container;
        this.initSound();
        this.initExplosion();
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
                            this.playExplosion(0, this.enemiesArray[i].x, this.enemiesArray[i].y);
                            this.bulletsArray.splice(j, 1);
                            this.enemiesArray.splice(i, 1);
                            this.sound.play();
                            Score.calcScore(this.score);
                        }
                }
            }
        }
    }

    private playExplosion(frame: number, x: number, y: number): void {
        this.explosionAnim.x = x;
        this.explosionAnim.y = y;
        this.explosionAnim.gotoAndPlay(frame);
    }

    private initExplosion(): void {
        this.explosionSheet = this.app.loader.resources.explosion.spritesheet;
        this.explosionAnim = new PIXI.AnimatedSprite(this.explosionSheet.animations["ex21"]);
        this.explosionAnim.width = 55;
        this.explosionAnim.height = 55;
        this.explosionAnim.loop = false;
        this.enemyContainer.addChild(this.explosionAnim);
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

    public setScore(scoreContainer: PIXI.Container): void {
        this.score = scoreContainer.getChildByName('score') as PIXI.Text;
    }
}