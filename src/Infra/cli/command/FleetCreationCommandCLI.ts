import {Command} from 'commander';
import {FleetCreationHandlerCLI} from '../handler/FleetCreationHandlerCLI';
import {TYPES} from '../../config/Types';
import FleetRepository from '../../../Domain/repository/FleetRepository';
import {inject} from 'inversify';

class FleetCreationCLI {
  private handler: FleetCreationHandlerCLI;

  constructor(@inject(TYPES.FleetRepository) fleetRepository: FleetRepository) {
    this.handler = new FleetCreationHandlerCLI(fleetRepository);
  }

  public getCommand() {
    return new Command('create')
      .description('Create a new fleet')
      .argument('<fleetId>', 'Fleet id')
      .action(async (fleetOwnerId: string) => {
        const result = await this.handler.handle(fleetOwnerId);
        process.stdout.write(result);
      });
  }
}

export {FleetCreationCLI};
