import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class ParkVehicleCommand {
  public readonly fleetId: string;
  public readonly vehicleId: string;
  public readonly locationId: string;

  constructor(fleetId: string, vehicleId: string, locationId: string) {
    this.fleetId = fleetId;
    this.vehicleId = vehicleId;
    this.locationId = locationId;
  }
}

class ParkVehicleCommandHandler {
  constructor(
    private vehicleRepository: VehicleRepository,
    private locationRepository: LocationRepository,
    private fleetRepository: FleetRepository,
  ) {}

  public async handle(command: ParkVehicleCommand): Promise<void> {
    const {fleetId, vehicleId, locationId} = command;

    const vehicle = await this.vehicleRepository.getById(vehicleId);
    if (!vehicle) {
      throw new Error(ErrorMessage.VehicleNotFound);
    }

    const fleet = await this.fleetRepository.getById(fleetId);
    if (!fleet) {
      throw new Error(ErrorMessage.FleetNotFound);
    }

    if (!fleet.isInFleet(vehicleId)) {
      throw new Error(ErrorMessage.VehicleNotRegisteredInFleet);
    }

    const location = await this.locationRepository.getById(locationId);
    if (!location) {
      throw new Error(ErrorMessage.LocationNotFound);
    }

    vehicle.park(location);
    await this.vehicleRepository.save(vehicle);
  }
}

export {ParkVehicleCommand, ParkVehicleCommandHandler};
