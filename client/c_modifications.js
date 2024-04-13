// This file defines basic swaps and vehicle mods.
// Engine swaps, transmission swaps, and a host of other preset stuff is defined here.
installed = {
    'flags': {},
    'components': {}
}

modifications = { 
    'engine': {
        'V8': {
            'fInitialDriveForce': [1, 0.2],
            'fDriveInertia': [1, 0.1],
            'fInitialDriveMaxFlatVel': [1, 35]
        },
        'W16': {
            'fInitialDriveForce': [1, 0.5],
            'fDriveInertia': [1, 0.2],
            'fInitialDriveMaxFlatVel': [1, 70]
        },
        'X69': {  // troll testing engine
            'fInitialDriveForce': [1, 5],
            'fDriveInertia': [1, 2],
            'fInitialDriveMaxFlatVel': [1, 700]
        }
    },
    'kit': {
        'drift': {
            // if arcade, use vehaud tampa2
            'fLowSpeedTractionLossMult': [0, 0],
            'fSteeringLock': [0, 75],
            'fInitialDriveForce': [2, 3],
            'fTractionCurveMax': [3, 3],
            'fTractionCurveMin': [3, 1.5],
            'fTractionCurveLateral': [0, 45],
            // 'fInitialDriveMaxFlatVel': [2, 1.2]
        },
        'arcade_lite': {
            // set vehaud to Tyrus for this one
            'fLowSpeedTractionLossMult': [0, 0],
            // 'fInitialDriveMaxFlatVel': [2, 1.2]
        },
        'arcade_heavy': {
            // set vehaud to Hellion for this one
            'fInitialDriveForce': [1, 0.2],
            'fDriveInertia': [1, 0.1],
            'fInitialDriveMaxFlatVel': [1, 35],
            'fSteeringLock': [0, 25],
            // 'fInitialDriveMaxFlatVel': [2, 1.2]
        }
    }
}