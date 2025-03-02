import {ErrorMessage} from '../message/ErrorMessage';
import ParkingStatus from '../value-object/ParkingStatus';
import {Location} from './Location';

enum VehicleType {
  Car = 'Car',
  Boat = 'Boat',
  Plane = 'Plane',
}

class Vehicle {
  private readonly vehicleId: string;
  private type: VehicleType;
  private parkingStatus: ParkingStatus;

  constructor(
    vehicleId: string,
    type: VehicleType,
    parkingStatus: ParkingStatus,
  ) {
    this.vehicleId = vehicleId;
    this.type = type;
    this.parkingStatus = parkingStatus;
  }

  public getVehicleId(): string {
    return this.vehicleId;
  }

  public getType(): VehicleType {
    return this.type;
  }

  public getParkingStatus(): ParkingStatus {
    return this.parkingStatus;
  }

  public isParked(): boolean {
    return !this.parkingStatus.canPark();
  }

  public park(location: Location): void {
    if (!this.parkingStatus.canPark()) {
      throw new Error(ErrorMessage.VehicleAlreadyParked);
    }
    this.parkingStatus = new ParkingStatus(location);
    if (!this.parkingStatus.isValid(this)) {
      throw new Error(ErrorMessage.VehicleNotAllowedToPark);
    }
  }

  public unpark(): void {
    this.parkingStatus = new ParkingStatus();
  }
}

export {Vehicle, VehicleType};
