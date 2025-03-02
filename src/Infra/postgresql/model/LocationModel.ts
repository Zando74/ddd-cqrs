import {Entity, Column, PrimaryColumn} from 'typeorm';
import {LocationType} from '../../../Domain/entity/Location';

@Entity()
export class LocationModel {
  @PrimaryColumn('varchar')
  id: string;

  @Column('decimal', {precision: 10, scale: 7, nullable: true})
  latitude: number;

  @Column('decimal', {precision: 10, scale: 7, nullable: true})
  longitude: number;

  @Column('enum', {enum: LocationType, nullable: true})
  type: LocationType;
}
