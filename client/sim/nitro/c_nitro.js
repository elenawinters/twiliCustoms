let ActiveLooping = false
// let ActivePurge = false
// let ActiveBoost = false
let ActiveNOS = false

RegisterKeyMapping('+twiliCustoms:nitrous_oxide', 'Activate NOS', 'keyboard', 'LMENU')

RegisterCommand('+twiliCustoms:nitrous_oxide', (source, args) => {
    ActiveNOS = true
    runNitrous()
    return;
});

RegisterCommand('-twiliCustoms:nitrous_oxide', (source, args) => {
    ActiveNOS = false
    runNitrous()
    return;
});

RequestNamedPtfxAsset("core");
function runNitrous() {
    if (ActiveLooping) { return; }

    ActiveLooping = true;
    const thread = setTick(() => {
        if (!ActiveNOS) { ActiveLooping = false; }
        if (!ActiveLooping) { clearTick(thread); }

        // if (!IsPedInAnyVehicle(player)) { return; }

        const player = PlayerPedId()
        const vehicle = GetVehiclePedIsIn(player, false)
        const lastVehicle = GetVehiclePedIsIn(player, true)
        const driver = GetPedInVehicleSeat(vehicle, -1)

        if (lastVehicle != 0 && lastVehicle != vehicle) {
            // console.log('Disabling last vehicle')
            // SetVehicleNitroBoostEnabled(lastVehicle, false)
            // SetVehicleNitroPurgeEnabled(lastVehicle, false)
            // TriggerServerEvent('nitro:__sync', false, false, true)
        }

        if (vehicle == 0) { return; }

        let isBoosting = false;
        if (!IsVehicleStopped(vehicle) && driver == player) {
            executeBoost(vehicle)
            isBoosting = true
            // boostPTFX(vehicle)
        }

        const isDriving = IsControlPressed(0, 71);
        const isRunning = GetIsVehicleEngineRunning(vehicle)
        // const isBoosting = IsVehicleNitroBoostEnabled(vehicle)
        // const isPurging = IsVehicleNitroPurgeEnabled(vehicle)

        if (isRunning && isDriving && isBoosting) {
            // SetVehicleNitroBoostEnabled(vehicle, true)
            // SetVehicleNitroPurgeEnabled(vehicle, false)
        } 
        else if (isRunning && isDriving && !isBoosting) {
            SetVehicleNitroBoostEnabled(vehicle, false)
            SetVehicleNitroPurgeEnabled(vehicle, true)
            SetVehicleNitroEnabled(vehicle, false)
        }

        // UseParticleFxAssetNextCall('core')
        
    })
}


function executeBoost(vehicle) {
    const vehicleModel = GetEntityModel(vehicle)
    const currentSpeed = GetEntitySpeed(vehicle)
    const maximumSpeed = GetVehicleModelMaxSpeed(vehicleModel)
    const multiplier = 2.0 * maximumSpeed / currentSpeed

    SetVehicleEngineTorqueMultiplier(vehicle, multiplier)
    // console.log('boosting')
}

function executePurge(vehicle) {
    const modname = GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)).toLowerCase()
    if (CustomPurge[modname] != null) {

    }

}