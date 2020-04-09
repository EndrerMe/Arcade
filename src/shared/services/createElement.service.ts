// Components
import { Enemy, Bullet, Player } from "components";
import { Main } from "screens";

export class CreateElement {

    public static createEnemies(scene: HTMLElement, 
        width: number, height: number,
        enemyContainer: PIXI.Container, quantity: number,
        health: number, complexityLevel: number): Enemy[] {

        const enemies: Enemy[] = [];
        for (let i = 0; i < quantity; i++) {
            const isSpawnHardEnemy = Math.floor(Math.random() * (10 - 1) + 1);
            let enemy;
            if (isSpawnHardEnemy > complexityLevel * 2) {
                enemy = Enemy.from(Main.instance.resourses.enemy.texture);
                enemy.health = health;
                enemy.width = width;
                enemy.height = height;
            } else {
                enemy = Enemy.from(Main.instance.resourses.enemy2.texture);
                enemy.health = health + 1;
                enemy.width = width + 20;
                enemy.height = height + 20;
            }   
            enemy.name = `enemy${i}`;
            const saveZone = (scene.offsetWidth * 0.20);
            enemy.x = Math.random() * ((scene.offsetWidth - 55 - saveZone) - (55 + saveZone)) + (55 + saveZone);
            enemy.y = -40;
            enemy.visible = false;
            enemyContainer.addChild(enemy);
            enemies.push(enemy)
        }
        return enemies;
    }

    public static createPlayer(width: number, height: number, app: PIXI.Application): Player {
        const player = Player.from(app.loader.resources.player.texture);
        
        player.anchor.set(0.5);
        player.x = width / 2;
        player.y = height / 1.2;
        player.width = 38;
        player.height = 38;

        return player as Player;
    }

    public static createBullet(x: number, y: number, app: PIXI.Application): Bullet {
        const bullet = Bullet.from(app.loader.resources.bullet.texture);
        bullet.anchor.set(0.5);
        bullet.x = x;
        bullet.y = y;

        return bullet as Bullet
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