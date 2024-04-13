const wheel_bones = [
    'wheel_lf', 'wheel_rf', 'wheel_lm1', 'wheel_rm1', 'wheel_lm2',
    'wheel_rm2', 'wheel_lm3', 'wheel_rm3', 'wheel_lr', 'wheel_rr',
    // 'wheel_f', 'wheel_r'
]

function GetValidWheelBonesIndexed(entity) {
    let valid_bones = []
    Object.values(wheel_bones).forEach((boneName) => {
        boneIndex = GetEntityBoneIndexByName(entity, boneName)
        if (boneIndex != -1) {  // if it's not -1, it's a valid bone
            valid_bones.push(boneName)
        }
    })

    return valid_bones;
}


// temperature has no irl analog. i'm treating it as C though
let current_handles = {}
const submerged_modifier = 6;
const disc_first_threshold = 450;
const disc_second_threshold = 750;
const temp_decay_rate = 6000;
const speed_dampener = 10;
const default_temp = 40;
let temps = {}

RequestNamedPtfxAsset("core");
exports.twiliDebug.selInvoke("toggle", true)
const brake_disc_thread = setTick(async () => {
    if (!IsPedInAnyVehicle(PlayerPedId())) { return; }
    const entity = GetVehiclePedIsIn(PlayerPedId())
    if (GetPedInVehicleSeat(entity, -1) != PlayerPedId()) { return; }
    // const entity = GetVehiclePedIsIn(PLAYER_PED());
    const valid_bones = GetValidWheelBonesIndexed(entity)
    // console.log(entity)
    // Object.values(GetGamePool('CVehicle')).forEach((entity) => {
    if (!current_handles.hasOwnProperty(entity)) { current_handles[entity] = []}
    if (!temps.hasOwnProperty(entity)) { temps[entity] = []}
    const wheels = GetVehicleNumberOfWheels(entity);
    let wheelp = ''
    let submerged_factor = 1
        if (IsEntityInWater(entity)) {
            submerged_factor = submerged_modifier
        }
    for (let i = 0; i < wheels; i++) {
        const pressure = GetVehicleWheelBrakePressure(entity, i);
        // let speed = GetVehicleWheelSpeed(entity, i)
        const compression = GetVehicleWheelSuspensionCompression(entity, i)
        const speed = GetVehicleWheelSpeed(entity, i)

        if (temps[entity][i] == null || temps[entity][i] < default_temp) { temps[entity][i] = default_temp}
        // console.log(temps[entity])

        // console.log(temp_decay_rate ** temps[entity][i])
        // - temp_decay_rate
        // console.log(Math.log(1 + temps[entity][i] / (Math.abs(speed) + 1 / temp_decay_rate)))

        // if (speed != 0 && pressure != 0) {
        //     temps[entity][i] = Math.log(temps[entity][i] + 1) + temps[entity][i]
        // }
    
        temps[entity][i] = temps[entity][i] + (pressure * Math.abs(speed)/speed_dampener) - Math.log(1 + temps[entity][i] / (Math.abs(speed) + 1 * temp_decay_rate / submerged_factor))


        wheelp += i + ': ' + temps[entity][i] + ' degrees <br>'

        if (temps[entity][i] < disc_first_threshold) { continue; }
        // const valid_bones = GetValidWheelBonesIndexed(entity)

        UseParticleFxAssetNextCall("core");
        if (current_handles[entity][i] == null) { 
            console.log('here')
            current_handles[entity][i] = StartParticleFxLoopedOnEntityBone("veh_exhaust_afterburner", entity, GetVehicleWheelXOffset(entity, i), 0.0, 0.0, 0.0, 0.0, 90.0, valid_bones[i], 0.5, false, false, false);
        }

        // UseParticleFxAssetNextCall("core");
        //   let brakedisc1 = StartParticleFxLoopedOnEntityBone("veh_exhaust_afterburner", closeVehicle, command_x, 0.0, 0.0, 0.0, 0.0, 90.0, GetEntityBoneIndexByName(closeVehicle, "wheel_lf"), command_s, false, false, false);
        //   StopParticleFxLooped(brakedisc1, false);
        //   RemoveParticleFx(brakedisc1, true);
        //   delete brakedisc1;

        let alpha = (temps[entity][i] - disc_first_threshold) / (disc_second_threshold - disc_first_threshold);
        if (alpha > 1.0) { alpha = 1.0 }
        SetParticleFxLoopedAlpha(current_handles[entity][i], alpha);
        // console.log(alpha)

        // UseParticleFxAssetNextCall("core");

        // let disc = StartParticleFxLoopedOnEntityBone("veh_exhaust_afterburner", entity, GetVehicleWheelXOffset(entity, i), 0.0, 0.0, 0.0, 0.0, 90.0, valid_bones[i], 0.5, false, false, false);
        // StopParticleFxLooped(disc, false);
        // RemoveParticleFx(disc, true);
        // delete disc;
        // SetParticleFxLoopedAlpha(disc, alpha);

        // if (current_handles[entity][i] == null) { 
        //     UseParticleFxAssetNextCall("core");
        //     current_handles[entity][i] = StartParticleFxLoopedOnEntityBone("veh_exhaust_afterburner", entity, GetVehicleWheelXOffset(entity, i), 0.0, 0.0, 0.0, 0.0, 90.0, valid_bones[i], 0.5, false, false, false);
        // }

        // SetParticleFxLoopedAlpha(current_handles[entity][i], temps[entity][i] / disc_second_threshold);

        // Object.values(current_handles).forEach((handle) => {
        //     SetParticleFxLoopedAlpha(handle[i], (temps[entity][i] - disc_first_threshold) / disc_second_threshold);
        // });

        // UseParticleFxAssetNextCall("core");
        // first 0.0 might need to be the actual offset
        // let disc = StartParticleFxLoopedOnEntityBone("veh_exhaust_afterburner", entity, GetVehicleWheelXOffset(entity, i), 0.0, 0.0, 0.0, 0.0, 90.0, valid_bones[i], 0.5, false, false, false);
        // SetParticleFxLoopedAlpha(disc, (temps[entity][i] - disc_first_threshold) / disc_second_threshold);
        // setTimeout(() => {
        //     StopParticleFxLooped(disc, false);
        //     RemoveParticleFx(disc, true);
        //     delete disc;
        //   }, 10000);

        // handle_delete_queue_1.push(disc)
        // StopParticleFxLooped(disc, false);
        // RemoveParticleFx(disc, true);
        // delete disc;

        

        // if (temps[entity][i] < disc_second_threshold) { continue; }


    }
    // exports.twiliDebug
    exports.twiliDebug.selInvoke("updateText", {
        ["twdebug2"]: ([`
            <div class='tooltip2'><span class='tooltip2-text'>
                ${wheelp}
            </span></div>
        `])
    })
    // });
});

