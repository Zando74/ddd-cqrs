import {LocationType} from '../../../Domain/entity/Location';
import {VehicleType} from '../../../Domain/entity/Vehicle';

export const TestValue = {
  defaultLocation: {
    locationId: 'location-1',
    latitude: 0,
    longitude: 0,
    locationType: LocationType.Parking,
  },
  defaultLocationOverridedType: {
    locationId: 'location-1',
    latitude: 1,
    longitude: 1,
    locationType: LocationType.Airport,
  },
  defaultVehicle: {
    vehicleId: 'vehicle-1',
    type: VehicleType.Car,
  },
  secondaryVehicle: {
    vehicleId: 'vehicle-2',
    type: VehicleType.Plane,
  },
  defaultFleet: {
    fleetId: 'fleet-1',
    ownerId: 'user-1',
  },
  secondaryFleet: {
    fleetId: 'fleet-2',
    ownerId: 'user-2',
  },
  unexistingId: 'unexisting-id',
};
