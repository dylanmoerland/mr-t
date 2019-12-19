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

    private nextGeneration() {
        runner = new Runner();
        const agents = [ ...this.agents ];
        const bestAgents = agents.sort((a: Agent, b: Agent) => b.getScore() - a.getScore()).slice(0, 2);
    

        // Create new agents mutated from the best agents 
        this.agents = new Array(this.size).fill(0).map(() => {
            return Agent.FROM_PARENTS(bestAgents[0], bestAgents[1]);
        });

        // Keep the best agents in the new population
        // bestAgents.forEach((agent: Agent) => {
        //     const layers = agent.getBrain().getLayers();
    
        //     this.agents.push(new Agent(new NeuralNetwork(NeuralNetwork.createModel(layers), ...layers)));
        // });

        // Dispose the current agents
        agents.forEach((agent: Agent) => agent.dispose());

        this.generation++;
        runner.start();
    }

    public dispose() {
        this.agents.forEach((agent: Agent) => agent.dispose());
    }

    public show() {
        this.agents.forEach((agent: Agent) => agent.show());
    }

    public update() {
        if (!this.isAlive()) {
            this.nextGeneration();  
        }
        this.agents.forEach((agent: Agent) => agent.update());
    }
}