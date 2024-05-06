defaultHandling = {}

// This will only consider the default handling in a way the script knows. If you mess with handling, this could break.
function getHandling(vehicle, field, hdefault) {
    value = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
    if (hdefault == false) { return value; }
    vehicleName = GetEntityArchetypeName(vehicle)
    if (!defaultHandling[vehicleName]) { defaultHandling[vehicleName] = {}; }
    if (!defaultHandling[vehicleName].hasOwnProperty(field)) {
        defaultHandling[vehicleName][field] = value;
    }

    return defaultHandling[vehicleName][field]
}

// Let's do this in bulk. Less calls to the ModifyVehicleTopSpeed native
// I want this in twiliCore, but, we have special modifications that have been made to it for this script.
function updateHandlingFields(vehicle, handlingCollection, hdefault = true) {
    // console.log(handlingCollection)
    // handlingCollection.forEach((field, value) => {
    for (const [field, value] of Object.entries(handlingCollection)) {
        let new_value = value[1]
        if (value[3] == 'ge' && getHandling(vehicle, field, false) >= value[2]) { continue; }
        if (value[3] == 'le' && getHandling(vehicle, field, false) <= value[2]) { continue; }
        switch (value[0]) {
            case 0:  // set
                getHandling(vehicle, field, hdefault)
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, new_value)
                break;
            case 1:  // additive
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getHandling(vehicle, field, hdefault) + new_value)
                break;
            case 2:  // multiplicative
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getHandling(vehicle, field, hdefault) * new_value)
                break;
            case 3:  // divide
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getHandling(vehicle, field, hdefault) / new_value)
                break;
        }
        console.log(`${field} is now ${GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)}`)
    }

    ModifyVehicleTopSpeed(vehicle, 1.0)  // ensures that all fields get applied
}
