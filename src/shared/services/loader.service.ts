// Vendors
import * as PIXI from 'pixi.js';
import { Subject } from 'rxjs';

export class LoaderService {
    public isCompliteMain: Subject<boolean> = new Subject();
    public isCompliteMenu: Subject<boolean> = new Subject();

    constructor(
        public app: PIXI.Application,
    ) {}

    public loadGameAssets(): void {
        this.app.loader
            .add('mainBg', 'img/bg/bg5.jpg')
            .add('enemy', 'img/enemy.png')
            .add('bullet', 'img/bullet.png')
            .add('player', 'img/player.png')
            .add('shot_sound', 'sound/shot.mp3')
            .add('explosion_sound', 'sound/explosion.mp3');

        this.app.loader.onComplete.add(this.onLoadMain);
        this.app.loader.onError.add(this.onLoadError)
        this.app.loader.load();
    }

    public loadMenuAssets(): void {
        this.app.loader.baseUrl = 'assets';
        this.app.loader
            .add('background_music', 'sound/background.ogg')
        this.app.loader.onComplete.add(this.onLoadMenu);
        this.app.loader.onError.add(this.onLoadError)
        this.app.loader.load();
    }

    private onLoadError(e) {
        console.log(`Error ${e.message}`)
    }

    private onLoadMain = (): void => {
        this.isCompliteMain.next(true);
        this.isCompliteMain.next(false);
    }

    private onLoadMenu = (): void => {
        this.isCompliteMenu.next(true);
        this.isCompliteMenu.next(false);
    }
}