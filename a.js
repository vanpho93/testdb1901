class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHi() {
        console.log(`Hi, my name is ${this.name}.`);
    }
}

class Child extends Person {
    constructor(name, age, toy) {
        super(name, age);
        this.toy = toy;
    }

    static show() {
        console.log('STATIC METHOD');
    }

    sayHello() {
        console.log('Hello');
    }

    sayHi() {
        super.sayHi();
        console.log('Hi. I am ' + this.name + ', playing ' + this.toy);
    }
}

const teo = new Child('Teo Nguyen', 10, 'Auto');
console.log(teo);
teo.sayHi();
teo.sayHello();
Child.show();
