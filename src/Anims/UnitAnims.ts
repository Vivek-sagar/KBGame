import Phaser from 'phaser'

const createUnitAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'unit-idle',
        frames: anims.generateFrameNames('unit', { start: 1, end: 5, prefix: 'GhostAppear-', suffix: '.png' }),
        repeat: -1,
        frameRate: 5
    })

    anims.create({
        key: 'unit-run',
        frames: anims.generateFrameNames('unit', { start: 1, end: 8, prefix: 'GhostAttack-', suffix: '.png' }),
        repeat: -1,
        frameRate: 5
    })

    anims.create({
        key: 'warrior-run',
        frames: anims.generateFrameNames('warrior', { start: 1, end: 4, prefix: 'Melee_Run-', suffix: '.png' }),
        repeat: -1,
        frameRate: 5
    })

    anims.create({
        key: 'gatherer-run',
        frames: anims.generateFrameNames('gatherer', { start: 1, end: 5, prefix: 'Gobble_Move-', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })

    anims.create({
        key: 'gem',
        frames: anims.generateFrameNames('gem', { start: 1, end: 5, prefix: 'Gem-', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}

export {
    createUnitAnims
}