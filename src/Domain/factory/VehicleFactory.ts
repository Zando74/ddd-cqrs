import {Location} from '../entity/Location';
import {Vehicle, VehicleType} from '../entity/Vehicle';
import ParkingStatus from '../value-object/ParkingStatus';

interface VehicleFactoryInput {
  vehicleId: string;
  type: VehicleType;
  parkingLocation?: Location;
}

class VehicleFactory {
  public static createVehicle(input: VehicleFactoryInput): Vehicle {
    const vehicle = new Vehicle(
      input.vehicleId,
      input.type,
      new ParkingStatus(),
    );

    if (input.parkingLocation) {
      vehicle.park(input.parkingLocation);
    }
    return vehicle;
  }
}

export default VehicleFactory;
