import Fleet from '../entity/Fleet';
import {Repository} from './BaseRepository';

interface FleetRepository extends Repository<Fleet> {
  getByOwnerId(ownerId: string): Promise<Fleet | undefined>;
}

export default FleetRepository;
