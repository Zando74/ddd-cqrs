/* eslint-disable n/no-unpublished-import */
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {DataSource} from 'typeorm';
import {FleetModel} from '../../../Infra/postgresql/model/FleetModel';
import {VehicleModel} from '../../../Infra/postgresql/model/VehicleModel';
import {LocationModel} from '../../../Infra/postgresql/model/LocationModel';
import {DatabaseService} from '../../../Infra/postgresql/Init';

export class MockedDatabase {
  static container: StartedPostgreSqlContainer;
  static databaseService: DatabaseService;

  public static async startPostgresql(): Promise<DataSource> {
    if (!MockedDatabase.container) {
      MockedDatabase.container = await new PostgreSqlContainer().start();
      MockedDatabase.databaseService = new DatabaseService(
        new DataSource({
          type: 'postgres',
          host: MockedDatabase.container.getHost(),
          port: MockedDatabase.container.getPort(),
          username: MockedDatabase.container.getUsername(),
          password: MockedDatabase.container.getPassword(),
          database: MockedDatabase.container.getDatabase(),
          synchronize: true,
          logging: false,
          entities: [FleetModel, VehicleModel, LocationModel],
        }),
      );
      await MockedDatabase.databaseService.initialize();
    }
    return MockedDatabase.databaseService.getDataSource();
  }

  public static async resetDB() {
    await MockedDatabase.databaseService.getDataSource().synchronize(true);
  }

  public static async stopPostgresql() {
    if (MockedDatabase.container) {
      await this.databaseService.destroy();
      await MockedDatabase.container.stop();
    }
  }
}
