import {Location} from '../entity/Location';
import {Repository} from './BaseRepository';

interface LocationRepository extends Repository<Location> {
  getByCoordinates(lat: number, lon: number): Promise<Location | undefined>;
}

export default LocationRepository;
