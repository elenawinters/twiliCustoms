// This file defines basic swaps and vehicle mods.
// Engine swaps, transmission swaps, and a host of other preset stuff is defined here.
installed = {
    'flags': {},
    'components': {}
}

modifications = { 
    'engine': {
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
            'fLowSpeedTractionLossMult': [0, 0],
            'fSteeringLock': [0, 75],
            'fInitialDriveForce': [2, 3],
            'fTractionCurveMax': [3, 3],
            'fTractionCurveMin': [3, 1.5],
            'fTractionCurveLateral': [0, 45],
            // 'fInitialDriveMaxFlatVel': [2, 1.2]
        }
    }
}