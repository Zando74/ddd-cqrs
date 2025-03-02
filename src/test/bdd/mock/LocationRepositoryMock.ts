import {Location} from '../../../Domain/entity/Location';
import LocationRepository from '../../../Domain/repository/LocationRepository';

class LocationRepositoryMock implements LocationRepository {
  private Storage: Location[] = [];

  public getById(locationId: string): Promise<Location | undefined> {
    return Promise.resolve(
      this.Storage.find(location => location.getLocationId() === locationId),
    );
  }

  public getByCoordinates(
    lat: number,
    lon: number,
  ): Promise<Location | undefined> {
    return Promise.resolve(
      this.Storage.find(
        location =>
          location.getCoordinates().getLatitude() === lat &&
          location.getCoordinates().getLongitude() === lon,
      ),
    );
  }

  public save(location: Location): Promise<void> {
    this.Storage = this.Storage.filter(
      l => location.getLocationId() !== l.getLocationId(),
    );
    this.Storage.push(location);
    return Promise.resolve();
  }

  public delete(locationId: string): Promise<void> {
    this.Storage = this.Storage.filter(
      location => location.getLocationId() !== locationId,
    );
    return Promise.resolve();
  }
}

export default LocationRepositoryMock;
