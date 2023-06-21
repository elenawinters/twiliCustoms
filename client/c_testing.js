RegisterCommand('mod', (source, args) => {
    const category = args[0]
    const feature = args[1]
    let output = ''
    switch (category) {
        case 'engine':
            break
    }

    TriggerEvent('chat:addMessage', {
        color: [255, 0, 0],
        multiline: true,
        args: {"twiliCustoms": `Field {${args[0]} is now set to ${args[1]}}`}
    });
});


runningWheelTest = false
RegisterCommand('wheelsize', (source, args) => {
    if (runningWheelTest) { runningWheelTest = false; }
    size = parseFloat(args[0])
    veh = GetVehiclePedIsIn(PLAYER_PED())
    SetVehicleWheelSize(veh, size)
    num = GetVehicleNumberOfWheels(veh)
    for (let i = 0; i < num; i++) {
        SetVehicleWheelTireColliderSize(veh, num, size)
    }
    const thread = setTick(() => {
        if (!runningWheelTest) { clearTick(thread); return; }
        for (let i = 0; i < num; i++) {
            SetVehicleWheelXOffset(veh, i, 20)
        }
    })

});



// function clientMessage(args) {
//     TriggerEvent('chat:addMessage', {
//         color: [255, 0, 0],
//         multiline: true,
//         args: args
//     });
// }