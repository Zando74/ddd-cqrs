import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class UnparkVehicleCommand {
  public readonly fleetId: string;
  public readonly vehicleId: string;

  constructor(fleetId: string, vehicleId: string) {
    this.fleetId = fleetId;
    this.vehicleId = vehicleId;
  }
}

class UnparkVehicleCommandHandler {
  constructor(
    private vehicleRepository: VehicleRepository,
    private fleetRepository: FleetRepository,
  ) {}

  public async handle(command: UnparkVehicleCommand): Promise<void> {
    const {fleetId, vehicleId} = command;

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

    if (!vehicle.isParked()) {
      throw new Error(ErrorMessage.VehicleNotParked);
    }

    vehicle.unpark();
    await this.vehicleRepository.save(vehicle);
  }
}

export {UnparkVehicleCommand, UnparkVehicleCommandHandler};
