fx_version 'cerulean'
games { 'gta5' }

author 'Elena Winters'
description 'Forza style car customization inside of FiveM.'
version '0.1.0'

-- ui_page 'html/ui.html'

-- files {
--     'html/ui.html',
--     'html/script.js',
--     'html/style.css',
-- }

-- client_script 'twiliClient.lua'

client_scripts {
    'twiliClient.lua',
    'twiliVehicles.lua',
    'twiliMods.lua'
}

