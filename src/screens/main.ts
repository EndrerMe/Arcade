// Vendors
import {Howl} from 'howler'

// Screens
import { Menu, Game, Settings } from 'screens';
// Services
import { LoaderService, HtmlLoader, Resize } from 'shared/services';

export class Main {

    private static _instance: Main = null;
    
    static get instance(): Main{
        if(Main._instance === null){
            Main._instance = new Main();
        }
        return Main._instance;
    }

    public app: PIXI.Application;
    public scene: HTMLElement;
    public menu: Menu;
    public game: Game;
    public settings: Settings;
    private loaderService: LoaderService;
    private backgroundMusic: Howl;

    public get resourses() {
        return this.app.loader.resources;
    }

    private constructor(
    ) {
    }

    public initApp = (): void => {
        this.scene = document.getElementById('gameScene');
        this.app = new PIXI.Application({
            width: 1280,
            height: 720,
        })
        this.app.stage.interactive = true;

        this.scene.appendChild(this.app.view);
        Resize.resizeScene(this.app)
        this.init();
        window.addEventListener('resize', () => {
            Resize.resizeScene(this.app)
        })
    }

    private init(): void {
        this.loaderService = new LoaderService(this.app);
        this.menu = new Menu(this.app, this.scene);
        this.game = new Game(this.app, this.scene);
        this.settings = new Settings(this.app, this.scene);
        HtmlLoader.toggleLoader(true);
        this.loaderService.loadMenuAssets().then((res) => {
            if (res) {
                HtmlLoader.toggleLoader(false);
                this.initMusic();
                this.initMenu();
            }
        });

        this.settings.isGameStart.subscribe((res) => {
            if (res) {
                this.loaderService.loadGameAssets().then((res) => {
                    if (res) {
                        this.backgroundMusic.stop();
                        this.initGame();
                        HtmlLoader.toggleLoader(false);
                    }
                })
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

        this.backgroundMusic.play();
    }
}