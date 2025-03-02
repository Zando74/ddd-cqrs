// eslint-disable-next-line n/no-unpublished-import
import {When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import {TestValue} from '../../constant/TestValue';
import {UnparkVehicleCommand} from '../../../../App/command/vehicle/UnparkVehicle';

When('I unpark my vehicle', async function (this: CucumberWorld) {
  await this.unparkVehicleCommandHandler.handle(
    new UnparkVehicleCommand(
      TestValue.defaultFleet.fleetId,
      TestValue.defaultVehicle.vehicleId,
    ),
  );
});

When('I try to unpark my vehicle', async function (this: CucumberWorld) {
  try {
    await this.unparkVehicleCommandHandler.handle(
      new UnparkVehicleCommand(
        TestValue.defaultFleet.fleetId,
        TestValue.defaultVehicle.vehicleId,
      ),
    );
  } catch (e: unknown) {
    this.lastErrorCatched = e;
  }
});

When(
  'I try to unpark an unexisting vehicle',
  async function (this: CucumberWorld) {
    try {
      await this.unparkVehicleCommandHandler.handle(
        new UnparkVehicleCommand(
          TestValue.defaultFleet.fleetId,
          TestValue.unexistingId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);

When(
  'I try to unpark a vehicle with unexisting fleet',
  async function (this: CucumberWorld) {
    try {
      await this.unparkVehicleCommandHandler.handle(
        new UnparkVehicleCommand(
          TestValue.unexistingId,
          TestValue.defaultVehicle.vehicleId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);
