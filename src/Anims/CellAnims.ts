import Phaser from 'phaser'

const createCellAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'cell-idle',
        frames: [{ key: 'lily', frame: 'lily.png' }]
    })

    anims.create({
        key: 'cell-bump-idle',
        frames: [{ key: 'lily', frame: 'lily.png' }]
    })

    anims.create({
        key: 'cell-bump-selected',
        frames: [{ key: 'lily', frame: 'lily.png' }]
    })

    anims.create({
        key: 'cell-selected',
        frames: [{ key: 'lily', frame: 'lily.png' }]
    })

    // anims.create({
    //     key: 'cell-bump-selected',
    //     frames: anims.generateFrameNames('lily', { start: 1, end: 2, prefix: 'bump', suffix: '.png' }),
    //     repeat: 3,
    //     frameRate: 10
    // })

    // anims.create({
    //     key: 'cell-selected',
    //     frames: anims.generateFrameNames('lily', { start: 1, end: 2, prefix: 'grass', suffix: '.png' }),
    //     repeat: 3,
    //     frameRate: 10
    // })
}

export {
    createCellAnims
}