// eslint-disable-next-line n/no-unpublished-import
import {Given, Then, When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import * as assert from 'assert';
import {ErrorMessage} from '../../../../Domain/message/ErrorMessage';
import {TestValue} from '../../constant/TestValue';
import {ParkVehicleCommand} from '../../../../App/command/vehicle/ParkVehicle';

Given(
  'my vehicle has been parked into this location',
  async function (this: CucumberWorld) {
    await this.parkVehicleCommandHandler.handle(
      new ParkVehicleCommand(
        TestValue.defaultFleet.fleetId,
        TestValue.defaultVehicle.vehicleId,
        TestValue.defaultLocation.locationId,
      ),
    );
  },
);

When(
  'I park my vehicle at this location',
  async function (this: CucumberWorld) {
    await this.parkVehicleCommandHandler.handle(
      new ParkVehicleCommand(
        TestValue.defaultFleet.fleetId,
        TestValue.defaultVehicle.vehicleId,
        TestValue.defaultLocation.locationId,
      ),
    );
  },
);

When(
  'I try to park my vehicle at this location',
  async function (this: CucumberWorld) {
    try {
      await this.parkVehicleCommandHandler.handle(
        new ParkVehicleCommand(
          TestValue.defaultFleet.fleetId,
          TestValue.defaultVehicle.vehicleId,
          TestValue.defaultLocation.locationId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);

When(
  'I try to park an unexisting vehicle at this location',
  async function (this: CucumberWorld) {
    try {
      await this.parkVehicleCommandHandler.handle(
        new ParkVehicleCommand(
          TestValue.defaultFleet.fleetId,
          TestValue.unexistingId,
          TestValue.defaultLocation.locationId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);

When(
  'I try to park a vehicle with unexisting fleet at this location',
  async function (this: CucumberWorld) {
    try {
      await this.parkVehicleCommandHandler.handle(
        new ParkVehicleCommand(
          TestValue.unexistingId,
          TestValue.defaultVehicle.vehicleId,
          TestValue.defaultLocation.locationId,
        ),
      );
    } catch (e: unknown) {
      this.lastErrorCatched = e;
    }
  },
);

Then(
  'I should be informed that my vehicle is not allowed to park here',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.VehicleNotAllowedToPark,
    );
  },
);
