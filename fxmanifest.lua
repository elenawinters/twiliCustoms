fx_version 'cerulean'
games { 'gta5' }

author 'Elena Winters'
description 'Forza style car customization inside of FiveM.'
version '0.1.0+23.6.20'

-- Pre-emptively defining twiliCore as a dependency
dependencies {
    'twiliCore'
}

client_scripts {
    '@twiliCore/client/c_globals.js',
    'client/c_modifications.js',
    'client/c_handling.js',
    'client/c_testing.js'
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

