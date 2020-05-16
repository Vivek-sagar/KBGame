import Phaser from 'phaser'

const createUnitAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'unit-idle',
        frames: anims.generateFrameNames('unit', { start: 1, end: 8, prefix: 'walk-side-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'unit-run',
        frames: anims.generateFrameNames('unit', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })
}

export {
    createUnitAnims
}