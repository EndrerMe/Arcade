// Vendors
import gsap from "gsap";
import {Howl} from 'howler';

// Services
import { Score } from 'shared/services';
// Components
import { Enemy } from "components";

export class DetectKill {
    private enemiesArray: Enemy[] = [];
    private bulletsArray: PIXI.Sprite[] = [];
    private enemyContainer: PIXI.Container;
    private bulletsContainer: PIXI.Container;
    private app: PIXI.Application;
    private screen: PIXI.Container;
    private score: PIXI.Text;
    private explosionSound: Howl;
    private hitSound: Howl;
    private explosionAnim: PIXI.AnimatedSprite;
    private explosionSheet: PIXI.Spritesheet;

    constructor(
    ) {}

    public init(enemies: Enemy[], bullets: PIXI.Sprite[]): void {
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
                    const enemyData = {
                        x: this.enemiesArray[i].x,
                        y: this.enemiesArray[i].y,
                        width: this.enemiesArray[i].width,
                        height: this.enemiesArray[i].height
                    };
                    const bulletData = {
                        x: this.bulletsArray[j].x,
                        y: this.bulletsArray[j].y,
                    }

                    if (enemyData.x <= bulletData.x &&
                        enemyData.x + enemyData.width >= bulletData.x &&
                        enemyData.y - (enemyData.height / 2) <= bulletData.y &&
                        enemyData.y + (enemyData.height / 2) >= bulletData.y ) {

                            this.bulletsContainer.removeChild(this.bulletsArray[j]);
                            this.bulletsArray.splice(j, 1);
                            this.enemiesArray[i].health -= 1;
                            if (this.enemiesArray[i].health > 0) {
                                this.hitSound.play();
                            } else {
                                this.killEnemy(this.enemiesArray[i], i);
                            }
                        }
                }
            }
        }
    }

    private killEnemy(enemy: Enemy, i: number): void {
        this.enemyContainer.removeChild(enemy)
        this.playExplosion(0, enemy.x, enemy.y);
        this.enemiesArray.splice(i, 1);
        this.explosionSound.play();
        Score.calcScore(this.score);
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
        this.explosionSound = new Howl({
            src: [this.app.loader.resources.explosion_sound.url]
        });
        this.hitSound = new Howl({
            src: [this.app.loader.resources.hit_sound.url]
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