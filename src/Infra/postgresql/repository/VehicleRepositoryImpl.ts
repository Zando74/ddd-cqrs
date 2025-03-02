import {Repository} from 'typeorm';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';
import {VehicleModel} from '../model/VehicleModel';
import {Vehicle} from '../../../Domain/entity/Vehicle';
import {LocationRepositoryImpl} from './LocationRepositoryImpl';
import {Location} from '../../../Domain/entity/Location';
import VehicleFactory from '../../../Domain/factory/VehicleFactory';
import {inject} from 'inversify';
import {TYPES} from '../../config/Types';
import {DatabaseService} from '../Init';

export class VehicleRepositoryImpl implements VehicleRepository {
  repository: Repository<VehicleModel>;

  constructor(@inject(TYPES.DatabaseService) databaseService: DatabaseService) {
    this.repository = databaseService.getRepository(VehicleModel);
  }

  public static fromModelToEntity(
    vehicleModel: VehicleModel | null,
  ): Vehicle | undefined {
    if (!vehicleModel) {
      return undefined;
    }
    return VehicleFactory.createVehicle({
      vehicleId: vehicleModel.id,
      type: vehicleModel.type,
      parkingLocation: vehicleModel.location
        ? LocationRepositoryImpl.fromModelToEntity(vehicleModel.location)
        : undefined,
    });
  }

  public static fromEntityToModel(vehicle: Vehicle): VehicleModel {
    return {
      id: vehicle.getVehicleId(),
      type: vehicle.getType(),
      location: vehicle.isParked()
        ? LocationRepositoryImpl.fromEntityToModel(
            vehicle.getParkingStatus().getLocation() as Location,
          )
        : null,
    };
  }

  public async getById(vehicleId: string): Promise<Vehicle | undefined> {
    const vehicleModel = await this.repository.findOne({
      where: {id: vehicleId},
      relations: ['location'],
    });
    return VehicleRepositoryImpl.fromModelToEntity(vehicleModel);
  }

  async save(vehicle: Vehicle): Promise<void> {
    const vehicleModel = VehicleRepositoryImpl.fromEntityToModel(vehicle);
    await this.repository.save(vehicleModel);
  }
}
