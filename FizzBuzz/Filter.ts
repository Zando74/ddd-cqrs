import {Specification} from './Specification';

type FilterHandler<T> = (n: T) => void;

class Filter<T> {
  private filterSpecs: {
    spec: Specification<T>;
    onMatchHandler: FilterHandler<T>;
  }[];
  private defaultHandler: FilterHandler<T>;

  constructor() {
    this.filterSpecs = [];
    this.defaultHandler = () => {};
  }

  public addSpec(
    spec: Specification<T>,
    onFilterHandler: FilterHandler<T>,
  ): void {
    this.filterSpecs.push({spec: spec, onMatchHandler: onFilterHandler});
  }

  public setDefaultHandler(defaultHandler: FilterHandler<T>): void {
    this.defaultHandler = defaultHandler;
  }

  public executeWithHandlers(collection: T[]): T[] {
    return collection.filter(n => {
      for (let i = 0; i < this.filterSpecs.length; i++) {
        if (this.filterSpecs[i].spec.isSatisfiedBy(n)) {
          this.filterSpecs[i].onMatchHandler(n);
          return true;
        }
      }
      this.defaultHandler(n);
      return false;
    });
  }
}

class FilterBuilder<T> {
  private Filter: Filter<T>;

  constructor() {
    this.Filter = new Filter();
  }

  public addSpec(
    spec: Specification<T>,
    onMatchHandler: FilterHandler<T>,
  ): FilterBuilder<T> {
    this.Filter.addSpec(spec, onMatchHandler);
    return this;
  }

  public addDefaultHandler(defaultHandler: FilterHandler<T>): FilterBuilder<T> {
    this.Filter.setDefaultHandler(defaultHandler);
    return this;
  }

  public build(): Filter<T> {
    return this.Filter;
  }
}

export {Filter, FilterHandler, FilterBuilder};
