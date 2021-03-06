import Phaser from 'phaser'
import { getCoord, getCellIndexFromCoord, getScreenCoordFromCoord, getLetterFromCoord } from './Utils/getCoord'

export default class Unit extends Phaser.Physics.Arcade.Sprite
{
    private spawnEvent : Phaser.Time.TimerEvent
    private attackEvent !: Phaser.Time.TimerEvent
    public posi = 0
    public posj = 0
    public pxToTime = 24
    private speed = 20
    private projectile!: Phaser.Physics.Arcade.Sprite
    private gameScene: Phaser.Scene
    private particles
    private emitter
    private moveEvent
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame ?: string | number) {
        super(scene, x, y, texture, frame)
        
        this.anims.play('unit-idle')
        this.gameScene = scene

        this.spawnEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.startAttack()
            }
        })
        this.setScale(0.5)
        this.particles = this.gameScene.add.particles('red')
        this.projectile = this.gameScene.physics.add.sprite(0, 0, 'key0')

    }

    public setCoords(i: number, j: number) {
        this.posi = i
        this.posj = j
        this.setDepth(i)
    }

    startAttack() {
        this.anims.play('unit-run')
        // console.log("Start attack!")
        this.attackEvent = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.attack()
            },
            loop:true
        })
    }

    attack() {
        var screenCoord = getScreenCoordFromCoord(this.posi, this.posj)
        var baseScreenCoord = getScreenCoordFromCoord(1, -1)
        var delta = new Phaser.Math.Vector2(baseScreenCoord[0]-screenCoord[0], baseScreenCoord[1]-screenCoord[1])
        var deltaLength = delta.length()
        var dir = delta.normalize().scale(40)
        this.projectile.setX(screenCoord[0]);
        this.projectile.setY(screenCoord[1]);
        this.projectile.setVisible(true);
        this.projectile.setVelocity(dir.x * this.speed, dir.y * this.speed)
        this.emitter = this.particles.createEmitter({
            speed: 10,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        })
        this.emitter.start()
        this.emitter.startFollow(this.projectile)
        this.moveEvent = this.scene.time.addEvent({
            delay: deltaLength * this.pxToTime / this.speed,
            callback: () => {
                this.projectile.setVelocity(0, 0)
                this.projectile.setX(baseScreenCoord[0])
                this.projectile.setY(baseScreenCoord[1])
                this.emitter.stop()
                this.projectile.setVisible(false);
            }
        })
        
    }

    destroy(fromScene?: boolean)
    {
        console.log("Destroy")
        this.moveEvent?.destroy()
        this.attackEvent?.destroy()
        this.spawnEvent?.destroy()
        super.destroy(fromScene)
    }
}