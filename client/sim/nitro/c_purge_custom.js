const CustomPurge = {
    'z190': purge_z190,
    'z190_after': purge_z190_close
}


function purge_z190(vehicle) {
    const dpos = GetWorldPositionOfEntityBone(vehicle, GetEntityBoneIndexByName(vehicle, 'door_dside_r'));
    const doff = GetOffsetFromEntityGivenWorldCoords(vehicle, dpos[0], dpos[1], dpos[2]);

    const ppos = GetWorldPositionOfEntityBone(vehicle, GetEntityBoneIndexByName(vehicle, 'door_pside_r'));
    const poff = GetOffsetFromEntityGivenWorldCoords(vehicle, ppos[0], ppos[1], ppos[2]);

    const dattached = !IsVehicleDoorDamaged(vehicle, 2);
    const pattached = !IsVehicleDoorDamaged(vehicle, 3);

    if (dattached) { SetVehicleDoorOpen(vehicle, 2, false, false); }
    if (pattached) { SetVehicleDoorOpen(vehicle, 3, false, false); }

    let ptfxs = [];
    for (let i = 0; i < 3; i++) {
        if (dattached) { ptfxs.push(CreateVehiclePurgeSpray(vehicle, doff[0], doff[1], doff[2] + 0.1, 40.0, -35.0, 0.0, 0.5)); }
        if (pattached) { ptfxs.push(CreateVehiclePurgeSpray(vehicle, poff[0], poff[1], poff[2] + 0.1, 40.0, 35.0, 0.0, 0.5)); }
    }
    return ptfxs;
}

function purge_z190_close(vehicle) {
    if (!IsVehicleDoorDamaged(vehicle, 2)) { SetVehicleDoorShut(vehicle, 2, false); }
    if (!IsVehicleDoorDamaged(vehicle, 3)) { SetVehicleDoorShut(vehicle, 3, false); }
}