export class CreateElement {

    public static createEnemies(scene: HTMLElement, 
        width: number, height: number,
        enemyContainer: PIXI.Container,
        app: PIXI.Application, quantity: number,
        health: number): PIXI.Sprite[] {

        const enemies: PIXI.Sprite[] = [];

        for (let i = 0; i < quantity; i++) {
            const enemy = PIXI.Sprite.from(app.loader.resources.enemy.texture);
            enemy.name = `enemy${i}`;
            enemy.x = Math.random() * ((scene.offsetWidth - 55) - 55) + 55;
            enemy.y = -40;
            enemy.width = width;
            enemy.height = height;
            enemy.visible = false;
            enemyContainer.addChild(enemy);
            enemies.push(enemy)
        }
        return enemies;
    }

    public static createPlayer(width: number, height: number, app: PIXI.Application): PIXI.Sprite {
        const player = PIXI.Sprite.from(app.loader.resources.player.texture);
        
        player.anchor.set(0.5);
        player.x = width / 2;
        player.y = height / 1.2;
        player.width = 38;
        player.height = 38;

        return player;
    }

    public static createBullet(x: number, y: number, app: PIXI.Application) {
        const bullet = PIXI.Sprite.from(app.loader.resources.bullet.texture);
        bullet.anchor.set(0.5);
        bullet.x = x;
        bullet.y = y;
        bullet.name 
        return bullet
    }
    
    public static createContainer(width: number, height: number): PIXI.Container {
        const container = new PIXI.Container();

        const containerSetting = new PIXI.Graphics();
        containerSetting.alpha = 0;
        containerSetting.beginFill();
        containerSetting.drawRect(0, 0, width, height);
        container.addChild(containerSetting);

        return container;
    }
}