defaultHandling = {}

// This will only consider the default handling in a way the script knows. If you mess with handling, this could break.
function getDefaultHandling(vehicle, field) {
    value = GetVehicleHandlingFloat(vehicle, 'CHandlingData', field)
    vehicleName = GetEntityArchetypeName(vehicle)
    if (!defaultHandling[vehicleName].includes(field)) {
        defaultHandling[vehicleName][field] = value
    }

    return defaultHandling[vehicleName][field]
}

// Let's do this in bulk. Less calls to the ModifyVehicleTopSpeed native
// I want this in twiliCore, but, we have special modifications that have been made to it for this script.
function updateHandlingFields(vehicle, handlingCollection) {
    handlingCollection.forEach((field, value) => {
        SetVehicleHandlingFloat(vehicle, 'CHandlingData', field, getDefaultHandling(vehicle, field) + value)
    })

    ModifyVehicleTopSpeed(vehicle, 1.0)  // ensures that all fields get applied
}
