import {randomUUID} from 'crypto';
import {
  CreateLocationCommand,
  CreateLocationCommandHandler,
} from '../../../App/command/location/CreateLocation';
import {
  ParkVehicleCommand,
  ParkVehicleCommandHandler,
} from '../../../App/command/vehicle/ParkVehicle';
import {
  GetLocationByCoordsQuery,
  GetLocationByCoordsQueryHandler,
} from '../../../App/query/location/GetLocationByCoords';
import {
  GetVehicleByIdQuery,
  GetVehicleByIdQueryHandler,
} from '../../../App/query/vehicle/GetVehicleById';
import {LocationType} from '../../../Domain/entity/Location';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';
import {ErrorMessage} from '../../../Domain/message/ErrorMessage';

class LocalizeVehicleHandlerCLI {
  private vehicleGettingHandler: GetVehicleByIdQueryHandler;
  private locationGettingHandler: GetLocationByCoordsQueryHandler;
  private createLocationHandler: CreateLocationCommandHandler;
  private vehicleParkingHandler: ParkVehicleCommandHandler;

  constructor(
    private vehicleRepository: VehicleRepository,
    private locationRepository: LocationRepository,
    private fleetRepository: FleetRepository,
  ) {
    this.vehicleGettingHandler = new GetVehicleByIdQueryHandler(
      this.vehicleRepository,
    );

    this.locationGettingHandler = new GetLocationByCoordsQueryHandler(
      this.locationRepository,
    );

    this.vehicleParkingHandler = new ParkVehicleCommandHandler(
      this.vehicleRepository,
      this.locationRepository,
      this.fleetRepository,
    );

    this.createLocationHandler = new CreateLocationCommandHandler(
      this.locationRepository,
    );
  }

  public async handle(
    fleetId: string,
    vehicleId: string,
    lat: number,
    lon: number,
  ): Promise<void> {
    const vehicle = await this.vehicleGettingHandler.handle(
      new GetVehicleByIdQuery(vehicleId),
    );

    let locationId: string = randomUUID();

    try {
      locationId = (
        await this.locationGettingHandler.handle(
          new GetLocationByCoordsQuery(lat, lon),
        )
      ).getLocationId();
    } catch (e: unknown) {
      if (e instanceof Error && e.message === ErrorMessage.LocationNotFound) {
        await this.createLocationHandler.handle(
          new CreateLocationCommand(locationId, lon, lat, LocationType.Parking),
        );
      }
    }

    await this.vehicleParkingHandler.handle(
      new ParkVehicleCommand(fleetId, vehicle.getVehicleId(), locationId),
    );
  }
}

export {LocalizeVehicleHandlerCLI};
