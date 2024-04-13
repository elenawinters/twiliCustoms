RegisterCommand('mod', (source, args) => {
    const category = args[0];
    const feature = args[1];
    const vehicle = GetVehiclePedIsIn(PLAYER_PED());
    if (category == 'reset') {
        for (const [field, value] of Object.entries(defaultHandling[GetEntityArchetypeName(vehicle)])) {
            SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, value)
            console.log(`${field} has been reverted to ${value}`)
        }
        return;
    }
    updateHandlingFields(vehicle, modifications[category][feature])
    // switch (category) {
    //     case 'engine':
    //         updateHandlingFields(vehicle, modifications[category][feature])
    //         // console.log(category)
    //         break
    // }

});

RegisterCommand('vehaud', (source, args) => {
    ForceVehicleEngineAudio(GetVehiclePedIsIn(PLAYER_PED(), false), args[0])
});


RegisterCommand('wheelsize', (source, args) => {
    veh = GetVehiclePedIsIn(PLAYER_PED(), false)
    size = parseFloat(args[0])
    SetVehicleWheelSize(veh, (size * 2) - 0.05)
    // SetVehicleWheelSize(veh, size * 2)
    wheels = GetVehicleNumberOfWheels(veh)
    for (let i = 0; i < wheels; i++) {
        console.log(i)
        SetVehicleWheelTireColliderSize(veh, i, size)
        SetVehicleWheelRimColliderSize(veh, i, size)
    }
});

RegisterCommand('wheelwidth', (source, args) => {
    veh = GetVehiclePedIsIn(PLAYER_PED(), false)
    size = parseFloat(args[0])
    SetVehicleWheelWidth(veh, size)
    // SetVehicleWheelSize(veh, size * 2)
    wheels = GetVehicleNumberOfWheels(veh)
    for (let i = 0; i < wheels; i++) {
        console.log(i)
        SetVehicleWheelTireColliderWidth(veh, i, size / 2)
    }
});


// runningWheelTest = false
// RegisterCommand('wheelsize', (source, args) => {
//     if (runningWheelTest) { runningWheelTest = false; }
//     runningWheelTest = true
//     size = parseFloat(args[0])
//     veh = GetVehiclePedIsIn(PLAYER_PED())
//     SetVehicleWheelSize(veh, size)
//     num = GetVehicleNumberOfWheels(veh)
//     for (let i = 0; i < num; i++) {
//         SetVehicleWheelTireColliderSize(veh, i, size)
//     }
//     // const thread = setTick(() => {
//     //     console.log('running')
//     //     if (!runningWheelTest) { clearTick(thread); return; }
//     //     for (let i = 0; i < num; i++) {
//     //         // SetVehicleWheelTireColliderSize(veh, num, size)
//     //         SetVehicleWheelXOffset(veh, i, 20)
//     //     }
//     // })

// });



// function clientMessage(args) {
//     TriggerEvent('chat:addMessage', {
//         color: [255, 0, 0],
//         multiline: true,
//         args: args
//     });
// }