// Components
import { Player } from "components";
import { CreateElement, GamePause } from 'shared/services';

export class PlayerLoop extends Player {
    private isKeyPress: boolean = false;
    private winWidth;
    private winHeight;
    private keys: boolean[] = [];
    private app: PIXI.Application;
    private screen: PIXI.Container;
    private container: PIXI.Container;
    private isGamePause: boolean;
    public player: Player;

    constructor(

    ) {
        super();
    }

    public init(): void {
        this.screen.removeChild(this.container)
        console.log(this.winHeight)
        this.container = CreateElement.createContainer(this.app.stage.width, this.app.stage.height);
        this.container.name = 'player_container';
        this.screen.addChild(this.container)
        this.player = CreateElement.createPlayer(this.container);
        this.player.name = 'player'
        this.container.addChild(this.player);
        this.watchGamePause();
        window.addEventListener('keydown', this.keysDown);
        window.addEventListener('keyup', this.keysUp);
    }

    private watchGamePause(): void {
        GamePause.isGamePause.subscribe((res: boolean) => {
            this.isGamePause = res;
        })
    }

    private keysUp = (e): void => {
        this.keys[e.keyCode] = false;
        this.app.ticker.remove(this.gameLoop);
        this.isKeyPress = false;
    }

    private keysDown = (e): void => {
        if (this.isGamePause) {
            return;
        }

        this.keys[e.keyCode] = true;
        if (!this.isKeyPress) {
            this.app.ticker.add(this.gameLoop);
            this.isKeyPress = true;
        }
    }

    private gameLoop = (): void => {
        // W
        // if (this.keys[87]) {
        //     this.player.y -= this.speed;
        // }
        // A
        if (this.keys[65]) {
            this.player.x -= this.speed;
        }
        // S
        // if (this.keys[83]) {
        //     this.player.y += this.speed;
        // }
        // D
        if (this.keys[68]) {
            this.player.x += this.speed;
        }
        // Shift
        if (this.keys[16]) {
            this.speed = 8;
        } else {
            this.speed = 4;
        }

    }

    public setApp(app: PIXI.Application): void {
        this.app = app;
    }

    public setScreen(screen: PIXI.Container): void {
        this.screen = screen;
    }
}