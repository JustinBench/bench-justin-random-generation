# bench-justin-random-generation
## Things to know in JavaScript

### Objects - something with data methods and methods

Pretty much everything in JavaScript is an object. Even strings are objects.

#### const example:

const user = {
  name: "Alex",
  age: 28,
  isAdmin: true,
  // A method inside an object
  greet: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

Accessing properties
console.log(user.name); Output: Alex
user.greet();           Output: Hello, my name is Alex

#### non-const examples would use var (global) or let (scope-dependent).

Use either const or let. Don't use var.

#### Class Definition:
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  drive() {
    console.log(`${this.brand} ${this.model} is driving.`);
  }
}

// Instantiate new objects using the 'new' keyword
const car1 = new Car("Tesla", "Model 3");
const car2 = new Car("Ford", "Mustang");

car1.drive(); // Output: Tesla Model 3 is driving.
