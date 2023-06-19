-- define a table of handling files, indexed by engine type
local handling_files = {
    ["V8"] = "handling_V8",
    ["V12"] = "handling_V12",
    ["V16"] = "handling_V16"
}

-- define a function to change the handling file
function changeHandling(engine)
    -- get the handling file for the specified engine
    local handling_file = handling_files[engine]

    -- check if a handling file is defined for the engine
    if handling_file ~= nil then
        -- set the handling file of the player's vehicle
        SetVehicleHandlingField(GetVehiclePedIsUsing(PlayerPedId()), "CHandlingData", "strHandlingFile", handling_file)
    else
        -- show a message if the engine is not supported
        ShowNotification("Engine type not supported")
    end
end

-- register a command that allows the player to change the handling file
RegisterCommand("changehandling", function(source, args)
    -- get the engine type from the command arguments
    local engine = args[1]

    -- change the handling file for the specified engine
    changeHandling(engine)
end)
