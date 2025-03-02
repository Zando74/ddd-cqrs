import {Vehicle} from '../../../Domain/entity/Vehicle';
import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class GetVehicleByIdQuery {
  public readonly vehicleId: string;

  constructor(vehicleId: string) {
    this.vehicleId = vehicleId;
  }
}

class GetVehicleByIdQueryHandler {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async handle(query: GetVehicleByIdQuery): Promise<Vehicle> {
    const {vehicleId} = query;

    const vehicle = await this.vehicleRepository.getById(vehicleId);
    if (!vehicle) {
      throw new Error(ErrorMessage.VehicleNotFound);
    }

    return vehicle;
  }
}

export {GetVehicleByIdQuery, GetVehicleByIdQueryHandler};
