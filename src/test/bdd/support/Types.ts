/* eslint-disable n/no-unpublished-import */
import {CreateVehicleCommandHandler} from '../../../App/command/vehicle/CreateVehicle';
import {CreateFleetCommandHandler} from '../../../App/command/fleet/CreateFleet';
import {AddVehicleToFleetCommandHandler} from '../../../App/command/fleet/AddVehicleToFleet';
import {Vehicle} from '../../../Domain/entity/Vehicle';
import Fleet from '../../../Domain/entity/Fleet';
import {CreateLocationCommandHandler} from '../../../App/command/location/CreateLocation';
import {ParkVehicleCommandHandler} from '../../../App/command/vehicle/ParkVehicle';
import {Location} from '../../../Domain/entity/Location';
import {RemoveVehicleFromFleetCommandHandler} from '../../../App/command/fleet/RemoveVehicleFromFleet';
import {UnparkVehicleCommandHandler} from '../../../App/command/vehicle/UnparkVehicle';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';

interface CucumberWorld {
  fleetRepository: FleetRepository;
  vehicleRepository: VehicleRepository;
  locationRepository: LocationRepository;

  createVehicleCommandHandler: CreateVehicleCommandHandler;
  createFleetCommandHandler: CreateFleetCommandHandler;
  createLocationCommandHandler: CreateLocationCommandHandler;

  addVehicleToFleetCommandHandler: AddVehicleToFleetCommandHandler;
  removeVehicleFromFleetCommandHandler: RemoveVehicleFromFleetCommandHandler;

  parkVehicleCommandHandler: ParkVehicleCommandHandler;
  unparkVehicleCommandHandler: UnparkVehicleCommandHandler;

  getVehicle(vehicleId: string): Promise<Vehicle>;
  getFleet(fleetId: string): Promise<Fleet>;
  getLocation(locationId: string): Promise<Location>;
  getLocationByCoordinates(lat: number, lon: number): Promise<Location>;
  overrideRepositories(): Promise<void>;
  initDomainWorld(): void;

  lastErrorCatched: unknown;
  lastMessageReturned: string;
}

export {CucumberWorld};
