

const compression_limit = 0.5

exports.twiliDebug.selInvoke("toggle", true)
const wheel_brake_thread = setTick(async () => {
    if (!IsPedInAnyVehicle(PlayerPedId())) { return; }
    const entity = GetVehiclePedIsIn(PlayerPedId())
    if (GetPedInVehicleSeat(entity, -1) != PlayerPedId()) { return; }
    
    let wheelp = ''
    const wheels = GetVehicleNumberOfWheels(entity);
    for (let i = 0; i < wheels; i++) {
        const compression = GetVehicleWheelSuspensionCompression(entity, i)
        wheelp += i + ': ' + compression + '<br>'
        if (compression < compression_limit) { continue; }
        BreakOffVehicleWheel(entity, i, false, false, true, false)
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
