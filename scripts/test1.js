class Cats {
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
    meow(x) {
        console.log("I' meowing " + x);
    };
}

function Dogs(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;

    this.bark = function () {
        console.log("I' barking");
    };
}



function testObjects() {
    // literal object
    let dog1 = {
        name: "fido",
        age: 4,
        color: "green"
    }
    console.log(dog1);
    // object constructor
    let dog2 = new Dogs("tobbie", 3, "white");
    console.log(dog2);
    // classes
    let cat1 = new Cats("Lucas", 3, "black")
    cat1.meow("qqqq");
}

function runTests() {
    console.log("----Test----");

    testObjects()
}