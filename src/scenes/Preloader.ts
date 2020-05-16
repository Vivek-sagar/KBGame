import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        this.load.image('ground_grass1', 'tiles/grass1.png')
        this.load.image('ground_grass2', 'tiles/grass2.png')
        this.load.image('ground_stone', 'tiles/stone.png')

        this.load.atlas('ground_cell', 'tiles/tilemap/grass.png', 'tiles/tilemap/grass.json')
        this.load.atlas('unit', 'tiles/faune/faune.png', 'tiles/faune/faune.json')
    }

    create()
    {
        this.scene.start('game')
    }
}