// This thread blocks air control
const vel_hist_limit = 3 // min of 3
let is_falling = false
// let fall_height = 0
// let air_time = 0

function fall_check(veh) {
    // if (!is_falling) { return; }
    is_falling = false;
    // console.log(vel_history)
    // console.log(GetEntityVelocity(veh)[2])
    const pvel = GetEntityVelocity(veh)[2] // previous velocity
    const falling_thread = setTick(async () => {
        // pvel = GetEntityVelocity(veh)[2] // previous velocity
        await Delay(10)
        const cvel = GetEntityVelocity(veh)[2] // current velocity

        const diff = Math.abs(pvel - cvel)
        compression_multiplier = diff + 1
        // if (diff > 1.0) {
        //     console.log(`Current Vel: ${cvel} | Previous Vel: ${pvel}`)
        //     console.log(compression_multiplier)
        // }

        clearTick(falling_thread);
    });
    // console.log(GetEntityVelocity(veh)[2])
    // emit('twiliCustoms:air_control:landed', veh, fall_height - GetEntityCoords(veh)[2], air_time);
    // emit('twiliCustoms:air_control:landed', veh, fall_height - GetEntityCoords(veh)[2], air_time);
    // fall_height = 0;
    // air_time = 0;
}

const air_control_thread = setTick(async () => {
    if (!IsPedInAnyVehicle(PlayerPedId())) { return; }
    const veh = GetVehiclePedIsIn(PlayerPedId(), false)
    if (GetPedInVehicleSeat(veh, -1) != PlayerPedId()) { return; }
    if (!DoesEntityExist(veh) && IsEntityDead(veh)) { return; }
    const model = GetEntityModel(veh)
    // if (!IsEntityInAir(veh)) { return; }
    if (IsVehicleOnAllWheels(veh)) { fall_check(veh); return; }
    let compressions = []
    for (let i = 0; i < GetVehicleNumberOfWheels(veh); i++) {
        compressions.push(GetVehicleWheelSuspensionCompression(veh, i) ? true : false)
    }
    // console.log(compressions)
    if (compressions.some((e) => e !== false)) { fall_check(veh); return;
    }
    // if (IsThisModelABoat(model) || IsThisModelAHeli(model) || 
    //     IsThisModelAPlane(model) || IsThisModelABike(model) || 
    //     IsThisModelABicycle(model)) { return; }
    // if (is_falling == false) {
    //     // fall_height = GetEntityCoords(veh)[2]
    //     // console.log(fall_height)
    //     emit('twiliCustoms:air_control:in_air', veh);
    // }
    is_falling = true
    if (!IsThisModelACar(model) && !IsThisModelABike(model)) { return; }
    DisableControlAction(0, 59) // leaning left/right
    DisableControlAction(0, 60) // leaning up/down
});
