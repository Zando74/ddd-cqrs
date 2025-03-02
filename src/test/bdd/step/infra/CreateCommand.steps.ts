/* eslint-disable n/no-extraneous-import */
// eslint-disable-next-line n/no-unpublished-import
import {Then, When} from '@cucumber/cucumber';
import {CucumberWorld} from '../../support/Types';
import {MainCommand} from '../../../../Infra/cli/Command';
import * as assert from 'assert';
import {validate as isValidUUID} from 'uuid';
import {ErrorMessage} from '../../../../Domain/message/ErrorMessage';
import {TestValue} from '../../constant/TestValue';

When('I execute create command', async function (this: CucumberWorld) {
  this.lastMessageReturned = await MainCommand.start([
    'node',
    'fleet',
    'create',
    TestValue.defaultFleet.ownerId,
  ]);
});

Then(
  'I should see the fleetId on the standard output',
  function (this: CucumberWorld) {
    assert.ok(isValidUUID(this.lastMessageReturned));
  },
);

Then(
  'I should see the error message on the standard output',
  function (this: CucumberWorld) {
    assert.strictEqual(
      this.lastMessageReturned,
      ErrorMessage.FleetAlreadyExists,
    );
  },
);
