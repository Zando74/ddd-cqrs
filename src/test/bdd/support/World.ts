/* eslint-disable n/no-unpublished-import */
import {setWorldConstructor, World} from '@cucumber/cucumber';
import FleetRepositoryMock from '../mock/FleetRepositoryMock';
import VehicleRepositoryMock from '../mock/VehicleRepositoryMock';
import LocationRepositoryMock from '../mock/LocationRepositoryMock';
import {CreateVehicleCommandHandler} from '../../../App/command/vehicle/CreateVehicle';
import {CreateFleetCommandHandler} from '../../../App/command/fleet/CreateFleet';
import {AddVehicleToFleetCommandHandler} from '../../../App/command/fleet/AddVehicleToFleet';
import {CucumberWorld} from './Types';
import {CreateLocationCommandHandler} from '../../../App/command/location/CreateLocation';
import {ParkVehicleCommandHandler} from '../../../App/command/vehicle/ParkVehicle';
import {RemoveVehicleFromFleetCommandHandler} from '../../../App/command/fleet/RemoveVehicleFromFleet';
import {UnparkVehicleCommandHandler} from '../../../App/command/vehicle/UnparkVehicle';
import {FleetRepositoryImpl} from '../../../Infra/postgresql/repository/FleetRepositoryImpl';
import {VehicleRepositoryImpl} from '../../../Infra/postgresql/repository/VehicleRepositoryImpl';
import {LocationRepositoryImpl} from '../../../Infra/postgresql/repository/LocationRepositoryImpl';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import {DatabaseService} from '../../../Infra/postgresql/Init';
import {ContainerManager} from '../../../Infra/config/ContainerManager';
import {TYPES} from '../../../Infra/config/Types';
import Fleet from '../../../Domain/entity/Fleet';
import {Location} from '../../../Domain/entity/Location';
import {Vehicle} from '../../../Domain/entity/Vehicle';

class CustomWorldImpl extends World implements CucumberWorld {
  fleetRepository: FleetRepository = new FleetRepositoryMock();
  vehicleRepository: VehicleRepository = new VehicleRepositoryMock();
  locationRepository: LocationRepository = new LocationRepositoryMock();
  createVehicleCommandHandler: CreateVehicleCommandHandler;
  createFleetCommandHandler: CreateFleetCommandHandler;
  createLocationCommandHandler: CreateLocationCommandHandler;

  addVehicleToFleetCommandHandler: AddVehicleToFleetCommandHandler;
  removeVehicleFromFleetCommandHandler: RemoveVehicleFromFleetCommandHandler;

  parkVehicleCommandHandler: ParkVehicleCommandHandler;
  unparkVehicleCommandHandler: UnparkVehicleCommandHandler;

  public initDomainWorld(): void {
    this.createVehicleCommandHandler = new CreateVehicleCommandHandler(
      this.vehicleRepository,
    );
    this.createFleetCommandHandler = new CreateFleetCommandHandler(
      this.fleetRepository,
    );
    this.createLocationCommandHandler = new CreateLocationCommandHandler(
      this.locationRepository,
    );

    this.addVehicleToFleetCommandHandler = new AddVehicleToFleetCommandHandler(
      this.fleetRepository,
      this.vehicleRepository,
    );

    this.removeVehicleFromFleetCommandHandler =
      new RemoveVehicleFromFleetCommandHandler(
        this.fleetRepository,
        this.vehicleRepository,
      );

    this.parkVehicleCommandHandler = new ParkVehicleCommandHandler(
      this.vehicleRepository,
      this.locationRepository,
      this.fleetRepository,
    );

    this.unparkVehicleCommandHandler = new UnparkVehicleCommandHandler(
      this.vehicleRepository,
      this.fleetRepository,
    );
  }

  public async getVehicle(vehicleId: string) {
    return (await this.vehicleRepository.getById(vehicleId)) as Vehicle;
  }

  public async getFleet(fleetId: string): Promise<Fleet> {
    return (await this.fleetRepository.getById(fleetId)) as Fleet;
  }

  public async getLocation(locationId: string) {
    return (await this.locationRepository.getById(locationId)) as Location;
  }

  public async getLocationByCoordinates(lat: number, lon: number) {
    return (await this.locationRepository.getByCoordinates(
      lat,
      lon,
    )) as Location;
  }

  public async overrideRepositories() {
    const databaseService = await ContainerManager.get<DatabaseService>(
      TYPES.DatabaseService,
    );
    this.fleetRepository = new FleetRepositoryImpl(databaseService);
    this.vehicleRepository = new VehicleRepositoryImpl(databaseService);
    this.locationRepository = new LocationRepositoryImpl(databaseService);
  }

  lastErrorCatched: unknown;
  lastMessageReturned: string;
}

setWorldConstructor(CustomWorldImpl);
