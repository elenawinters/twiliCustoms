-- How these work.
-- Modifiers are additions or subtractions from the vehicle handling file.
-- Overwrites straight up change the vehicle handling to the value.
-- Overwrites are more powerful than Modifiers. Modifiers will likely be more balannced.

engineModifier = {
    ["V8"] = {
        ['fInitialDriveForce'] = 0.3,  -- this will bring the 0.2 to 0.5
        ['fDriveInertia'] = 2,  -- this will bring the 1 to 3
        ['fInitialDriveMaxFlatVel'] = 60  -- this will bring the 140 to 200 (116mph to 166mph) [top speed]
    },
    ['W16'] = {
        ['fInitialDriveForce'] = 0.5,
        ['fDriveInertia'] = 0.2,
        ['fInitialDriveMaxFlatVel'] = 70  -- buffed from 176 by 70 to 246 for tempesta
    }
}

transmissionModifier = {
    ['low'] = {

    },
    ['mid'] = {

    },
    ['high'] = {
        
    }
}

-- local component_weights -- probably not gonna do this

-- https://forums.gta5-mods.com/topic/14011/reference-vehicle-sound-guide
-- there's lots of good engine sounds. we gonna have to do a lot of work on dynamic systems
audioOverwrite = {
    ['W16'] = 'ADDER',
}

tireModifier = {
    ['Semi-Slick Race Tires'] = {    },
    ['Slick Race Tires'] = {},
    ['Drift Tires'] = {
        ['flags'] = 'drift_native'
    },  -- use the drift tire flag
    ['Rally Tires'] = {},
    ['Offroad Race Tires'] = {},
    ['Snow Tires'] = {},
    ['Drag Tires'] = {}
}