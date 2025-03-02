import {Entity, OneToMany, Column, PrimaryColumn} from 'typeorm';
import {VehicleModel} from './VehicleModel';

@Entity()
export class FleetModel {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  ownerId: string;

  @OneToMany(() => VehicleModel, vehicle => vehicle.fleet)
  vehicles: VehicleModel[];
}
