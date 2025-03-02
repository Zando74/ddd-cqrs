// eslint-disable-next-line n/no-unpublished-import
import {When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import {MainCommand} from '../../../../Infra/cli/Command';
import {TestValue} from '../../constant/TestValue';

When(
  'I execute localize-vehicle command',
  async function (this: CucumberWorld) {
    this.lastMessageReturned = await MainCommand.start([
      'node',
      'fleet',
      'localize-vehicle',
      TestValue.defaultFleet.fleetId,
      TestValue.defaultVehicle.vehicleId,
      TestValue.defaultLocation.latitude.toString(),
      TestValue.defaultLocation.longitude.toString(),
    ]);
  },
);
