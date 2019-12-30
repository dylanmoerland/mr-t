class Agent {
    private brain: NeuralNetwork;

    private tyrannosaurus: Tyrannosaurus;

    constructor(brain: NeuralNetwork = new NeuralNetwork(
      null,
      new NeuralNetworkLayer(5, 'sigmoid', [5]),
      new NeuralNetworkLayer(3, 'sigmoid'),
    )) {
      this.brain = brain;
      this.tyrannosaurus = new Tyrannosaurus(runner);
    }

    public dispose() {
      this.brain.dispose();
    }

    public getBrain(): NeuralNetwork {
      return this.brain;
    }

    public isAlive(): boolean {
      return this.tyrannosaurus.isAlive();
    }

    public getScore(): number {
      return this.tyrannosaurus.getScore();
    }

    private makeDecission() {
      const tyrannosaurusDimensions = this.tyrannosaurus.getDimensions();
      const boxPositions = runner.getObstacles().map((box: Box) => box.getDimensions());

      if (boxPositions.length) {
        const outputs = this.brain.predict([
          tyrannosaurusDimensions.x,
          tyrannosaurusDimensions.height,
          boxPositions[0].x,
          boxPositions[0].y,
          boxPositions[0].height,
        ]);
        const action = outputs.indexOf(Math.max(...outputs));

        switch (action) {
        case 0:
          this.tyrannosaurus.run();
          break;
        case 1:
          this.tyrannosaurus.jump();
          break;
        case 2:
          this.tyrannosaurus.duck();
          break;
        default:
          break;
        }
      }
    }

    public update() {
      if (this.tyrannosaurus.isAlive()) {
        this.makeDecission();
        this.tyrannosaurus.update();
      }
    }

    public show() {
      this.tyrannosaurus.show();
    }

    public static FROM_PARENTS(a: Agent, b: Agent) {
      return new Agent(NeuralNetwork.FROM_PARENTS(a.brain, b.brain));
    }
}
