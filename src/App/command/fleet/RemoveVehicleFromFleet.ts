import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class RemoveVehicleFromFleetCommand {
  public readonly vehicleId: string;
  public readonly fleetId: string;

  constructor(vehicleId: string, fleetId: string) {
    this.vehicleId = vehicleId;
    this.fleetId = fleetId;
  }
}

class RemoveVehicleFromFleetCommandHandler {
  constructor(
    private fleetRepository: FleetRepository,
    private vehicleRepository: VehicleRepository,
  ) {}

  public async handle(command: RemoveVehicleFromFleetCommand): Promise<void> {
    const {vehicleId, fleetId} = command;

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

    fleet.removeVehicleFromFleet(vehicleId);
    await this.fleetRepository.save(fleet);
  }
}

export {RemoveVehicleFromFleetCommand, RemoveVehicleFromFleetCommandHandler};
