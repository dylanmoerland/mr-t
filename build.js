var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Agent = (function () {
    function Agent(brain) {
        if (brain === void 0) { brain = new NeuralNetwork(null, new NeuralNetworkLayer(5, 'sigmoid', [5]), new NeuralNetworkLayer(3, 'sigmoid')); }
        this.brain = brain;
        this.tyrannosaurus = new Tyrannosaurus(runner);
    }
    Agent.prototype.dispose = function () {
        this.brain.dispose();
    };
    Agent.prototype.getBrain = function () {
        return this.brain;
    };
    Agent.prototype.isAlive = function () {
        return this.tyrannosaurus.isAlive();
    };
    Agent.prototype.getScore = function () {
        return this.tyrannosaurus.getScore();
    };
    Agent.prototype.makeDecission = function () {
        var tyrannosaurusDimensions = this.tyrannosaurus.getDimensions();
        var boxPositions = runner.getObstacles().map(function (box) { return box.getDimensions(); });
        if (boxPositions.length) {
            var outputs = this.brain.predict([
                tyrannosaurusDimensions.x,
                tyrannosaurusDimensions.height,
                boxPositions[0].x,
                boxPositions[0].y,
                boxPositions[0].height,
            ]);
            var action = outputs.indexOf(Math.max.apply(Math, __spread(outputs)));
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
    };
    Agent.prototype.update = function () {
        if (this.tyrannosaurus.isAlive()) {
            this.makeDecission();
            this.tyrannosaurus.update();
        }
    };
    Agent.prototype.show = function () {
        this.tyrannosaurus.show();
    };
    Agent.FROM_PARENTS = function (a, b) {
        return new Agent(NeuralNetwork.FROM_PARENTS(a.brain, b.brain));
    };
    Agent.CLONE = function (a) {
        return new Agent(NeuralNetwork.CLONE(a.brain));
    };
    return Agent;
}());
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MrT = (function () {
    function MrT() {
        this.load();
    }
    MrT.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, tf.loadLayersModel('/mr-t/mr-t.json')];
                    case 1:
                        model = _a.sent();
                        this.agent = new Agent(new NeuralNetwork(model, new NeuralNetworkLayer(5, 'sigmoid', [5]), new NeuralNetworkLayer(3, 'sigmoid')));
                        return [2];
                }
            });
        });
    };
    MrT.prototype.isAlive = function () {
        return this.agent.isAlive();
    };
    MrT.prototype.update = function () {
        if (this.agent) {
            this.agent.update();
        }
    };
    MrT.prototype.show = function () {
        if (this.agent) {
            this.agent.show();
        }
    };
    return MrT;
}());
var NeuralNetwork = (function () {
    function NeuralNetwork(model) {
        var layers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            layers[_i - 1] = arguments[_i];
        }
        this.layers = layers;
        if (model) {
            this.model = model;
        }
        else {
            this.model = NeuralNetwork.createModel(layers);
        }
    }
    NeuralNetwork.prototype.getLayers = function () {
        return this.layers;
    };
    NeuralNetwork.prototype.predict = function (inputs) {
        var _this = this;
        return tf.tidy(function () {
            var prediction = _this.model.predict(tf.tensor2d([inputs]));
            return prediction.dataSync();
        });
    };
    NeuralNetwork.prototype.dispose = function () {
        this.model.dispose();
    };
    Object.defineProperty(NeuralNetwork, "MUTATION_RATE", {
        get: function () {
            return 0.1;
        },
        enumerable: true,
        configurable: true
    });
    NeuralNetwork.createModel = function (layers) {
        var model = tf.sequential();
        layers.forEach(function (layer) {
            model.add(layer.getDenseLayer());
        });
        return model;
    };
    NeuralNetwork.FROM_PARENTS = function (a, b) {
        var weightsA = a.model.getWeights();
        var weightsB = b.model.getWeights();
        var newWeights = weightsA.map(function (weight, weightIndex) {
            var valuesB = weightsB[weightIndex].dataSync();
            var values = weight.dataSync().map(function (value, valueIndex) {
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
        var layers = a.getLayers();
        var model = NeuralNetwork.createModel(layers);
        model.setWeights(newWeights);
        return new (NeuralNetwork.bind.apply(NeuralNetwork, __spread([void 0, model], layers)))();
    };
    NeuralNetwork.CLONE = function (a) {
        var layers = a.getLayers();
        var model = NeuralNetwork.createModel(layers);
        model.setWeights(a.model.getWeights());
        return new (NeuralNetwork.bind.apply(NeuralNetwork, __spread([void 0, model], layers)))();
    };
    return NeuralNetwork;
}());
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var NeuralNetworkLayer = (function () {
    function NeuralNetworkLayer(units, activation, inputShape) {
        this.units = units;
        this.activation = activation;
        this.inputShape = inputShape;
    }
    NeuralNetworkLayer.prototype.getDenseLayer = function () {
        return tf.layers.dense(__assign({ units: this.units, activation: this.activation }, this.inputShape ? { inputShape: this.inputShape } : {}));
    };
    return NeuralNetworkLayer;
}());
var Population = (function () {
    function Population(size) {
        this.agents = new Array(size).fill(0).map(function () { return new Agent(); });
        this.generation = 0;
        this.size = size;
    }
    Population.prototype.isAlive = function () {
        return this.agents.some(function (agent) { return agent.isAlive(); });
    };
    Population.prototype.getNumberOfAliveAgents = function () {
        return this.agents.reduce(function (accumulator, currentValue) {
            if (currentValue.isAlive()) {
                return accumulator + 1;
            }
            return accumulator;
        }, 0);
    };
    Population.prototype.nextGeneration = function () {
        runner = new Runner(runner.getSpeed());
        var agents = __spread(this.agents);
        var bestAgents = agents.sort(function (a, b) { return b.getScore() - a.getScore(); }).slice(0, 2);
        this.agents = new Array(this.size - 2)
            .fill(0)
            .map(function () { return Agent.FROM_PARENTS(bestAgents[0], bestAgents[1]); });
        this.agents.push(Agent.CLONE(bestAgents[0]));
        this.agents.push(Agent.CLONE(bestAgents[1]));
        agents.forEach(function (agent) { return agent.dispose(); });
        this.generation++;
        runner.start();
    };
    Population.prototype.getGeneration = function () {
        return this.generation;
    };
    Population.prototype.dispose = function () {
        this.agents.forEach(function (agent) { return agent.dispose(); });
    };
    Population.prototype.show = function () {
        textSize(12);
        text("Generation: " + (this.generation + 1), 50, 12);
        text("Alive: " + this.getNumberOfAliveAgents(), 50, 28);
        this.agents.forEach(function (agent) { return agent.show(); });
    };
    Population.prototype.update = function () {
        if (!this.isAlive()) {
            this.nextGeneration();
        }
        this.agents.forEach(function (agent) { return agent.update(); });
    };
    return Population;
}());
var runner;
var target;
var placeholder;
function setup() {
    createCanvas(1200, 350);
    runner = new Runner(1.5);
    placeholder = new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAv0AAABeAgMAAADNv0PuAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA////U1NT9/f3LGVtlQAAAAR0Uk5TAP///7MtQIgAAAJaSURBVHic7dpNUsQgEAXg3mTj6bLpTe7HhktqgPDfIbECcQofC8t6jt39aZExRKK4OCx6IR2wAADg2WLWx+IXUiKfAgDAxwC0FjqNSimmAMRG/Iuh5NeepCwBfArAeMCmJIBPAbga9XkKwF8DXtvEANxP8U4MAAAAAPCZgPL8o1cKAAAfC/C98tOPUWkNeDg+AAA8nt/VXTjZgeNSCvOmwzcP3vcKKwCvA5bwTGQVANkTk0kAzJv2jWhg6gFf2QZm92XOpg6fbsoQlmRqAIYDwrfpffgKkFyYeQqATqPj7WZUSm7omB6A/MUqB9iPIdEAvAEI07rPC0BWdAZAGnFoPyQlO3McPwLKpbYakwwOAABdAelXmIWS3VLKU3KLJYGHsCgAAIBhAJK2VbdUBrQEav/T+lwAAADPAUUn32hUmgt82BAocy9zKpgPEPqMSjNACP83IOsUG41KU0EMRYGyN/AryQJ3ew8AAB0ASSf52VzfNLmdSVcmCHcxyh3s5oLw0vAMBQAAngGoCoamXkD5WhKBCufr/tlGKojn66NH/Z8Ae55+BtivrJpnBJjv5ap9I+Wwv2LKNyu4060asPlz3E3VD1Zj16oaAH0ACx+Addl0JUi61uUmAJhf0L4zNN9PuXj8fAhuVXDD1wBzoGvuX04A5gSC658SAJ0Adm4HKGuHSlRcPacCMEmjyul3XcDWvlvBzV6/kZkL6EpnAH/zAsBwgLjE96+pAHazFZ0aaaPMdYVjE9f/7rfYTXyvNAAA9AXwcZdwN22Uua5wusQL6GXXi1EBAKDd9QdkEiKKVx42AAAAAABJRU5ErkJggg==', {
        frames: [88, 0],
        frameRate: 12,
        frameWidth: 88,
        frameHeight: 94,
    });
    target = null;
}
function draw() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            noStroke();
            background(255);
            runner.show();
            if (target) {
                runner.update();
                target.update();
                target.show();
                if ((target instanceof Tyrannosaurus || target instanceof MrT) && !target.isAlive()) {
                    runner.stop();
                }
            }
            else {
                placeholder.update(50, height - 94);
                placeholder.show();
            }
            return [2];
        });
    });
}
function keyPressed() {
    if (!target) {
        switch (keyCode) {
            case 38:
                target = new Tyrannosaurus(runner);
                target.run();
                runner.start();
                break;
            case 67:
                target = new Population(12);
                runner.start();
                break;
            case 76:
                target = new MrT();
                runner.start();
                break;
            default:
                break;
        }
    }
    else if (target instanceof Tyrannosaurus) {
        switch (keyCode) {
            case 38:
                target.jump();
                break;
            case 40:
                target.duck();
                break;
            default:
                break;
        }
    }
    if (keyCode === 82) {
        setup();
    }
}
function keyReleased() {
    if (target instanceof Tyrannosaurus && keyCode === 40) {
        target.run();
    }
}
var Box = (function () {
    function Box(runner, sprite, minimumGap, speed) {
        this.speed = speed;
        this.sprite = sprite;
        this.x = width;
        this.runner = runner;
        this.setGap(speed, minimumGap);
    }
    Box.prototype.getGap = function () {
        return this.gap;
    };
    Box.prototype.getSpeed = function () {
        return this.speed;
    };
    Box.prototype.isVisible = function () {
        return this.x + this.getWidth() > 0;
    };
    Box.prototype.getWidth = function () {
        return this.sprite.getFrameData().frameWidth;
    };
    Box.prototype.getDimensions = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.sprite.getFrameData().frameWidth - 15,
            height: this.sprite.getFrameData().frameHeight - 10,
        };
    };
    Box.prototype.checkCollision = function (tyrannosaurus) {
        var rect1 = tyrannosaurus.getDimensions();
        var rect2 = this.getDimensions();
        if (rect1.x < rect2.x + rect2.width
            && rect1.x + rect1.width > rect2.x
            && rect1.y < rect2.y + rect2.height
            && rect1.y + rect1.height > rect2.y) {
            return true;
        }
        return false;
    };
    Box.prototype.setGap = function (speed, minimumGap) {
        var minGap = Math.round(((width * speed) / 24) + minimumGap);
        var maxGap = Math.round(minGap * 1.5);
        this.gap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
    };
    Box.prototype.getPosition = function () {
        return {
            x: this.x,
            y: this.y,
        };
    };
    Box.prototype.move = function () {
        this.x -= this.speed * this.runner.getSpeed();
    };
    Box.prototype.update = function () {
        this.move();
        this.sprite.update(this.x, this.y);
    };
    Box.prototype.show = function () {
        this.sprite.show();
    };
    return Box;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cactus = (function (_super) {
    __extends(Cactus, _super);
    function Cactus(runner) {
        var _this = _super.call(this, runner, new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfsAAABkAgMAAAD8onFjAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA//////f3U1NTwLTgpAAAAAR0Uk5TAP///7MtQIgAAAOWSURBVHic7ZrhkasgEICRGpKxBUeaMK+Gy6SamzBWc2N6iE2YHpy8GnI8YBdcjRrP+xF4CT8yuEv4dhZYF5Cx55dkX0Bl+7FUwBivKul7yKsv9lDRK1TxbH6qGqAcb8VCAWNCqdYja/XtmZMKWnqKJ/OTo4JeUwWYxwLbQdeDRnrmpCKnI0EVwfM3KEiKX/B5TUciOP4GcUnBtru+IPncAT9tsMUaPp2W4fF3nwXg0iY5XvqCVF0sXy++gxVMY3gl4+QfzLzSuIth3IYCyr9ACBrHCNUu4OuVGCF/85hvomo5x89g6L5lQPwN8m10ofxOABNy92s+P0ushcOH6HKAhdbjd4KLFVx+zRf2ISx+Ouzd8Ylgks8h1YLectnxe4r/ly9c2DGTq76Wnk8V2rAJvklJYuS714zhSRdNBTyXdwpet+N8m5IEyNdlnu9eM8DDaDrkU4Uc5duQHCH/D8Wcut76fKqIia/D8cvxFfG8eet2OKzir1rLz2Xg/NsOcQ1L9kfKb/wIHVbzy9pUr6dw+Q1kl7DPpANixuOCCZmVqxX8k31UKlT+bV9gdm3OlxIyIFrg+WwLA8JX83ViIoPjg9fBue78QTlvN4zwbWP9+p3jV3P8lomWwUwMhQ/OLqDv7vxlX3gBtPAbsg82x7dlgn81aQu8lFUwfPSp87rjU0FK+Q2b5ruuJ/htt/cMiG/DrUmpzerqnb85AcadBXxeL+Bjo1D4y85f/Ryd5TMxz88MPxNR8hu2gA++neLzs07KyzMu06j4N3sD0/FtmK0AY6Op/jFpZk4VQ75Q11pX2rw6RccnAreAnBN93TShq8sbNuDDxhwtjprfRVOFp04uBElqmBjjO4uj47Ou65YYA+dJ+Nyy3CuMLaN8sDg+vmfixtKUK966YgSSxMoWq3d8PAGNju/cZ++QvcOZ5/cUxjCoDtcfWhwhn1c2zML/MZpSPiiIk8UIf/H9Z3j8ZfePvDPMDkCgfLbdw1cVyR4/s3gs+PH9a34ff4Lhryk/5cP9Uy82vR4flyF7Wb7NXOXr8nVSArpX5fM3/81/89/8/4OfEQyXs4oRPpdsdXkyPzO76+/Sfk/ES5tmi3aoQIxwO5AhX6wfgSfz+blW3s3ir/Le7CnQMK3I+vxOESlfu7mq3HfmvDT1r3sFGmasgls3OH8mimj50D/pgeOMowowzCgyu2WXupH9CrtTRM3vzZ9siYLW4eEfqRohRz5o9gUAAAAASUVORK5CYII=', {
            frames: [-3],
            frameRate: 6,
            frameHeight: 78,
            frameWidth: 74,
        }), 120, 8) || this;
        _this.y = height - _this.sprite.getFrameData().frameHeight;
        return _this;
    }
    return Cactus;
}(Box));
var Plain = (function () {
    function Plain() {
        var _this = this;
        this.pieces = [];
        this.image = loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACUIAAAAaAQMAAABCCia0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAAU1NTqGkn/wAAAAJ0Uk5TAP9bkSK1AAABFklEQVR4nO2UTQ6DIBBGx7BwY+IN2it4ABNu1vRoHKVHYOnC1GqVioKB2IkMhLfAhN83XxCAOBk63P34e23TIiflCRM33A1l+fy1SZGT8oUDbk21KF6qTYuclC8SCtQnvQV4qDYtQiQ1RIkAuI+fDqsACVCq9uhElIMuJ0RSUcPH0l6BHeIgJ+XL9K+EdoiDcEnV4qBfGl3csdXJCiwnkbSi6ETHils8pq7WskL1Vcu3Maes9t/BfjO4K0QfFHITCUUrik5Urc5ROTs0bAXO8//2cEgQsKLodJGV0Jbrl1+/ucx8RJtpgesl3cCONVgUVhSdKFn16yVkvTHH8ji6sV3dcW8zhWVoN53NJsSsclL+SWUyyHwAjcS+04Z49b0AAAAASUVORK5CYII=', function () { return _this.createInitialPieces(); });
    }
    Plain.prototype.createInitialPieces = function () {
        this.pieces = new Array(width / Plain.PARTIAL_SIZE).fill(0).map(function (_, index) { return index; });
    };
    Plain.prototype.update = function () {
        var _this = this;
        if (this.pieces.length) {
            this.pieces = this.pieces.map(function (piece) {
                if (piece * Plain.PARTIAL_SIZE < _this.image.width - (Plain.PARTIAL_SIZE * 2)) {
                    return piece + 1;
                }
                return 0;
            });
        }
    };
    Plain.prototype.show = function () {
        var _this = this;
        this.pieces.forEach(function (peace, index) {
            image(_this.image, Plain.PARTIAL_SIZE * index, height - 20, Plain.PARTIAL_SIZE, 20, Plain.PARTIAL_SIZE * peace, 0, Plain.PARTIAL_SIZE, 20);
        });
    };
    Object.defineProperty(Plain, "PARTIAL_SIZE", {
        get: function () {
            return 12;
        },
        enumerable: true,
        configurable: true
    });
    return Plain;
}());
var Pterodactyl = (function (_super) {
    __extends(Pterodactyl, _super);
    function Pterodactyl(runner) {
        var _this = _super.call(this, runner, new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAABPAgMAAAA7A9dGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAlQTFRFAAAA////U1NTfsgdQQAAAAN0Uk5TAP//RFDWIQAAAKhJREFUeJzdl8sNgCAQRGli+6GJbYJqvNAEVSoCymcx7onRvZC8eSGZGAwYs3LIflYn5zU+mB40/gqdWNyCmF0QfCR90j9iyUfSSayfcNS7EEmPWP4YEQ8hkp7wUeoc2+O8DBxBz7hM4RMMpqeKV1oqk4Qtlq5qvEHqdeDlTjWG1aWj/ISB9KbSHbQYT/fNGSgJd38sSF1xMULT0W+MP9Whng0q/d2DageBX64Eh9WfGgAAAABJRU5ErkJggg==', {
            frames: [-3, 89],
            frameRate: 6,
            frameHeight: 78,
            frameWidth: 90,
        }), 150, 10) || this;
        var random = Math.random();
        if (random < 0.33) {
            _this.y = height - 78 - 25;
        }
        else if (random < 0.66) {
            _this.y = height - 78 - 75;
        }
        else {
            _this.y = height - 78 - 125;
        }
        return _this;
    }
    return Pterodactyl;
}(Box));
var Runner = (function () {
    function Runner(speed) {
        this.running = false;
        this.obstacles = [];
        this.plain = new Plain();
        this.sky = new Sky();
        this.score = 0;
        this.speed = speed;
    }
    Runner.prototype.getSpeed = function () {
        return this.speed;
    };
    Runner.prototype.getObstacles = function () {
        return this.obstacles;
    };
    Runner.prototype.isRunning = function () {
        return this.running;
    };
    Runner.prototype.addObstacle = function () {
        if (Math.random() < 0.33) {
            this.obstacles.push(new Pterodactyl(this));
        }
        else {
            this.obstacles.push(new Cactus(this));
        }
    };
    Runner.prototype.start = function () {
        this.running = true;
    };
    Runner.prototype.stop = function () {
        this.running = false;
    };
    Runner.prototype.update = function () {
        if (this.isRunning()) {
            if (this.obstacles.length) {
                var lastObstacle = this.obstacles[this.obstacles.length - 1];
                if (lastObstacle.isVisible()
                    && lastObstacle.getPosition().x + lastObstacle.getWidth() + lastObstacle.getGap() < width) {
                    this.addObstacle();
                }
            }
            else {
                this.addObstacle();
            }
            this.obstacles = this.obstacles
                .filter(function (obstacle) { return obstacle.getPosition().x + obstacle.getWidth() > 0; });
            this.obstacles.forEach(function (obstacle) {
                obstacle.update();
            });
            this.plain.update();
            this.sky.update();
            this.score++;
        }
    };
    Runner.prototype.show = function () {
        textSize(32);
        fill(55);
        text(Math.floor(this.score / 10), width - 100, 32);
        this.sky.show();
        this.plain.show();
        this.obstacles.forEach(function (obstacle) {
            obstacle.show();
        });
    };
    return Runner;
}());
var Sky = (function () {
    function Sky() {
        this.clouds = [];
        this.image = loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAbAQMAAADLfHrPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA2traOKgfdgAAAAJ0Uk5TAP9bkSK1AAAAW0lEQVR4nHXOSwrAMAgE0IFsA14lBxB6dY/kAQK2pPlp01n5FjoCLZdgZYdpPSMJ8g5a6/BIEyWi/oLsnUkD8jjBCOgnyPSL9iuPAgeS1ngAAlinioc+RT3qcAPJATKbraHO9AAAAABJRU5ErkJggg==');
    }
    Sky.prototype.update = function () {
        var _this = this;
        if (Math.random() < 0.0025) {
            this.clouds.push({
                x: width,
                y: Math.floor(Math.random() * (250 - 1)),
            });
        }
        this.clouds = this.clouds
            .map(function (cloud) { return (__assign(__assign({}, cloud), { x: cloud.x - Sky.SPEED })); })
            .filter(function (cloud) { return cloud.x + _this.image.width > 0; });
    };
    Sky.prototype.show = function () {
        var _this = this;
        this.clouds.forEach(function (cloud) {
            image(_this.image, cloud.x, cloud.y);
        });
    };
    Object.defineProperty(Sky, "SPEED", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    return Sky;
}());
var Sprite = (function () {
    function Sprite(source, frameData) {
        this.x = 0;
        this.y = 0;
        this.framesSinceLastUpdate = 0;
        this.frame = 0;
        this.isPaused = false;
        this.image = loadImage(source);
        this.frameData = frameData;
    }
    Sprite.prototype.pause = function () {
        this.isPaused = true;
    };
    Sprite.prototype.play = function () {
        this.isPaused = false;
    };
    Sprite.prototype.updateFrameData = function (frameData) {
        this.frameData = frameData;
    };
    Sprite.prototype.getFrameData = function () {
        return this.frameData;
    };
    Sprite.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
        if (!this.isPaused && this.framesSinceLastUpdate > this.frameData.frameRate) {
            if (this.frame + 1 < this.frameData.frames.length) {
                this.frame++;
            }
            else {
                this.frame = 0;
            }
            this.framesSinceLastUpdate = 0;
        }
        this.framesSinceLastUpdate++;
    };
    Sprite.prototype.show = function () {
        image(this.image, this.x, this.y, this.frameData.frameWidth, this.frameData.frameHeight, this.frameData.frames[this.frame], 0, this.frameData.frameWidth, this.frameData.frameHeight);
    };
    return Sprite;
}());
var Tyrannosaurus = (function () {
    function Tyrannosaurus(runner) {
        this.sprite = new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAv0AAABeAgMAAADNv0PuAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA////U1NT9/f3LGVtlQAAAAR0Uk5TAP///7MtQIgAAAJaSURBVHic7dpNUsQgEAXg3mTj6bLpTe7HhktqgPDfIbECcQofC8t6jt39aZExRKK4OCx6IR2wAADg2WLWx+IXUiKfAgDAxwC0FjqNSimmAMRG/Iuh5NeepCwBfArAeMCmJIBPAbga9XkKwF8DXtvEANxP8U4MAAAAAPCZgPL8o1cKAAAfC/C98tOPUWkNeDg+AAA8nt/VXTjZgeNSCvOmwzcP3vcKKwCvA5bwTGQVANkTk0kAzJv2jWhg6gFf2QZm92XOpg6fbsoQlmRqAIYDwrfpffgKkFyYeQqATqPj7WZUSm7omB6A/MUqB9iPIdEAvAEI07rPC0BWdAZAGnFoPyQlO3McPwLKpbYakwwOAABdAelXmIWS3VLKU3KLJYGHsCgAAIBhAJK2VbdUBrQEav/T+lwAAADPAUUn32hUmgt82BAocy9zKpgPEPqMSjNACP83IOsUG41KU0EMRYGyN/AryQJ3ew8AAB0ASSf52VzfNLmdSVcmCHcxyh3s5oLw0vAMBQAAngGoCoamXkD5WhKBCufr/tlGKojn66NH/Z8Ae55+BtivrJpnBJjv5ap9I+Wwv2LKNyu4060asPlz3E3VD1Zj16oaAH0ACx+Addl0JUi61uUmAJhf0L4zNN9PuXj8fAhuVXDD1wBzoGvuX04A5gSC658SAJ0Adm4HKGuHSlRcPacCMEmjyul3XcDWvlvBzV6/kZkL6EpnAH/zAsBwgLjE96+pAHazFZ0aaaPMdYVjE9f/7rfYTXyvNAAA9AXwcZdwN22Uua5wusQL6GXXi1EBAKDd9QdkEiKKVx42AAAAAABJRU5ErkJggg==', {
            frames: [88, 0],
            frameRate: 12,
            frameWidth: 88,
            frameHeight: 94,
        });
        this.dead = false;
        this.isDucking = false;
        this.gravity = 1.5;
        this.height = 94;
        this.x = 50;
        this.y = height - this.height;
        this.vy = 0;
        this.runner = runner;
        this.score = 0;
    }
    Tyrannosaurus.prototype.getScore = function () {
        return this.score;
    };
    Tyrannosaurus.prototype.isAlive = function () {
        return !this.dead;
    };
    Tyrannosaurus.prototype.jump = function () {
        if (this.y === height - this.height) {
            this.isJumping = true;
            this.isDucking = false;
            this.sprite.updateFrameData({
                frameWidth: 88,
                frameHeight: 94,
                frames: [176],
                frameRate: 60,
            });
            this.vy = -25;
        }
    };
    Tyrannosaurus.prototype.duck = function () {
        if (!this.isJumping) {
            this.isDucking = true;
            this.sprite.updateFrameData({
                frameWidth: 120,
                frameHeight: 94,
                frames: [525, 643],
                frameRate: 8,
            });
        }
    };
    Tyrannosaurus.prototype.run = function () {
        this.isDucking = false;
        this.sprite.updateFrameData({
            frameWidth: 88,
            frameHeight: 94,
            frames: [176, 264],
            frameRate: 6,
        });
    };
    Tyrannosaurus.prototype.getDimensions = function () {
        if (this.isDucking) {
            return {
                x: this.x,
                y: this.y + 40,
                width: 120,
                height: 54,
            };
        }
        return {
            x: this.x,
            y: this.y,
            width: 88,
            height: 94,
        };
    };
    Tyrannosaurus.prototype.update = function () {
        var _this = this;
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.height);
        if (this.isJumping && this.y === height - this.height) {
            this.isJumping = false;
            this.run();
        }
        if (this.runner.isRunning()) {
            this.score++;
        }
        this.runner.getObstacles().forEach(function (box) {
            if (box.checkCollision(_this)) {
                _this.dead = true;
            }
        });
    };
    Tyrannosaurus.prototype.show = function () {
        if (!this.dead) {
            this.sprite.update(this.x, this.y);
            this.sprite.show();
        }
    };
    return Tyrannosaurus;
}());
//# sourceMappingURL=build.js.map