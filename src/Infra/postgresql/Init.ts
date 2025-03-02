import {DataSource, ObjectLiteral, ObjectType, Repository} from 'typeorm';
import {FleetModel} from './model/FleetModel';
import {VehicleModel} from './model/VehicleModel';
import {LocationModel} from './model/LocationModel';
import dotenv from 'dotenv';

dotenv.config();

const defaultDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // note: In real life we should use migrations
  logging: false,
  entities: [FleetModel, VehicleModel, LocationModel],
});

export class DatabaseService {
  private dataSource: DataSource;

  constructor(customDataSource: DataSource = defaultDataSource) {
    this.dataSource = customDataSource;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  public async initialize(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
  }
  public async destroy(): Promise<void> {
    await this.dataSource.destroy();
  }

  public getRepository<T extends ObjectLiteral>(
    entity: ObjectType<T>,
  ): Repository<T> {
    return this.dataSource.getRepository(entity);
  }
}
