import {Location, LocationType} from '../../../Domain/entity/Location';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import LocationCoordinate from '../../../Domain/value-object/LocationCoordinate';

class CreateLocationCommand {
  public readonly locationId: string;
  public readonly longitude: number;
  public readonly latitude: number;
  public readonly locationType: LocationType;

  constructor(
    locationId: string,
    longitude: number,
    latitude: number,
    locationType: LocationType,
  ) {
    this.locationId = locationId;
    this.longitude = longitude;
    this.latitude = latitude;
    this.locationType = locationType;
  }
}

class CreateLocationCommandHandler {
  constructor(private locationRepository: LocationRepository) {}

  public async handle(command: CreateLocationCommand): Promise<void> {
    const {locationId, longitude, latitude, locationType} = command;

    const coordinates = new LocationCoordinate(latitude, longitude);

    const location = new Location(locationId, coordinates, locationType);

    await this.locationRepository.save(location);
  }
}

export {CreateLocationCommand, CreateLocationCommandHandler};
