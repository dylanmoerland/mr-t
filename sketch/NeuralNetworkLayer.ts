type Activation = 'sigmoid' | 'softmax';

class NeuralNetworkLayer {
    private units: number;

    private activation: Activation;

    private inputShape?: number[];

    constructor(units: number, activation: Activation, inputShape?: number[]) {
      this.units = units;
      this.activation = activation;
      this.inputShape = inputShape;
    }

    public getDenseLayer() {
      return tf.layers.dense({
        units: this.units,
        activation: this.activation,
        ...this.inputShape ? { inputShape: this.inputShape } : {},
      });
    }
}
