import Phaser, { Tilemaps } from 'phaser'

import { createCellAnims } from '../Anims/CellAnims'
import { createUnitAnims } from '../Anims/UnitAnims'
import { getCoord } from '../Utils/getCoord'

import Unit from '../Unit'

export default class Game extends Phaser.Scene
{
    private gridCoords: [number, number][];
    private cellSprites: Phaser.Physics.Arcade.Sprite[];
    private unitSprites: Phaser.Physics.Arcade.Sprite[];
    private gameState;      // 0 - Selection Mode; 1 - Direction Mode
    private selectedCell;
	constructor()
	{
        super('game')
        this.gridCoords = []
        this.cellSprites = []
        this.unitSprites = []

        this.gameState = 0;
        this.selectedCell = [-1,-1]
	}

	preload()
    {
        
    }

    makeMap() {
        for (let cell of this.gridCoords) {
            this.add.image(cell[0], cell[1], 'ground_grass1')
        }
    }

    create()
    {
        createCellAnims(this.anims)
        createUnitAnims(this.anims)
        this.makeMap()
        this.input.keyboard.on('keydown', this.anyKey, this);
        
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 8; i++) {
                this.gridCoords.push([100 - (15 * j) + 38 * i, 100 + 28 * j])
                var sprite = this.physics.add.sprite(100 + (15 * j) + 38 * i, 100 + 28 * j, 'ground_cell', 'grass1.png');
                this.cellSprites.push(sprite)
            }
        }

        for (var cell of this.cellSprites)
        {
            cell.anims.play('cell-idle')
        }

        var unit = this.physics.add.sprite(200, 100, 'unit', 'walk-side-1.png')
        unit.anims.play('unit-idle')

        const allUnits = this.physics.add.group({
            classType: Unit
        })
    }

    anyKey(event) {
        //  Only allow A-Z and , and .
        let code = event.keyCode;

        if ((code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) ||
            (code == 188 || code == 190))
        {
            console.log(code)
            if (this.gameState == 0) {
                var coord = getCoord(code)
                console.log(this.getCellIndexFromCoord(coord))
                this.cellSprites[this.getCellIndexFromCoord(coord)].anims.play('cell-selected')
                this.gameState = 1
                this.selectedCell = coord
            }
            else if (this.gameState == 1) {
                this.cellSprites[this.getCellIndexFromCoord(this.selectedCell)].anims.play('cell-idle')
                this.gameState = 0
                this.selectedCell = [-1,-1]
            }
        }
    }

    getCellIndexFromCoord(coord: number[])
    {
        return coord[0]*8+coord[1]
    }

    update(t: number, dt:number)
    {

    }

    
}
