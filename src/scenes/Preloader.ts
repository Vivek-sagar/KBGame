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
        this.load.image('red', 'tiles/red.png')

        this.load.image('key0',  'tiles/letters/key00000.png',)
        this.load.image('key1',  'tiles/letters/key00001.png')
        this.load.image('key2',  'tiles/letters/key00002.png')
        this.load.image('key3',  'tiles/letters/key00003.png')
        this.load.image('key4',  'tiles/letters/key00004.png')
        this.load.image('key5',  'tiles/letters/key00005.png')
        this.load.image('key6',  'tiles/letters/key00006.png')
        this.load.image('key7',  'tiles/letters/key00007.png')
        this.load.image('key8',  'tiles/letters/key00008.png')
        this.load.image('key9',  'tiles/letters/key00009.png')
        this.load.image('key10', 'tiles/letters/key00010.png')
        this.load.image('key11', 'tiles/letters/key00011.png')
        this.load.image('key12', 'tiles/letters/key00012.png')
        this.load.image('key13', 'tiles/letters/key00013.png')
        this.load.image('key14', 'tiles/letters/key00014.png')
        this.load.image('key15', 'tiles/letters/key00015.png')
        this.load.image('key16', 'tiles/letters/key00016.png')
        this.load.image('key17', 'tiles/letters/key00017.png')
        this.load.image('key18', 'tiles/letters/key00018.png')
        this.load.image('key19', 'tiles/letters/key00019.png')
        this.load.image('key20', 'tiles/letters/key00020.png')
        this.load.image('key21', 'tiles/letters/key00021.png')
        this.load.image('key22', 'tiles/letters/key00022.png')
        this.load.image('key23', 'tiles/letters/key00023.png')
        this.load.image('key24', 'tiles/letters/key00024.png')
        this.load.image('key25', 'tiles/letters/key00025.png')
        this.load.image('key26', 'tiles/letters/key00026.png')
        this.load.image('key27', 'tiles/letters/key00027.png')
        this.load.image('background', 'tiles/background/BG.png')

        this.load.atlas('ground_cell', 'tiles/tilemap/grass.png', 'tiles/tilemap/grass.json')
        this.load.atlas('lily', 'tiles/lily.png', 'tiles/lily.json')
        this.load.atlas('twinkle', 'tiles/twinkle/twinkles.png', 'tiles/twinkle/twinkles.json')
        // this.load.atlas('unit', 'tiles/faune/faune.png', 'tiles/faune/faune.json')
        // this.load.atlas('unit', 'tiles/faune/faune.png', 'tiles/faune/faune.json')
        this.load.atlas('unit', 'tiles/enemy/enemy.png', 'tiles/enemy/enemy.json')
        this.load.atlas('warrior', 'tiles/warrior/warrior.png', 'tiles/warrior/warrior.json')
        this.load.atlas('gatherer', 'tiles/gatherer/gatherer.png', 'tiles/gatherer/gatherer.json')
    }

    create()
    {
        this.scene.start('game')
    }
}