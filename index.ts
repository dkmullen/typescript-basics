// To start: npm install typescript ts-node-dev
// (ts-node-dev enables running ts with node)
// Edit package.json start script (see package json)
// Set up tsconfig.json with npx typescript --init 
// (Note that Angular sets 'strict' to false in tsconfig.json and also
// that decorators are experimental and have to be enabled at the botton
// of tsconfig.json)

import { Example } from './Example'

interface PersonInfo {
    name: string,
    age: number,
    home: string,
    getInfo(): string,
    school?: string
}

const myDecorator = (target: any) => {
    console.log(target);
}
// Decorators get called when class is first executed, not
// when new instances are made. Can apply to anything, receives
// different args depening on where used, can be plain or a 
// decorator factory  - ie -- @myDecorator({ template: './metemplate.html})
// The factory is the usual way in angular. Decorators are experimental
// in typescript and the properties they set on the class could be set
// in more traditional ways
@myDecorator

class Person implements PersonInfo{
    // This is the standard shortcut for the commented-out
    // property declarations and constructor below
    constructor(public name: string, public age: number, 
        public home: string) {}

    // name: string;
    // age: number;
    // home: string;

    // constructor(name: string, age: number, home: string) {
    //     this.name = name;
    //     this.age = age;
    //     this.home = home;
    // }

    // getInfo has to return a string, as defined in the interface
    // 'void' means nothing is returned by a method
    getInfo() {
        console.log(this.name, this.age, this.home);
        return this.name;
    }

    getBirthYear() {
        console.log(2020 - this.age);
    }

    useExampleModule() {
       const demo = new Example();
       console.log(demo.message);
    }
   }
  // With constructor
  const cindy = new Person('Cindy', 54, 'Kingston');

  // Without constructor
//   const cindy = new Person();
//   cindy.name = 'Cindy';
//   cindy.age = 54;
//   cindy.home = 'Kingston';
  
cindy.getInfo();
cindy.getBirthYear();
cindy.useExampleModule();

// Here's a way to use a generic type (while still getting ts help in enforcing type)
class ValueHolder<T> { // The 'T' could have any name but T is accepted shorthand
    value: T;
}
// ...then set it case by case
const numberHolder = new ValueHolder<number>();
numberHolder.value = 9;

const stringHolder = new ValueHolder<string>();
stringHolder.value = '9';

// Generic type with function
// Supply a value of type T; function must export an array of type T
const valueWrapper = <T>(value: T): T[] => {
    return [value];
}
valueWrapper<number>(3);
valueWrapper<boolean>(false)
valueWrapper('hello'); // Actually don't need to specify type, which seems to negate the usefulness?