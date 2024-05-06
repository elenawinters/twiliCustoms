fx_version 'cerulean'
games { 'gta5' }

author 'Elena Winters'
description 'Forza style car customization inside of FiveM.'
version '0.1.0+dev'

-- Pre-emptively defining twiliCore as a dependency
dependencies {
    'twiliCore',
    'twiliDebug'
}

client_scripts {
    '@twiliCore/client/c_globals.js',
    'client/c_modifications.js',
    'client/c_handling.js',
    'client/c_testing.js',

    'client/sim/c_air_control.js',
    'client/sim/c_brake_discs.js',
    'client/sim/c_wheel_break.js',
    'client/sim/nitro/*',
}

shared_scripts {
    '@twiliCore/shared/u_common.js'
}


-- ui_page 'html/ui.html'

-- files {
--     'html/ui.html',
--     'html/script.js',
--     'html/style.css',
-- }

-- client_script 'twiliClient.lua'

-- client_scripts {
--     'twiliClient.lua',
--     'twiliVehicles.lua',
--     'twiliMods.lua'
-- }

