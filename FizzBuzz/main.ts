import {ConsoleDisplayer} from './Displayer';
import {FizzBuzz} from './FizzBuzz';

const fizzBuzz = new FizzBuzz(new ConsoleDisplayer());
fizzBuzz.execute(100);
