// eslint-disable-next-line n/no-unpublished-import
import {When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import {TestValue} from '../../constant/TestValue';
import {RemoveVehicleFromFleetCommand} from '../../../../App/command/fleet/RemoveVehicleFromFleet';

When(
  'I unregister this vehicle from my fleet',
  async function (this: CucumberWorld) {
    await this.removeVehicleFromFleetCommandHandler.handle(
      new RemoveVehicleFromFleetCommand(
        TestValue.defaultVehicle.vehicleId,
        TestValue.defaultFleet.fleetId,
      ),
    );
  },
);

When(
  'I try to unregister this vehicle from my fleet',
  async function (this: CucumberWorld) {
    try {
      await this.removeVehicleFromFleetCommandHandler.handle(
        new RemoveVehicleFromFleetCommand(
          TestValue.defaultVehicle.vehicleId,
          TestValue.defaultFleet.fleetId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);
