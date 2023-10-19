defaultHandling = {}

// This will only consider the default handling in a way the script knows. If you mess with handling, this could break.
function getDefaultHandling(vehicle, field) {
    value = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
    vehicleName = GetEntityArchetypeName(vehicle)
    if (!defaultHandling[vehicleName]) { defaultHandling[vehicleName] = {}; }
    if (!defaultHandling[vehicleName].hasOwnProperty(field)) {
        defaultHandling[vehicleName][field] = value;
    }

    return defaultHandling[vehicleName][field]
}

// Let's do this in bulk. Less calls to the ModifyVehicleTopSpeed native
// I want this in twiliCore, but, we have special modifications that have been made to it for this script.
function updateHandlingFields(vehicle, handlingCollection) {
    // console.log(handlingCollection)
    // handlingCollection.forEach((field, value) => {
    for (const [field, value] of Object.entries(handlingCollection)) {
        switch (value[0]) {
            case 0:  // set
                getDefaultHandling(vehicle, field)
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, value[1])
                break;
            case 1:  // additive
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getDefaultHandling(vehicle, field) + value[1])
                break;
            case 2:  // multiplicative
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getDefaultHandling(vehicle, field) * value[1])
                break;
            case 3:  // divide
                SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getDefaultHandling(vehicle, field) / value[1])
                break;
        }
        console.log(`${field} is now ${GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)}`)
    }

    ModifyVehicleTopSpeed(vehicle, 1.0)  // ensures that all fields get applied
}
