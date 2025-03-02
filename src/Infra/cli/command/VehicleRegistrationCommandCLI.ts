import {Command} from 'commander';
import {VehicleRegistrationHandlerCLI} from '../handler/VehicleRegistrationHandlerCLI';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import {TYPES} from '../../config/Types';
import {inject} from 'inversify';

class VehicleRegistrationCLI {
  private handler: VehicleRegistrationHandlerCLI;

  constructor(
    @inject(TYPES.VehicleRepository) vehicleRepository: VehicleRepository,
    @inject(TYPES.FleetRepository) fleetRepository: FleetRepository,
    @inject(TYPES.LocationRepository) locationRepository: LocationRepository,
  ) {
    this.handler = new VehicleRegistrationHandlerCLI(
      vehicleRepository,
      fleetRepository,
      locationRepository,
    );
  }

  public getCommand() {
    return new Command('register-vehicle')
      .description(
        'Register a vehicle into a fleet, if the vehicle does not exist, it will be created',
      )
      .argument('<fleetId>', 'Fleet id')
      .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
      .action(async (vehicleId: string, fleetId: string) => {
        await this.handler.handle(vehicleId, fleetId);
      });
  }
}

export {VehicleRegistrationCLI};
