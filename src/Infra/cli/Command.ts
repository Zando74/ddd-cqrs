import {Command} from 'commander';
import {FleetCreationCLI} from './command/FleetCreationCommandCLI';
import {VehicleRegistrationCLI} from './command/VehicleRegistrationCommandCLI';
import {ContainerManager} from '../config/ContainerManager';
import {LocalizeVehicleCLI} from './command/LocalizeVehicleCommandCLI';
import {TYPES} from '../config/Types';

class MainCommand {
  static program: Command;

  private static async init(): Promise<void> {
    const fleetCreationCLI = await ContainerManager.get<FleetCreationCLI>(
      TYPES.FleetCreationCLI,
    );

    const vehicleRegistrationCLI =
      await ContainerManager.get<VehicleRegistrationCLI>(
        TYPES.VehicleRegistrationCLI,
      );

    const localizeVehicleCLI = await ContainerManager.get<LocalizeVehicleCLI>(
      TYPES.LocalizeVehicleCLI,
    );

    MainCommand.program = new Command()
      .addCommand(fleetCreationCLI.getCommand())
      .addCommand(vehicleRegistrationCLI.getCommand())
      .addCommand(localizeVehicleCLI.getCommand())
      .showHelpAfterError();
  }

  private static captureOutput(output: {current: string}): () => void {
    const originalWrite = process.stdout.write;

    process.stdout.write = (data: string | Buffer): boolean => {
      output.current += data.toString();
      return true;
    };

    const resetOutput = () => {
      process.stdout.write = originalWrite;
    };

    return resetOutput;
  }

  private static async execute(prompt: string[]): Promise<string> {
    await this.init();

    const output = {current: ''};
    const resetOutput = this.captureOutput(output);

    return MainCommand.program
      .parseAsync(prompt)
      .then(() => {
        resetOutput();
        return output.current;
      })
      .catch(err => {
        resetOutput();
        const errorMessage =
          err instanceof Error ? err.message : 'Unexpected error';
        return errorMessage;
      });
  }

  public static async start(prompt: string[]): Promise<string> {
    return this.execute(prompt);
  }
}

export {MainCommand};
