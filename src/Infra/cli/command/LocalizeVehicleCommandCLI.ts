import {Command} from 'commander';
import {LocalizeVehicleHandlerCLI} from '../handler/LocalizeVehicleHandlerCLI';
import {TYPES} from '../../config/Types';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import {inject} from 'inversify';

class LocalizeVehicleCLI {
  private handler: LocalizeVehicleHandlerCLI;

  constructor(
    @inject(TYPES.VehicleRepository) vehicleRepository: VehicleRepository,
    @inject(TYPES.LocationRepository) locationRepository: LocationRepository,
    @inject(TYPES.FleetRepository) fleetRepository: FleetRepository,
  ) {
    this.handler = new LocalizeVehicleHandlerCLI(
      vehicleRepository,
      locationRepository,
      fleetRepository,
    );
  }

  public getCommand() {
    return new Command('localize-vehicle')
      .description(
        'Localize a vehicle you own to a specific location coordinates, if the location does not exist, it will be created',
      )
      .argument('<fleetId>', 'Fleet id')
      .argument('<vehicleId>', 'Vehicle id')
      .argument('<lat>', 'Vehicle latitude')
      .argument('<lon>', 'Vehicle longitude')
      .action(
        async (
          fleetId: string,
          vehicleId: string,
          lat: number,
          lon: number,
        ) => {
          await this.handler.handle(fleetId, vehicleId, lat, lon);
        },
      );
  }
}

export {LocalizeVehicleCLI};
