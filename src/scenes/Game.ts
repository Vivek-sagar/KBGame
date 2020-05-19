import Phaser, { Tilemaps } from 'phaser'

import { createCellAnims } from '../Anims/CellAnims'
import { createUnitAnims } from '../Anims/UnitAnims'
import { getCoord, getCellIndexFromCoord, getScreenCoordFromCoord, getLetterFromCoord } from '../Utils/getCoord'


import '../Warrior'
import '../Gatherer'
import '../Cell'
import Cell from '../Cell'
import Unit from '../Unit'
import Warrior from '../Warrior'
import Gatherer from '../Gatherer'

enum Characters{
    WARRIOR,
    GATHERER,
    NONE
}

export default class Game extends Phaser.Scene
{
    private gridCoords: [number, number][];
    private cellSprites: Phaser.Physics.Arcade.Sprite[];
    private cells: Cell[];
    private units?: Phaser.Physics.Arcade.Group;
    private warrior?: Warrior;
    private gatherer?: Gatherer;
    private selectedChar: Characters
    private gameState;      // 0 - Selection Mode; 1 - Direction Mode
    private selectedCell;
    private lastUnitSpawnTime = 0
	constructor()
	{
        super('game')
        this.gridCoords = []
        this.cellSprites = []
        this.cells = []

        this.gameState = 0;
        this.selectedCell = [-1, -1]
        this.selectedChar = Characters.NONE

        
	}

    create()
    {
        this.anims.create({
            key: 'twinkle',
            frames: this.anims.generateFrameNames('twinkle', { start: 1, end: 10, prefix: 'Twinkle-', suffix: '.png' }),
            repeat: -1,
            frameRate: 5
        })
        createCellAnims(this.anims)
        createUnitAnims(this.anims)
        this.input.keyboard.on('keydown', this.anyKey, this);
        this.input.keyboard.on('keyup', this.anyKeyUp, this);
        this.physics.add.sprite(1024 / 2, 787 / 2, 'background')
        var twinkles = this.physics.add.sprite(1024 / 2, 787 / 2, 'twinkle')
        
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 8; i++) {
                this.gridCoords.push([getScreenCoordFromCoord(j, i)[0], getScreenCoordFromCoord(j, i)[1]])
                var newCell = this.add.cell(getScreenCoordFromCoord(j, i)[0], getScreenCoordFromCoord(j, i)[1], 'cell')
                newCell.setCoords(this, j, i)
                this.cells.push(newCell)
            }
        }

        this.units = this.physics.add.group({
            classType: Unit
        })
        this.warrior = this.add.warrior(0,0,'unit')
        this.gatherer = this.add.gatherer(0, 0, 'unit')
        
        twinkles.anims.play('twinkle')
    }

    anyKey(event) {
        //  Only allow A-Z and , and .
        let code = event.keyCode;
        if ((code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) ||
            (code == 188 || code == 190))
        {
            var coord = getCoord(code)
            var index = getCellIndexFromCoord(coord)
            var chosenCell = this.cells[index]
            chosenCell.keyDown()
            if (this.gameState == 0) {
                if (this.warrior && !this.warrior.isMoving()) {
                    var warriorCoords = this.warrior.getCoords()
                    if (warriorCoords[0] == coord[0] && warriorCoords[1] == coord[1]) {
                        console.log("Warrior")
                        this.selectedChar = Characters.WARRIOR
                        this.gameState = 1
                        this.selectedCell = coord
                        chosenCell.cellSelected()
                    }
                    
                }
                if (this.gatherer && !this.gatherer.isMoving()) {
                    var gathererCoords = this.gatherer.getCoords()
                    if (gathererCoords[0] == coord[0] && gathererCoords[1] == coord[1] ) {
                        console.log("Gatherer")
                        this.selectedChar = Characters.GATHERER
                        this.gameState = 1
                        this.selectedCell = coord
                        chosenCell.cellSelected()
                    }
                }
                
            }
            else if (this.gameState == 1) {
                this.cells[getCellIndexFromCoord(this.selectedCell)].cellDeselected()
                
                this.gameState = 0
                this.selectedCell = [-1, -1]
                if (this.warrior && !this.warrior.isMoving()) {
                    if (this.selectedChar == Characters.WARRIOR) {
                        this.warrior.moveTo(coord)
                        
                    }
                }
                if (this.gatherer && !this.gatherer.isMoving()) {
                    if (this.selectedChar == Characters.GATHERER) {
                        this.gatherer.moveTo(coord)
                    }
                }
                this.selectedChar == Characters.NONE
            }
        }
    }

    anyKeyUp(event) {
        //  Only allow A-Z and , and .
        let code = event.keyCode;
        if ((code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) ||
            (code == 188 || code == 190)) {
            var coord = getCoord(code)
            var index = getCellIndexFromCoord(coord)
            this.cells[index].keyUp()
        }
    }

    update(t: number, dt: number)
    {
        if (t > this.lastUnitSpawnTime + 2000) {
            this.lastUnitSpawnTime = t;
            if (this.units) {
                if (this.units.getLength() < 10) {
                    var validPosition : boolean
                    do {
                        validPosition = true
                        var i = Phaser.Math.Between(0, 2)
                        var j = Phaser.Math.Between(0, 8)
                        if (this.warrior?.posi == i && this.warrior.posj == j) {
                            validPosition = false
                        }
                        else if (this.gatherer?.posi == i && this.gatherer.posj == j) {
                            validPosition = false
                        }
                        else {
                            this.units.getChildren().forEach(go => {
                                var unitGo = go as Unit
                                if (unitGo.posi == i && unitGo.posj == j) {
                                    validPosition = false
                                }
                            })
                        }
                    } while (!validPosition)
                    var newUnit = this.units.get(getScreenCoordFromCoord(i, j)[0], getScreenCoordFromCoord(i, j)[1] - 60, 'unit')
                    newUnit.setCoords(i, j)
                }
            }
        }
    }
}
