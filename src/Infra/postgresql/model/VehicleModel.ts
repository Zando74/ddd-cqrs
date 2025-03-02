import {Entity, Column, ManyToOne, PrimaryColumn} from 'typeorm';
import {FleetModel} from './FleetModel';
import {LocationModel} from './LocationModel';
import {VehicleType} from '../../../Domain/entity/Vehicle';

@Entity()
export class VehicleModel {
  @PrimaryColumn('varchar')
  id: string;

  @Column({type: 'enum', enum: VehicleType})
  type: VehicleType;

  @ManyToOne(() => FleetModel, fleet => fleet.vehicles, {nullable: true})
  fleet?: FleetModel;

  @ManyToOne(() => LocationModel, {nullable: true})
  location: LocationModel | null;
}
