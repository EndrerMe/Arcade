// Vendors
import * as PIXI from 'pixi.js';
import { Subject } from 'rxjs';

export class LoaderService {
    constructor(
        public app: PIXI.Application,
    ) {}

    public loadGameAssets(): void {
        this.app.loader
            .add('mainBg', 'img/bg/bg5.jpg')
            .add('enemy', 'img/enemy.png')
            .add('enemy2', 'img/enemy2.png')
            .add('bullet', 'img/bullet.png')
            .add('player', 'img/player.png')
            .add('shot_sound', 'sound/shot.mp3')
            .add('explosion_sound', 'sound/explosion.mp3')
            .add('hit_sound', 'sound/hit.mp3');

        this.loadAnimations();
    }

    public async loadAssets(): Promise<object> {
        return new Promise((resolve, reject) => {
            this.app.loader.load(() => {
                resolve();
            });
        });
    }

    public loadMenuAssets(): void {
        this.app.loader.baseUrl = 'assets';
        this.app.loader
            .add('background_music', 'sound/background.ogg')
    }

    private loadAnimations(): void {
        this.app.loader
            .add('explosion', 'animations/explosion/spritesheet.json');
    }
}