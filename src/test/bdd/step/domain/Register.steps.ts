// eslint-disable-next-line n/no-unpublished-import
import {Given, Then, When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import * as assert from 'assert';
import {ErrorMessage} from '../../../../Domain/message/ErrorMessage';
import {TestValue} from '../../constant/TestValue';
import {AddVehicleToFleetCommand} from '../../../../App/command/fleet/AddVehicleToFleet';

Given(
  "this vehicle has been registered into the other user's fleet",
  async function (this: CucumberWorld) {
    await this.addVehicleToFleetCommandHandler.handle(
      new AddVehicleToFleetCommand(
        TestValue.defaultVehicle.vehicleId,
        TestValue.secondaryFleet.fleetId,
      ),
    );
  },
);

Given(
  'I have registered this vehicle into my fleet',
  async function (this: CucumberWorld) {
    await this.addVehicleToFleetCommandHandler.handle(
      new AddVehicleToFleetCommand(
        TestValue.defaultVehicle.vehicleId,
        TestValue.defaultFleet.fleetId,
      ),
    );
  },
);

When(
  'I register this vehicle into my fleet',
  async function (this: CucumberWorld) {
    await this.addVehicleToFleetCommandHandler.handle(
      new AddVehicleToFleetCommand(
        TestValue.defaultVehicle.vehicleId,
        TestValue.defaultFleet.fleetId,
      ),
    );
  },
);

When(
  'I try to register this vehicle into my fleet',
  async function (this: CucumberWorld) {
    try {
      await this.addVehicleToFleetCommandHandler.handle(
        new AddVehicleToFleetCommand(
          TestValue.defaultVehicle.vehicleId,
          TestValue.defaultFleet.fleetId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);

Then(
  'I should be informed this this vehicle has already been registered into my fleet',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.VehicleAlreadyRegisteredInFleet,
    );
  },
);
