// This file defines basic swaps and vehicle mods.
// Engine swaps, transmission swaps, and a host of other preset stuff is defined here.
installed = {
    'flags': {},
    'components': {}
}

modifications = { 
    'engine': {
        'W16': {
            'fInitialDriveForce': 0.5,
            'fDriveInertia': 0.2,
            'fInitialDriveMaxFlatVel': 70
        },
        'X69': {  // troll testing engine
            'fInitialDriveForce': 5,
            'fDriveInertia': 2,
            'fInitialDriveMaxFlatVel': 700
        }
    }
}