import Phaser from 'phaser'

const createCellAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'cell-idle',
        frames: [{ key: 'ground_cell', frame: 'grass1.png' }]
    })

    anims.create({
        key: 'cell-bump-idle',
        frames: [{ key: 'ground_cell', frame: 'bump1.png' }]
    })

    anims.create({
        key: 'cell-bump-selected',
        frames: anims.generateFrameNames('ground_cell', { start: 1, end: 2, prefix: 'bump', suffix: '.png' }),
        repeat: 3,
        frameRate: 10
    })

    anims.create({
        key: 'cell-selected',
        frames: anims.generateFrameNames('ground_cell', { start: 1, end: 2, prefix: 'grass', suffix: '.png' }),
        repeat: 3,
        frameRate: 10
    })
}

export {
    createCellAnims
}