// Vendors
import gsap from "gsap";
import {Howl} from 'howler';

// Services
import { DetectKill, CreateElement } from 'shared/services';
// Components
import { Bullet } from 'components';

export class FireLoop extends Bullet {
    private app: PIXI.Application;
    private bullets: PIXI.Sprite[] = [];
    private screen: PIXI.Container;
    private player: PIXI.Sprite;
    private container: PIXI.Container;
    private currentBullet: number = 0;
    private scene: HTMLElement;

    constructor(

    ) {
        super();
    }

    public init(): void {
        this.screen.removeChild(this.container);
        this.container = CreateElement.createContainer(window.innerWidth, window.innerHeight);
        this.container.name = 'bullets_container';
        this.screen.addChild(this.container);
    }

    public fireBullet = (e): void => {
        const playerContainer = this.screen.getChildByName('player_container') as PIXI.Container;
        const player = playerContainer.getChildByName('player') as PIXI.Sprite;
        this.player = player;
        if (this.canFire) {
            const sound = new Howl({
                src: [this.app.loader.resources.shot_sound.url]
            });
            sound.play();
            const bullet = CreateElement.createBullet(this.player.x, this.player.y, this.app);
            bullet.name = `bullet${this.currentBullet}`;
            this.currentBullet += 1;
            this.container.addChild(bullet);
            this.bullets.push(bullet);
            this.canFire = false;
            gsap.to(bullet, {x: this.player.x, y: 0, duration: 1, ease: "none",
                onComplete: () => {
                    this.container.removeChild(bullet);
                    for (let i = 0; i < this.bullets.length; i++) {
                        if (this.bullets[i].name === bullet.name) {
                            this.bullets.splice(i, 1);
                        }
                    }
                }});
            setTimeout(() => {
                this.canFire = true;
            }, 300)
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

    public getBullets(): PIXI.Sprite[] {
        return this.bullets;
    }

}