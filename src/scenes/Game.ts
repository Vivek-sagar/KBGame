import Phaser, { Tilemaps } from 'phaser'

import { createCellAnims } from '../Anims/CellAnims'
import { createUnitAnims } from '../Anims/UnitAnims'
import { getCoord, getCellIndexFromCoord, getScreenCoordFromCoord, getLetterFromCoord } from '../Utils/getCoord'

import Unit from '../Unit'
import '../Warrior'
import '../Gatherer'
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

        this.gameState = 0;
        this.selectedCell = [-1, -1]
        this.selectedChar = Characters.NONE
	}

    makeMap() {
        for (let cell of this.gridCoords) {
            // this.add.image(cell[0], cell[1], 'ground_grass1')
            
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
                this.gridCoords.push([getScreenCoordFromCoord(j, i)[0], getScreenCoordFromCoord(j, i)[1]])
                var spriteName = 'grass1.png'
                var sprite = this.physics.add.sprite(getScreenCoordFromCoord(j, i)[0], getScreenCoordFromCoord(j, i)[1], 'ground_cell', spriteName);
                
                this.cellSprites.push(sprite)
                var index = getLetterFromCoord([j, i])
                var letter = this.add.image(getScreenCoordFromCoord(j, i)[0], getScreenCoordFromCoord(j, i)[1]-10, 'key' + (index.charCodeAt(0) - 65).toString())
                letter.setScale(0.4)
                sprite.anims.play('cell-idle')
                if (j == 1 && (i == 3 || i == 6)) {
                    sprite.anims.play('cell-bump')
                }
            }
        }

        for (var cell of this.cellSprites)
        {
            
        }

        this.units = this.physics.add.group({
            classType: Unit
        })
        this.warrior = this.add.warrior(0,0,'unit')
        this.gatherer = this.add.gatherer(0,0,'unit')
    }

    anyKey(event) {
        //  Only allow A-Z and , and .
        let code = event.keyCode;

        if ((code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) ||
            (code == 188 || code == 190))
        {
            var coord = getCoord(code)
            if (this.gameState == 0) {
                if (this.warrior && !this.warrior.isMoving()) {
                    var warriorCoords = this.warrior.getCoords()
                    if (warriorCoords[0] == coord[0] && warriorCoords[1] == coord[1]) {
                        console.log("Warrior")
                        this.selectedChar = Characters.WARRIOR
                        this.gameState = 1
                        this.selectedCell = coord
                        this.cellSprites[getCellIndexFromCoord(coord)].anims.play('cell-selected')
                    }
                    
                }
                if (this.gatherer && !this.gatherer.isMoving()) {
                    var gathererCoords = this.gatherer.getCoords()
                    if (gathererCoords[0] == coord[0] && gathererCoords[1] == coord[1] ) {
                        console.log("Gatherer")
                        this.selectedChar = Characters.GATHERER
                        this.gameState = 1
                        this.selectedCell = coord
                        this.cellSprites[getCellIndexFromCoord(coord)].anims.play('cell-selected')
                    }
                }
                
            }
            else if (this.gameState == 1) {
                this.cellSprites[getCellIndexFromCoord(this.selectedCell)].anims.play('cell-idle')
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
                    var newUnit = this.units.get(getScreenCoordFromCoord(i, j)[0], getScreenCoordFromCoord(i, j)[1] - 25, 'unit')
                    newUnit.setCoords(i, j)
                }
            }
        }
    }
}
