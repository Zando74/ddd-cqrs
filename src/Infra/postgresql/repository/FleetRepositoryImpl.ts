import {Repository} from 'typeorm';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import {FleetModel} from '../model/FleetModel';
import Fleet from '../../../Domain/entity/Fleet';
import {VehicleRepositoryImpl} from './VehicleRepositoryImpl';
import {inject} from 'inversify';
import {TYPES} from '../../config/Types';
import {DatabaseService} from '../Init';
import {Vehicle} from '../../../Domain/entity/Vehicle';

export class FleetRepositoryImpl implements FleetRepository {
  repository: Repository<FleetModel>;

  constructor(@inject(TYPES.DatabaseService) databaseService: DatabaseService) {
    this.repository = databaseService.getRepository(FleetModel);
  }

  public static fromModelToEntity(
    fleetModel: FleetModel | null,
  ): Fleet | undefined {
    if (!fleetModel) {
      return undefined;
    }
    const fleet = new Fleet(fleetModel.id, fleetModel.ownerId);
    fleetModel.vehicles.forEach(vehicleModel => {
      const vehicle = VehicleRepositoryImpl.fromModelToEntity(
        vehicleModel,
      ) as Vehicle;
      fleet.addVehicleToFleet(vehicle);
    });

    return fleet;
  }

  public static fromEntityToModel(fleet: Fleet): FleetModel {
    return {
      id: fleet.getFleetId(),
      ownerId: fleet.getOwnerId(),
      vehicles: fleet
        .getVehiclesRegistred()
        .map(vehicle => VehicleRepositoryImpl.fromEntityToModel(vehicle)),
    };
  }

  public async getById(fleetId: string): Promise<Fleet | undefined> {
    const fleetModel = await this.repository.findOne({
      where: {id: fleetId},
      relations: ['vehicles'],
    });
    return FleetRepositoryImpl.fromModelToEntity(fleetModel);
  }

  public async getByOwnerId(ownerId: string): Promise<Fleet | undefined> {
    const fleetModel = await this.repository.findOne({
      where: {ownerId},
      relations: ['vehicles'],
    });
    return FleetRepositoryImpl.fromModelToEntity(fleetModel);
  }

  public async save(fleet: Fleet): Promise<void> {
    const fleetModel = FleetRepositoryImpl.fromEntityToModel(fleet);
    await this.repository.save(fleetModel);
  }
}
