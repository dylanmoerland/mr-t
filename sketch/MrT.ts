class MrT {
    private agent: Agent;

    constructor() {
        this.load();
    }

    private async load() {
        const model = await tf.loadLayersModel('../mr-t.json');
        this.agent = new Agent(new NeuralNetwork(
            model,
            new NeuralNetworkLayer(5, 'sigmoid', [5]),
            new NeuralNetworkLayer(3, 'sigmoid'),
        ));
    }

    public isAlive() {
        return this.agent.isAlive();
    }

    public update() {
        if (this.agent) {
            this.agent.update();
        }
    }

    public show() {
        if (this.agent) {
            this.agent.show();
        }
    }
}