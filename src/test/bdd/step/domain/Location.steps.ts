// eslint-disable-next-line n/no-unpublished-import
import {Given, Then} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import {TestValue} from '../../constant/TestValue';
import {ErrorMessage} from '../../../../Domain/message/ErrorMessage';
import * as assert from 'assert';
import {CreateLocationCommand} from '../../../../App/command/location/CreateLocation';

Given('a location', async function (this: CucumberWorld) {
  await this.createLocationCommandHandler.handle(
    new CreateLocationCommand(
      TestValue.defaultLocation.locationId,
      TestValue.defaultLocation.longitude,
      TestValue.defaultLocation.latitude,
      TestValue.defaultLocation.locationType,
    ),
  );
});

Given('a airport location', async function (this: CucumberWorld) {
  await this.createLocationCommandHandler.handle(
    new CreateLocationCommand(
      TestValue.defaultLocationOverridedType.locationId,
      TestValue.defaultLocationOverridedType.longitude,
      TestValue.defaultLocationOverridedType.latitude,
      TestValue.defaultLocationOverridedType.locationType,
    ),
  );
});

Then(
  'I should be informed this location is not found',
  function (this: CucumberWorld) {
    assert.strictEqual(this.lastErrorCatched instanceof Error, true);
    assert.strictEqual(
      (this.lastErrorCatched as Error).message,
      ErrorMessage.LocationNotFound,
    );
  },
);
