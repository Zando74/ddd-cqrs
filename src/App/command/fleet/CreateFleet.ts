import Fleet from '../../../Domain/entity/Fleet';
import {ErrorMessage} from '../../../Domain/message/ErrorMessage';
import FleetRepository from '../../../Domain/repository/FleetRepository';

class CreateFleetCommand {
  public readonly ownerId: string;
  public readonly fleetId: string;

  constructor(ownerId: string, fleetId: string) {
    this.ownerId = ownerId;
    this.fleetId = fleetId;
  }
}

class CreateFleetCommandHandler {
  constructor(private fleetRepository: FleetRepository) {}

  public async handle(command: CreateFleetCommand): Promise<void> {
    const {ownerId, fleetId} = command;

    const fleet = await this.fleetRepository.getByOwnerId(ownerId);
    if (fleet) {
      throw new Error(ErrorMessage.FleetAlreadyExists);
    }

    await this.fleetRepository.save(new Fleet(fleetId, ownerId));
  }
}

export {CreateFleetCommand, CreateFleetCommandHandler};
