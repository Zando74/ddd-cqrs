interface Specification<T> {
  isSatisfiedBy(n: T): boolean;
}

class AndSpecification<T> implements Specification<T> {
  private left: Specification<T>;
  private right: Specification<T>;

  constructor(left: Specification<T>, right: Specification<T>) {
    this.left = left;
    this.right = right;
  }

  public isSatisfiedBy(n: T): boolean {
    return this.left.isSatisfiedBy(n) && this.right.isSatisfiedBy(n);
  }
}

class IsDivisibleBy3 implements Specification<number> {
  public isSatisfiedBy(n: number): boolean {
    return n % 3 === 0;
  }
}

class IsDivisibleBy5 implements Specification<number> {
  public isSatisfiedBy(n: number): boolean {
    return n % 5 === 0;
  }
}

export {Specification, IsDivisibleBy3, IsDivisibleBy5, AndSpecification};
