// eslint-disable-next-line n/no-unpublished-import
import {Given, Then, When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import * as assert from 'assert';
import {ErrorMessage} from '../../../../Domain/message/ErrorMessage';
import {TestValue} from '../../constant/TestValue';
import {CreateFleetCommand} from '../../../../App/command/fleet/CreateFleet';

Given('my fleet', async function (this: CucumberWorld) {
  await this.createFleetCommandHandler.handle(
    new CreateFleetCommand(
      TestValue.defaultFleet.ownerId,
      TestValue.defaultFleet.fleetId,
    ),
  );
});

Given('the fleet of another user', async function (this: CucumberWorld) {
  await this.createFleetCommandHandler.handle(
    new CreateFleetCommand(
      TestValue.secondaryFleet.ownerId,
      TestValue.secondaryFleet.fleetId,
    ),
  );
});

When('I try to create same fleet', async function (this: CucumberWorld) {
  try {
    await this.createFleetCommandHandler.handle(
      new CreateFleetCommand(
        TestValue.defaultFleet.ownerId,
        TestValue.defaultFleet.fleetId,
      ),
    );
  } catch (e: unknown) {
    this.lastErrorCatched = e;
  }
});

Then(
  'I should be informed this vehicle is not registered into my fleet',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.VehicleNotRegisteredInFleet,
    );
  },
);

Then(
  'this vehicle should be part of my vehicle fleet',
  async function (this: CucumberWorld) {
    const fleet = await this.getFleet(TestValue.defaultFleet.fleetId);

    assert.ok(
      fleet.isInFleet(TestValue.defaultVehicle.vehicleId),
      'Expected vehicle to be in fleet but it was not.',
    );
  },
);

Then(
  'this vehicle should not be part of my vehicle fleet',
  async function (this: CucumberWorld) {
    const fleet = await this.getFleet(TestValue.defaultFleet.fleetId);

    assert.ok(
      !fleet.isInFleet(TestValue.defaultVehicle.vehicleId),
      'Expected vehicle to not be in fleet but it was not.',
    );
  },
);

Then(
  'I should be informed this fleet is not found',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.FleetNotFound,
    );
  },
);

Then(
  'I should be informed this fleet already exists',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.FleetAlreadyExists,
    );
  },
);
