var summons = {
    'shadowClone': {
        id: "shadowClone", name: "Shadow Clone",
        attributes: [1,1,1,1],
        combatProperties: new CombatProperties(),
        spriteFile: "shadowClone.png",
        moves: ['katana','shuriken', 'shadowWalk'],
        engagementRange: 5,
        duration: 5,
    },
    'allyTentacle': {
        id: "allyTentacle", name: "Summoned Tentacle",
        attributes: [1,1,1,1],
        combatProperties: new CombatProperties(),
        spriteFile: "allyTentacle.png",
        moves: ['tendrilWhip','slowWalk'],
        engagementRange: 10,
        duration: 10,
    },
    'allyWolf': {
        id: "allyWolf", name: "Wolf",
        attributes: [1,1,1,1],
        combatProperties: new CombatProperties(),
        spriteFile: "allyWolf.png",
        moves: ['clawStrike','walk'],
        modifiers:{actionSpeed:3},
        engagementRange: 5,
        duration: 5,
    }
}