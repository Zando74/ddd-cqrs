import {Repository} from 'typeorm';
import LocationRepository from '../../../Domain/repository/LocationRepository';
import {Location} from '../../../Domain/entity/Location';
import {LocationModel} from '../model/LocationModel';
import LocationCoordinate from '../../../Domain/value-object/LocationCoordinate';
import {inject} from 'inversify';
import {TYPES} from '../../config/Types';
import {DatabaseService} from '../Init';

export class LocationRepositoryImpl implements LocationRepository {
  repository: Repository<LocationModel>;

  constructor(@inject(TYPES.DatabaseService) databaseService: DatabaseService) {
    this.repository = databaseService.getRepository(LocationModel);
  }

  public static fromModelToEntity(
    locationModel: LocationModel | null,
  ): Location | undefined {
    if (!locationModel) {
      return undefined;
    }
    return new Location(
      locationModel.id,
      new LocationCoordinate(locationModel.latitude, locationModel.longitude),
      locationModel.type,
    );
  }

  public static fromEntityToModel(location: Location): LocationModel {
    return {
      id: location.getLocationId(),
      latitude: location.getCoordinates().getLatitude(),
      longitude: location.getCoordinates().getLongitude(),
      type: location.getLocationType(),
    };
  }

  public async getById(locationId: string): Promise<Location | undefined> {
    const locationModel = await this.repository.findOne({
      where: {id: locationId},
    });
    return LocationRepositoryImpl.fromModelToEntity(locationModel);
  }

  public async getByCoordinates(
    lat: number,
    lon: number,
  ): Promise<Location | undefined> {
    const locationModel = await this.repository.findOne({
      where: {
        latitude: lat,
        longitude: lon,
      },
    });
    return LocationRepositoryImpl.fromModelToEntity(locationModel);
  }

  public async save(location: Location): Promise<void> {
    const locationModel = LocationRepositoryImpl.fromEntityToModel(location);
    await this.repository.save(locationModel);
  }
}
