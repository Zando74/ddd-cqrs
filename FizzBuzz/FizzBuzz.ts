import {Displayer} from './Displayer';
import {Filter, FilterBuilder} from './Filter';
import {
  AndSpecification,
  IsDivisibleBy3,
  IsDivisibleBy5,
} from './Specification';

class FizzBuzz {
  private filter: Filter<number>;
  private displayer: Displayer;

  constructor(displayer: Displayer) {
    this.displayer = displayer;
    this.filter = this.initializeFilter();
  }

  private initializeFilter(): Filter<number> {
    const fizzSpec = new IsDivisibleBy3();
    const buzzSpec = new IsDivisibleBy5();
    const fizzBuzzSpec = new AndSpecification(fizzSpec, buzzSpec);

    return new FilterBuilder<number>()
      .addSpec(fizzBuzzSpec, () => this.display('FizzBuzz'))
      .addSpec(fizzSpec, () => this.display('Fizz'))
      .addSpec(buzzSpec, () => this.display('Buzz'))
      .addDefaultHandler(v => this.display(v.toString()))
      .build();
  }

  private display(s: string): void {
    this.displayer.display(s);
  }

  public execute(n: number): void {
    this.filter.executeWithHandlers(Array.from({length: n}, (_, i) => i + 1));
  }
}

export {FizzBuzz};
