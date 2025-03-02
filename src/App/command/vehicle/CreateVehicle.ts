import {VehicleType} from '../../../Domain/entity/Vehicle';
import VehicleFactory from '../../../Domain/factory/VehicleFactory';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class CreateVehicleCommand {
  public readonly vehicleId: string;
  public readonly type: VehicleType;

  constructor(vehicleId: string, type: VehicleType) {
    this.vehicleId = vehicleId;
    this.type = type;
  }
}

class CreateVehicleCommandHandler {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async handle(command: CreateVehicleCommand): Promise<void> {
    const {vehicleId, type} = command;

    const vehicle = VehicleFactory.createVehicle({
      vehicleId,
      type,
      parkingLocation: undefined,
    });

    await this.vehicleRepository.save(vehicle);
  }
}

export {CreateVehicleCommand, CreateVehicleCommandHandler};
