// Keep an eye out for this PR, will render parts or the entirety of this file useless.
// https://github.com/citizenfx/fivem/pull/2340

let ELECTRIC_VEHICLES = {}
const ELECTRIC_VEHICLE_NAMES = [
    'AIRTUG', 'CYCLONE', 'CADDY', 'CADDY2', 'CADDY3', 'DILETTANTE', 'IMORGON',
    'KHAMEL', 'NEON', 'RAIDEN', 'SURGE', 'VOLTIC', 'VOLTIC2', 'TEZERACT'
]

ELECTRIC_VEHICLE_NAMES.forEach((name) => {
    ELECTRIC_VEHICLES[GetHashKey(name)] = true
});

function IsVehicleElectric(vehicle) {
    const model = GetEntityModel(vehicle)
    return ELECTRIC_VEHICLES[model] ? true : false
}
