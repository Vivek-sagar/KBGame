import Phaser from 'phaser'

export default class Unit extends Phaser.Physics.Arcade.Sprite
{
    private spawnEvent : Phaser.Time.TimerEvent
    private attackEvent !: Phaser.Time.TimerEvent
    public posi = 0
    public posj = 0
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame ?: string | number) {
        super(scene, x, y, texture, frame)
        
        this.anims.play('unit-idle')
        this.setTint(0xff0000);

        this.spawnEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.startAttack()
            }
        })
    }

    public setCoords(i: number, j: number) {
        this.posi = i
        this.posj = j
    }

    startAttack() {
        this.anims.play('unit-run')
        // console.log("Start attack!")
        this.attackEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.attack()
            },
            loop:true
        })
    }

    attack() {
        // console.log('Attack')
    }
}