// RequestNamedPtfxAsset("core");
// const vis_thread = setTick(async () => {
//     if(!HasNamedPtfxAssetLoaded("core")) { return; }
//     const entity = GetVehiclePedIsIn(PLAYER_PED());
//     const valid_bones = GetValidWheelBonesIndexed(entity)
//     for (let i = 0; i < temps[entity].length; i++) {
//         console.log(i)
//         let alpha = (temps[entity][i] - disc_first_threshold) / (disc_second_threshold - disc_first_threshold);
//         if (alpha > 1.0) { alpha = 1.0 }
//         // SetParticleFxLoopedAlpha(disc, alpha);
//         // console.log(alpha)

//         UseParticleFxAssetNextCall("core");

//         current_handles[entity][i] = StartParticleFxLoopedOnEntityBone("veh_exhaust_afterburner", entity, GetVehicleWheelXOffset(entity, i), 0.0, 0.0, 0.0, 0.0, 90.0, valid_bones[i], 0.5, false, false, false);
//         // StopParticleFxLooped(disc, false);
//         // RemoveParticleFx(disc, true);
//         // delete disc;
//         console.log('here')
//     }
//     Delay(3)
// });




RegisterCommand('bones', (source, args) => {
    const [w1, w2, wp] = GetWeatherTypeTransition()
    // const [w1, w2, wp] = args
    SetWeatherTypeTransition(GetHashKey(w1), GetHashKey(w2), 0.95)
    allowUpcomingChange = true
    // SetTransitionTimecycleModifier(GetHashKey(w2), 0)
});
