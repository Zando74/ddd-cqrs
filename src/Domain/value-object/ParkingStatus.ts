import {Location, LocationType} from '../entity/Location';
import {Vehicle} from '../entity/Vehicle';

enum ParkingRules {
  Boat = LocationType.Seaport,
  Car = LocationType.Parking,
  Plane = LocationType.Airport,
}

class ParkingStatus {
  private readonly isParked: boolean;
  private readonly location?: Location;

  constructor(location?: Location) {
    if (location !== undefined) {
      this.location = location;
      this.isParked = true;
    } else {
      this.location = undefined;
      this.isParked = false;
    }
  }

  public getLocation(): Location | undefined {
    return this.location;
  }

  public canPark(): boolean {
    return !this.isParked;
  }

  public isValid(vehicle: Vehicle): boolean {
    if (this.isParked && this.location) {
      const vehicleType = vehicle.getType();
      const locationType = this.location.getLocationType();
      const parkingRequired: string = ParkingRules[vehicleType];

      if (locationType !== parkingRequired) {
        return false;
      }
    }
    return true;
  }
}

export default ParkingStatus;
