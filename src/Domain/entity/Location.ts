import LocationCoordinate from '../value-object/LocationCoordinate';

enum LocationType {
  Parking = 'Parking',
  Airport = 'Airport',
  Seaport = 'Seaport',
}

class Location {
  private readonly locationId: string;
  private coordinates: LocationCoordinate;
  private locationType: LocationType;

  constructor(
    locationId: string,
    coordinates: LocationCoordinate,
    locationType: LocationType,
  ) {
    this.locationId = locationId;
    this.coordinates = coordinates;
    this.locationType = locationType;
  }

  public getLocationId(): string {
    return this.locationId;
  }

  public getCoordinates(): LocationCoordinate {
    return this.coordinates;
  }

  public getLocationType(): LocationType {
    return this.locationType;
  }
}

export {Location, LocationType};
