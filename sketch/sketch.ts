let runner: Runner;
let tyrannosaurus: Tyrannosaurus;
let population: Population;
let isRunning: boolean;
let mrT: Agent = null;
let playerEnabled: boolean;
let speed: number;

function setup() {
    createCanvas(1200, 350);

    runner = new Runner();
    tyrannosaurus = new Tyrannosaurus(runner);
    population = new Population(6);
    mrT = null;
    isRunning = false;
    playerEnabled = false;
    speed = 1.5;
}

async function draw() {
    noStroke();
    background(255);

    runner.update();
    runner.show();
    
    if (!isRunning || playerEnabled) {
        tyrannosaurus.update();
        tyrannosaurus.show();

        if (!tyrannosaurus.isAlive()) {
            runner.stop();
        }
    };

    if (mrT) {
        mrT.update();
        mrT.show();
    }

    if (isRunning && !playerEnabled && !mrT) {
        population.update();
        population.show();
    }
    
}

async function loadMrT() {
    const model = await tf.loadLayersModel('../mr-t.json');
    mrT = new Agent(new NeuralNetwork(
        model,
        new NeuralNetworkLayer(5, 'sigmoid', [5]),
        new NeuralNetworkLayer(3, 'sigmoid'),
    ));
    isRunning = true;
    runner.start();
}


function keyPressed() {
    if (!isRunning) {
        if (keyCode === 38) {
            isRunning = true;
            playerEnabled = true;
            runner.start();
        } else if (keyCode === 67) {
            isRunning = true;
            runner.start();
        } else if (keyCode === 76) {
            loadMrT();
        }
    } else {
        switch (keyCode) {
            case 38:
                this.tyrannosaurus.jump();
                break;
            case 40:
                this.tyrannosaurus.duck();
                break;    
        } 
    }
    if (keyCode === 82) {
        setup();
    }
}

function keyReleased() {
    switch (keyCode) {
        case 40:
            this.tyrannosaurus.run();
            break;    
    }
}
