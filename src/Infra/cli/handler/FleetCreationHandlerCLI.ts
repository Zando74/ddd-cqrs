import {randomUUID} from 'crypto';
import {
  CreateFleetCommand,
  CreateFleetCommandHandler,
} from '../../../App/command/fleet/CreateFleet';
import FleetRepository from '../../../Domain/repository/FleetRepository';

class FleetCreationHandlerCLI {
  private handler: CreateFleetCommandHandler;

  constructor(private fleetRepository: FleetRepository) {
    this.handler = new CreateFleetCommandHandler(this.fleetRepository);
  }

  public async handle(ownerId: string): Promise<string> {
    const fleetId = randomUUID();
    await this.handler.handle(new CreateFleetCommand(ownerId, fleetId));
    return fleetId;
  }
}

export {FleetCreationHandlerCLI};
