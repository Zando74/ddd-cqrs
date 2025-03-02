import {Location} from '../../../Domain/entity/Location';
import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import LocationRepository from '../../../Domain/repository/LocationRepository';

class GetLocationByCoordsQuery {
  public readonly lat: number;
  public readonly lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }
}

class GetLocationByCoordsQueryHandler {
  constructor(private locationRepository: LocationRepository) {}

  public async handle(query: GetLocationByCoordsQuery): Promise<Location> {
    const {lat, lon} = query;

    const location = await this.locationRepository.getByCoordinates(lat, lon);
    if (!location) {
      throw new Error(ErrorMessage.LocationNotFound);
    }

    return location;
  }
}

export {GetLocationByCoordsQuery, GetLocationByCoordsQueryHandler};
