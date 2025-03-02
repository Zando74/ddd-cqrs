// eslint-disable-next-line n/no-unpublished-import
import {Given, Then} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import * as assert from 'assert';
import {ErrorMessage} from '../../../../Domain/message/ErrorMessage';
import {Location} from '../../../../Domain/entity/Location';
import {TestValue} from '../../constant/TestValue';
import {CreateVehicleCommand} from '../../../../App/command/vehicle/CreateVehicle';

Given('a vehicle', async function (this: CucumberWorld) {
  await this.createVehicleCommandHandler.handle(
    new CreateVehicleCommand(
      TestValue.defaultVehicle.vehicleId,
      TestValue.defaultVehicle.type,
    ),
  );
});

Given('my vehicle is a car', async function (this: CucumberWorld) {
  await this.createVehicleCommandHandler.handle(
    new CreateVehicleCommand(
      TestValue.defaultVehicle.vehicleId,
      TestValue.defaultVehicle.type,
    ),
  );
});

Then(
  'the known location of my vehicle should verify this location',
  async function (this: CucumberWorld) {
    const vehicle = await this.getVehicle(TestValue.defaultVehicle.vehicleId);
    let existingLocation: Location | undefined = undefined;
    existingLocation = await this.getLocation(
      TestValue.defaultLocation.locationId,
    );

    if (!existingLocation) {
      existingLocation = await this.getLocationByCoordinates(
        TestValue.defaultLocation.latitude,
        TestValue.defaultLocation.longitude,
      );
    }

    assert.strictEqual(
      vehicle.getParkingStatus().getLocation()?.getLocationId(),
      existingLocation?.getLocationId(),
    );
  },
);

Then(
  'I should be informed that my vehicle is already parked at this location',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.VehicleAlreadyParked,
    );
  },
);

Then(
  'I should be informed that my vehicle is not parked',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.VehicleNotParked,
    );
  },
);

Then(
  'my vehicle should be attached to no location',
  async function (this: CucumberWorld) {
    const vehicle = await this.getVehicle(TestValue.defaultVehicle.vehicleId);

    assert.strictEqual(vehicle.isParked(), false);
  },
);

Then(
  'I should be informed this vehicle is not found',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.VehicleNotFound,
    );
  },
);
