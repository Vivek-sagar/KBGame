import Phaser from 'phaser'
import { getCoord, getCellIndexFromCoord, getScreenCoordFromCoord } from './Utils/getCoord'

declare global
{
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            warrior(x: number, y: number, texture: string, frame?: string | number): Warrior
        }
    }
}

export default class Warrior extends Phaser.Physics.Arcade.Sprite {

    public posi = 0
    public posj = 0
    public dir = new Phaser.Math.Vector2(0, 0)
    public pxToTime = 24
    public speed = 1
    public moving = false
    public targetCoord: number[]
    private moveEvent ?: Phaser.Time.TimerEvent
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this.anims.play('unit-idle')
        this.setTint(0x0000ff)
        this.targetCoord = [-1, -1]
        this.setPosition(getScreenCoordFromCoord(this.posi, this.posj)[0], getScreenCoordFromCoord(this.posi, this.posj)[1] - 25)
    }

    destroy(fromScene?: boolean)
    {
        this.moveEvent?.destroy()
        super.destroy(fromScene)
    }

    public getCoords()
    {
        return [this.posi,this.posj]
    }

    public isMoving() {
        return this.moving
    }

    public moveTo(coord: number[]) {
        this.targetCoord = coord
        var targetScreenCoord = getScreenCoordFromCoord(coord[0], coord[1])
        var currentCoord = getScreenCoordFromCoord(this.posi, this.posj)
        var delta = new Phaser.Math.Vector2(targetScreenCoord[0] - currentCoord[0], targetScreenCoord[1] - currentCoord[1])
        var deltaLength = delta.length()
        this.dir = delta.normalize().scale(40)
        this.setVelocity(this.dir.x * this.speed, this.dir.y * this.speed)
        this.moving = true
        this.moveEvent = this.scene.time.addEvent({
            delay: deltaLength * this.pxToTime / this.speed,
            callback: () => {
                this.setVelocity(0, 0)
                this.posi = this.targetCoord[0]
                this.posj = this.targetCoord[1]
                this.setPosition(getScreenCoordFromCoord(this.posi, this.posj)[0],
                    getScreenCoordFromCoord(this.posi, this.posj)[1]-25)
                this.targetCoord = [-1, -1]
                this.moving = false
            }
        })
    }
}

Phaser.GameObjects.GameObjectFactory.register('warrior', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number){
    var sprite = new Warrior(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    return sprite
})