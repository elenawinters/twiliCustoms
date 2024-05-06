
normalize = (val, max, min) => (val - min) / (max - min); 

// const compression_limit = 2
let compression_limit = 10.0
let compression_multiplier = 1.0


exports.twiliDebug.selInvoke("toggle", true)
const wheel_brake_thread = setTick(async () => {
    if (!IsPedInAnyVehicle(PlayerPedId())) { return; }
    const entity = GetVehiclePedIsIn(PlayerPedId())
    if (GetPedInVehicleSeat(entity, -1) != PlayerPedId()) { return; }
    
    let wheelp = ''
    const wheels = GetVehicleNumberOfWheels(entity);

    compression_limit = Math.log(getHandling(entity, 'fMass', false)) / 10
    // const fMassDampener = Math.max(1.0 - normalize(Math.log(GetVehicleHandlingFloat(entity, 'CHandlingData', 'fMass')), 10, 1), 0.2)
    let weaken_suspension = false
    for (let i = 0; i < wheels; i++) {
        const compression = GetVehicleWheelSuspensionCompression(entity, i) * compression_multiplier

        // if (compression_multiplier != 1.0) { compression_multiplier = 1.0 }
        // if (compression_multiplier > 1.0) {
        //     console.log(compression_multiplier)
        // }

        wheelp += i + ': ' + compression + '<br>'
        if (compression < compression_limit) { continue; }
        weaken_suspension = true
        // console.log('Fuck the suspension')

        if (compression < compression_limit * 5) { continue; }
        BreakOffVehicleWheel(entity, i, false, false, true, false)
    }

    if (weaken_suspension) {
        console.log('Fuck the suspension')
        const fSteeringLockDefault = getHandling(entity, 'fSteeringLock', true)
        const decay_factor = compression_multiplier / 1000
        updateHandlingFields(entity, {
            // -(compression_multiplier / 10)
            // 'fSuspensionForce': [1, 0.1, 100, 'ge'],
            'fSuspensionCompDamp': [1, -decay_factor, 0.25, 'le'],
            'fSuspensionReboundDamp': [1, -decay_factor, 0.4, 'le'],
            'fSteeringLock': [1, decay_factor * 10, fSteeringLockDefault * 1.75, 'ge'],
        }, false)

        // PlaySound(61, "ent_amb_elec_crackle", 0, 0, 0, 1);
    }


    // exports.twiliDebug
    exports.twiliDebug.selInvoke("updateText", {
        ["twdebug2"]: ([`
            <div class='tooltip2'><span class='tooltip2-text'>
                Limit: ${compression_limit}<br>
                Multiplier: ${compression_multiplier}<br>
                ${wheelp}
            </span></div>
        `])
    })
    // });
});
