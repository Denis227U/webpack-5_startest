import './styles/index.scss';

import Test from './js/test';

const arr = [1, 2, 3];
// console.log(arr);

const post = new Test('Webpack Post Title');

// console.log("Post to String", post.toString());

let a = 1;
console.log('a: ', a);

a++;

// eslint-disable-next-line no-console
console.log(window);

arr.push(a);
arr.push(post);

function foo(name) {
  const lastName = name;
  return lastName;
}

const x = a + 200;

foo(x);

// const testObj = {
//   one: "odin",
//   two: "dva",
//   three: "tri",
// };

// for (const key of testObj) {
//   console.log(`${key}:${testObj[key]}`); // original
// }

// fwefwef wef wefwefwefwefwefwef wefwefwefwefwefwef wefwefwefwefwef wefwefewfefwefwefwefwefwefwefwefwefwefwefwefwefwefewfwefwefwfwefwefwfwfwfwef

const obj = {
  name: 'Denis',
  age: 43,
};

const name = obj.name;
const el0 = arr[0];
const cc = a || x;
let a5 = 2 + obj.age;

a5++;

// eslint-disable-next-line no-console
console.log(a5);


const arr2 = [[], {}, (3, 4)];
