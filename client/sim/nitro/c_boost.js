function SetVehicleNitroBoostEnabled(vehicle, enabled) {
    if (IsVehicleNitroBoostEnabled(vehicle) == enabled) {
        return
    }

    SetVehicleBoostActive(vehicle, enabled)

    if (IsPedInVehicle(PlayerPedId(), vehicle) || !enabled) {
        SetNitroBoostScreenEffectsEnabled(enabled)
        SetVehicleNitroEnabled(vehicle, true, 0.0, 0.0, 0.0, true)  // this is the only one needed i think
    // else
    // SetVehicleNitroEnabled(vehicle, false)
    }

    // SetVehicleBoostActive(vehicle, enabled)
    vehicles[vehicle] = enabled ? enabled : null
}