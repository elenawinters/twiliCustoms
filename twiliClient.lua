-- reference https://eddlm.github.io/Handling-Tools/handling

DefaultHandling = {}
ModList = {}

RegisterCommand('vehaud', function(source, args)
    ForceVehicleEngineAudio(GetVehiclePedIsIn(PlayerPedId(), false), args[1])
    -- SetNuiFocus(true, true)
    -- SendNUIMessage({showdmgmenu = true})
end, false)


RegisterCommand('mod', function(source, args)
    local category = args[1]
    local feature = args[2]
    print(category)
    print(feature)
    local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    if DefaultHandling[GetEntityModel(vehicle)] == nil then
        DefaultHandling[GetEntityModel(vehicle)] = {}
    end
    if ModList[category] == nil then
        ModList[category] = {}
    end
    ModList[category] = feature
    if category == 'engine' then
        for field, overwrite_value in pairs(engineModifier[feature]) do
            DefaultHandling[GetEntityModel(vehicle)][field] = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
        end
        -- ModifyVehicleTopSpeed(vehicle, 354)
        for field, value in pairs(engineModifier[feature]) do
            -- if field == 'twiliEnginePower' then

            -- else
            print(field.. ': '.. value)
            old = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
            print('old: '.. old)
            SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, DefaultHandling[GetEntityModel(vehicle)][field] + value)

            new = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
            print('new: '.. new)
            -- end
            -- print(k, v[1], v[2], v[3])
        end
        ForceVehicleEngineAudio(vehicle, audioOverwrite[feature])
        print('We made it!')
        ModifyVehicleTopSpeed(vehicle, 1.0) -- this is important. it applies the changes we made

        -- enforceHandling()
        -- local test = engineModifier[feature]
        -- SetVehicleHandlingField(Vehicle vehicle, 'CHandlingData', char* fieldName, Any value)
    elseif category == 'tires' then
        for field, overwrite_value in pairs(tireModifier[feature]) do
            DefaultHandling[GetEntityModel(vehicle)][field] = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
        end
    end
    -- ForceVehicleEngineAudio(GetVehiclePedIsIn(PlayerPedId(), false), args[1])
    -- SetNuiFocus(true, true)
    -- SendNUIMessage({showdmgmenu = true})
    ModList[category] = feature
end, false)


-- function enforceHandling()
--     Citizen.CreateThread(function ()
--         IsRendering = true
--         while IsRendering == true do
--             -- print('Doot')
--             vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
--             for field, value in pairs(engineModifier['W16']) do
--                 -- if field == 'twiliEnginePower' then
    
--                 -- else
--                 SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, DefaultHandling[GetEntityModel(vehicle)][field] + value)
--             end

--             Citizen.Wait(0)
--         end
--     end)
-- end
