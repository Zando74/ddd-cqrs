import {Vehicle} from '../../../Domain/entity/Vehicle';
import VehicleRepository from '../../../Domain/repository/VehicleRepository';

class VehicleRepositoryMock implements VehicleRepository {
  private Storage: Vehicle[] = [];

  public getById(vehicleId: string): Promise<Vehicle | undefined> {
    return Promise.resolve(
      this.Storage.find(vehicle => vehicle.getVehicleId() === vehicleId),
    );
  }

  public save(vehicle: Vehicle): Promise<void> {
    this.Storage = this.Storage.filter(
      v => v.getVehicleId() !== vehicle.getVehicleId(),
    );
    this.Storage.push(vehicle);
    return Promise.resolve();
  }

  public delete(vehicleId: string): Promise<void> {
    this.Storage = this.Storage.filter(
      vehicle => vehicle.getVehicleId() !== vehicleId,
    );
    return Promise.resolve();
  }
}

export default VehicleRepositoryMock;
