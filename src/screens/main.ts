// Vendors
import {Howl} from 'howler'

// Screens
import { Menu, Game, Settings } from 'screens';
// Services
import { LoaderService, HtmlLoader } from 'shared/services';

export class Main {
    private app: PIXI.Application;
    private scene: HTMLElement;
    private menu: Menu;
    private game: Game;
    private settings: Settings;
    private loaderService: LoaderService;
    private backgroundMusic: Howl;

    constructor(
        app: PIXI.Application,
        scene: HTMLElement
    ) {
        this.app = app;
        this.scene = scene;
    }

    public init(): void {
        this.loaderService = new LoaderService(this.app);
        this.menu = new Menu(this.app, this.scene);
        this.game = new Game(this.app, this.scene);
        this.settings = new Settings(this.app, this.scene);
        this.loaderService.loadMenuAssets();
        HtmlLoader.toggleLoader(true);
        this.loaderService.loadAssets().then((res) => {
            HtmlLoader.toggleLoader(false);
            this.initMusic();
            this.initMenu();
        });

        this.settings.isGameStart.subscribe((res) => {
            if (res) {
                this.backgroundMusic.stop();
                this.initGame();
            }
        })

        this.menu.isSettingsOn.subscribe((res) => {
            if (res) {
                this.initSettings();
            }
        })
    }

    private initMenu(): void {
        this.menu.init();
    }

    private initGame(): void {
        this.game.init();
    }

    private initSettings(): void {
        this.settings.init();
    }

    private initMusic(): void {
        this.backgroundMusic = new Howl({
            src: [this.app.loader.resources.background_music.url],
            volume: 0.4,
            loop: true,
        });

        // this.backgroundMusic.play();
    }
}