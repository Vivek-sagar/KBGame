import Phaser from 'phaser'
import { getCoord, getCellIndexFromCoord, getScreenCoordFromCoord, getLetterFromCoord } from './Utils/getCoord'


declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            cell(x: number, y: number, texture: string, frame?: string | number): Cell
        }
    }
}

export default class Cell extends Phaser.Physics.Arcade.Sprite
{
    private letter!: Phaser.Physics.Arcade.Sprite;
    private posi = -1
    private posj = -1
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | string)
    {
        super(scene, x, y, texture, frame)
        this.anims.play('cell-idle')
    }

    public setCoords(scene: Phaser.Scene, i: number, j: number) {
        var index = getLetterFromCoord([i, j])
        this.posi = i
        this.posj = j
        this.letter = scene.physics.add.sprite(getScreenCoordFromCoord(i, j)[0], getScreenCoordFromCoord(i, j)[1], 'key' + (index.charCodeAt(0) - 65).toString())
        this.letter.setScale(0.4)
        this.cellDeselected()
    }

    public keyDown() {
        this.letter.setTint(0x999933)
    }

    public keyUp() {
        this.letter.setTint(0xffffff)
    }

    public cellSelected() {
        if (this.posi == 1 && (this.posj == 3 || this.posj == 6)) {
            this.anims.play('cell-bump-selected')
        }
        else {
            this.anims.play('cell-selected')
        }
    }

    public cellDeselected() {
        if (this.posi == 1 && (this.posj == 3 || this.posj == 6)) {
            this.anims.play('cell-bump-idle')
        }
        else {
            this.anims.play('cell-idle')
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('cell', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
    var sprite = new Cell(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    return sprite
})