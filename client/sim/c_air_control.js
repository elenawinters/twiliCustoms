// This thread blocks air control

const air_control_thread = setTick(async () => {
    if (!IsPedInAnyVehicle(PlayerPedId())) { return; }
    const veh = GetVehiclePedIsIn(PlayerPedId(), false)
    if (GetPedInVehicleSeat(veh, -1) != PlayerPedId()) { return; }
    if (!DoesEntityExist(veh) && IsEntityDead(veh)) { return; }
    const model = GetEntityModel(veh)
    if (!IsEntityInAir(veh)) { return; }
    if (IsThisModelABoat(model) || IsThisModelAHeli(model) || 
        IsThisModelAPlane(model) || IsThisModelABike(model) || 
        IsThisModelABicycle(model)) { return; }
    DisableControlAction(0, 59) // leaning left/right
    DisableControlAction(0, 60) // leaning up/down
});