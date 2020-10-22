class Population {
  private agents: Agent[];

  private generation: number;

  private size: number;

  constructor(size: number) {
    this.agents = new Array(size).fill(0).map(() => new Agent());
    this.generation = 0;
    this.size = size;
  }

  public isAlive() {
    return this.agents.some((agent: Agent) => agent.isAlive());
  }

  private getNumberOfAliveAgents() {
    return this.agents.reduce((accumulator, currentValue) => {
      if (currentValue.isAlive()) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
  }

  private nextGeneration() {
    runner = new Runner(runner.getSpeed());
    const agents = [...this.agents];

    const bestAgents = agents.sort((a: Agent, b: Agent) => b.getScore() - a.getScore()).slice(0, 2);

    // Create new agents mutated from the best agents
    this.agents = new Array(this.size)
      .fill(0)
      .map(() => Agent.FROM_PARENTS(bestAgents[0], bestAgents[1]));

    // Dispose the current agents
    agents.forEach((agent: Agent) => agent.dispose());

    this.generation++;
    runner.start();
  }

  public getGeneration() {
    return this.generation;
  }

  public dispose() {
    this.agents.forEach((agent: Agent) => agent.dispose());
  }

  public show() {
    textSize(12);
    text(`Generation: ${this.generation + 1}`, 50, 12);
    text(`Alive: ${this.getNumberOfAliveAgents()}`, 50, 28);
    this.agents.forEach((agent: Agent) => agent.show());
  }

  public update() {
    if (!this.isAlive()) {
      this.nextGeneration();
    }
    this.agents.forEach((agent: Agent) => agent.update());
  }
}
