import {ErrorMessage} from '../message/ErrorMessage';
import VehicleRegistration from '../value-object/VehicleRegistration';
import {Vehicle} from './Vehicle';

class Fleet {
  private readonly fleetId: string;
  private readonly ownerId: string;
  private registrations: VehicleRegistration[] = [];

  constructor(fleetId: string, ownerId: string) {
    this.fleetId = fleetId;
    this.ownerId = ownerId;
  }

  public getFleetId(): string {
    return this.fleetId;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getVehiclesRegistred(): Vehicle[] {
    return this.registrations.map(reg => reg.getVehicle());
  }

  public addVehicleToFleet(vehicle: Vehicle): void {
    const registration = new VehicleRegistration(vehicle);

    if (!registration.isValid(this.registrations)) {
      throw new Error(ErrorMessage.VehicleAlreadyRegisteredInFleet);
    }

    this.registrations.push(registration);
  }

  public removeVehicleFromFleet(vehicleId: string): void {
    this.registrations = this.registrations.filter(
      reg => reg.getVehicleId() !== vehicleId,
    );
  }

  public isInFleet(vehicleId: string): boolean {
    return this.registrations.some(reg => reg.getVehicleId() === vehicleId);
  }
}

export default Fleet;
