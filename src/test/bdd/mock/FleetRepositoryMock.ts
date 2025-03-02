import Fleet from '../../../Domain/entity/Fleet';
import FleetRepository from '../../../Domain/repository/FleetRepository';

class FleetRepositoryMock implements FleetRepository {
  private Storage: Fleet[] = [];

  public getById(fleetId: string): Promise<Fleet | undefined> {
    return Promise.resolve(
      this.Storage.find(fleet => fleet.getFleetId() === fleetId),
    );
  }

  public getByOwnerId(ownerId: string): Promise<Fleet | undefined> {
    return Promise.resolve(
      this.Storage.find(fleet => fleet.getOwnerId() === ownerId),
    );
  }

  public save(fleet: Fleet): Promise<void> {
    this.Storage = this.Storage.filter(
      f => f.getFleetId() !== fleet.getFleetId(),
    );
    this.Storage.push(fleet);
    return Promise.resolve();
  }

  public delete(fleetId: string): Promise<void> {
    this.Storage = this.Storage.filter(fleet => fleet.getFleetId() !== fleetId);
    return Promise.resolve();
  }
}

export default FleetRepositoryMock;
