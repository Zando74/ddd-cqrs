import 'reflect-metadata';
import {Container} from 'inversify';
import {FleetRepositoryImpl} from '../postgresql/repository/FleetRepositoryImpl';
import {VehicleRepositoryImpl} from '../postgresql/repository/VehicleRepositoryImpl';
import {LocationRepositoryImpl} from '../postgresql/repository/LocationRepositoryImpl';
import FleetRepository from '../../Domain/repository/FleetRepository';
import VehicleRepository from '../../Domain/repository/VehicleRepository';
import LocationRepository from '../../Domain/repository/LocationRepository';
import {DatabaseService} from '../postgresql/Init';
import {TYPES} from './Types';
import {FleetCreationCLI} from '../cli/command/FleetCreationCommandCLI';
import {VehicleRegistrationCLI} from '../cli/command/VehicleRegistrationCommandCLI';
import {LocalizeVehicleCLI} from '../cli/command/LocalizeVehicleCommandCLI';

const initializeContainer = async (
  customDatabaseService: DatabaseService,
): Promise<Container> => {
  const container = new Container();

  if (customDatabaseService) {
    container
      .bind<DatabaseService>(TYPES.DatabaseService)
      .toConstantValue(customDatabaseService);
  }

  container
    .bind<FleetRepository>(TYPES.FleetRepository)
    .to(FleetRepositoryImpl);

  container
    .bind<VehicleRepository>(TYPES.VehicleRepository)
    .to(VehicleRepositoryImpl);

  container
    .bind<LocationRepository>(TYPES.LocationRepository)
    .to(LocationRepositoryImpl);

  container.bind<FleetCreationCLI>(TYPES.FleetCreationCLI).to(FleetCreationCLI);
  container
    .bind<VehicleRegistrationCLI>(TYPES.VehicleRegistrationCLI)
    .to(VehicleRegistrationCLI);
  container
    .bind<LocalizeVehicleCLI>(TYPES.LocalizeVehicleCLI)
    .to(LocalizeVehicleCLI);

  return container;
};

class ContainerManager {
  private static container: Container;

  public static async initialize(
    customDatabaseService: DatabaseService,
  ): Promise<void> {
    if (!ContainerManager.container) {
      ContainerManager.container = await initializeContainer(
        customDatabaseService,
      );
    }
  }

  public static async get<T>(serviceID: symbol): Promise<T> {
    return ContainerManager.container.get<T>(serviceID);
  }
}

export {ContainerManager};
