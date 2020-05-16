import Phaser from 'phaser'

export default class Cell extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | string)
    {
        super(scene, x, y, texture, frame)
        this.anims.play('cell-idle')
    }
}