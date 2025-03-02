interface Displayer {
  display(s: string): void;
}

class ConsoleDisplayer implements Displayer {
  public display(s: string): void {
    console.log(s);
  }
}

export {Displayer, ConsoleDisplayer};
