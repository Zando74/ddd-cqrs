/* eslint-disable n/no-unpublished-import */
import {Before, After, AfterAll} from '@cucumber/cucumber';
import {CucumberWorld} from './Types';
import {ContainerManager} from '../../../Infra/config/ContainerManager';
import {DatabaseService} from '../../../Infra/postgresql/Init';
import {MockedDatabase} from '../mock/MockedDatabase';

Before(
  {tags: 'not @real-infrastructure and not @cli'},
  async function (this: CucumberWorld) {
    this.initDomainWorld();
  },
);

Before(
  {tags: '@real-infrastructure or @cli'},
  async function (this: CucumberWorld) {
    const dataSource = await MockedDatabase.startPostgresql();
    await ContainerManager.initialize(new DatabaseService(dataSource));
    await this.overrideRepositories();
    this.initDomainWorld();
  },
);

After({tags: '@real-infrastructure or @cli'}, async () => {
  await MockedDatabase.resetDB();
});

AfterAll(async () => {
  await MockedDatabase.stopPostgresql();
});
