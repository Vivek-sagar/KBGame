import Phaser from 'phaser'
import { getCoord, getCellIndexFromCoord, getScreenCoordFromCoord } from './Utils/getCoord'

declare global
{
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            gem(x: number, y: number, texture: string, frame?: string | number): Gem
        }
    }
}

export default class Gem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this.anims.play('gem')
        this.setScale(0.5)
    }
}
Phaser.GameObjects.GameObjectFactory.register('gem', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number){
    var sprite = new Gem(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    return sprite
})