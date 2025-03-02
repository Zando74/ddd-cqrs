import {
  AddVehicleToFleetCommand,
  AddVehicleToFleetCommandHandler,
} from '../../../App/command/fleet/AddVehicleToFleet';
import {
  CreateVehicleCommand,
  CreateVehicleCommandHandler,
} from '../../../App/command/vehicle/CreateVehicle';
import {
  GetVehicleByIdQuery,
  GetVehicleByIdQueryHandler,
} from '../../../App/query/vehicle/GetVehicleById';
import {VehicleType} from '../../../Domain/entity/Vehicle';
import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class VehicleRegistrationHandlerCLI {
  private vehicleGettingHandler: GetVehicleByIdQueryHandler;
  private vehicleCreationHandler: CreateVehicleCommandHandler;
  private addVehicleToFleetHandler: AddVehicleToFleetCommandHandler;

  constructor(
    private vehicleRepository: VehicleRepository,
    private fleetRepository: FleetRepository,
    private locationRepository: LocationRepository,
  ) {
    this.vehicleGettingHandler = new GetVehicleByIdQueryHandler(
      this.vehicleRepository,
    );

    this.vehicleCreationHandler = new CreateVehicleCommandHandler(
      this.vehicleRepository,
    );

    this.addVehicleToFleetHandler = new AddVehicleToFleetCommandHandler(
      this.fleetRepository,
      this.vehicleRepository,
    );
  }

  public async handle(fleetId: string, vehicleId: string): Promise<void> {
    try {
      await this.vehicleGettingHandler.handle(
        new GetVehicleByIdQuery(vehicleId),
      );
    } catch (e: unknown) {
      if (e instanceof Error && e.message === ErrorMessage.VehicleNotFound) {
        await this.vehicleCreationHandler.handle(
          new CreateVehicleCommand(vehicleId, VehicleType.Car),
        );
      }
    }

    await this.vehicleCreationHandler.handle(
      new CreateVehicleCommand(vehicleId, VehicleType.Car),
    );

    await this.addVehicleToFleetHandler.handle(
      new AddVehicleToFleetCommand(vehicleId, fleetId),
    );
  }
}

export {VehicleRegistrationHandlerCLI};
