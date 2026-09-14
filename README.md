# bench-justin-random-generation

Figuring out fetch and organizing questions was a collaboration between me and AI, but I wrote a lot of the Javascript, most of the HTML, and some of the CSS. I got the header, nav, and footer all good, then told AI to just take the styling of the questions and results and loading thing for me. Some images I added myself, and others were added by AI. I didn't make any of the images used, but found them online.

# Notes
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

### Variables

- "const" will not allow data to be moved to a new slot of memory. With objects, the const variable is pointing to the objects place in memory, so the object can still be mutated. Trying to reassign the object to be a new object will fail, but data members can be altered. Pointers can't be changed, but data within the object a pointer is pointing at can be changed, pretty much.
- "let" will allow data to be moved to a new memory slot.
- "var" creates a global variable regardless of which scope it is used in.

### Fetching

fetch() needs to go get something, so for something like let data = fetch("..."), data is a "promise object" until fetch has actually gotten the thing to put into data. You need to use "await" to make the code wait for fetch() to complete: let data = await fetch("..."). Instead of await, you could also call fetch().then()