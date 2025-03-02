import {Vehicle} from '../entity/Vehicle';

class VehicleRegistration {
  private readonly vehicle: Vehicle;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  public getVehicleId(): string {
    return this.vehicle.getVehicleId();
  }

  public getVehicle(): Vehicle {
    return this.vehicle;
  }

  public isValid(existingRegistrations: VehicleRegistration[]): boolean {
    return !existingRegistrations.some(
      registration => registration.getVehicleId() === this.getVehicleId(),
    );
  }
}

export default VehicleRegistration;
