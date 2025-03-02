import {MainCommand} from './Infra/cli/Command';
import {ContainerManager} from './Infra/config/ContainerManager';
import {DatabaseService} from './Infra/postgresql/Init';

const main = async () => {
  const databaseService = new DatabaseService();
  await databaseService.initialize();
  await ContainerManager.initialize(databaseService);

  console.log((await MainCommand.start(process.argv)) || 'done');

  await databaseService.destroy();
};

void main();
