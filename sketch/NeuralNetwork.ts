class NeuralNetwork {
  private model: tf.Sequential;

  private layers: NeuralNetworkLayer[];

  constructor(model?: any, ...layers: NeuralNetworkLayer[]) {
    this.layers = layers;

    if (model) {
      this.model = model;
    } else {
      this.model = NeuralNetwork.createModel(layers);
    }
  }

  public getLayers() {
    return this.layers;
  }

  public predict(inputs: number[]) {
    return tf.tidy(() => {
      const prediction = this.model.predict(tf.tensor2d([inputs])) as tf.Tensor<tf.Rank>;

      return prediction.dataSync();
    });
  }

  public dispose() {
    this.model.dispose();
  }

  private static get MUTATION_RATE() {
    return 0.1;
  }

  public static createModel(layers: NeuralNetworkLayer[]): tf.Sequential {
    const model = tf.sequential();

    layers.forEach((layer: NeuralNetworkLayer) => {
      model.add(layer.getDenseLayer());
    });

    return model;
  }

  public static FROM_PARENTS(a: NeuralNetwork, b: NeuralNetwork) {
    const weightsA = a.model.getWeights();
    const weightsB = a.model.getWeights();

    const newWeights = weightsA.map((weight: tf.Tensor<tf.Rank>, weightIndex: number) => {
      const valuesB = weightsB[weightIndex].dataSync();

      const values = weight.dataSync().map((value: number, valueIndex: number) => {
        if (random(1) < NeuralNetwork.MUTATION_RATE) {
          return value + randomGaussian(0, 1);
        }

        if (Math.random() >= 0.5) {
          return valuesB[valueIndex];
        }

        return value;
      });

      return tf.tensor(values, weight.shape);
    });

    const layers = a.getLayers();
    const model = NeuralNetwork.createModel(layers);

    model.setWeights(newWeights);

    return new NeuralNetwork(model, ...layers);
  }
}
