// let num = 4
// let num2 = 2
// +
// -
// *
// /
// %

// console.log(5 % 7)
// console.log("2" - 2)
// const num = prompt("Enter your number 1")
// const num2 = prompt("Enter your number 2")
// console.log(typeof num, num)
// console.log(typeof num2, num2)
// console.log(+num + +num2);

// let number = "5"
// console.log(typeof number, number)

// let number1 = parseInt(number)
// console.log(typeof number1, number1)
// let number2 = Number(number)
// console.log(typeof number2, number2)

// alphabets a-z// A-Z
// _
// $

// let hoursAgoInKarachi = true

// let y = 2
// let z = 4

// console.log(++y) // pre increment
// console.log(--y) // pre decrement
// console.log(y++) // post increment
// console.log(y);
// console.log(y--) // post decrement
// console.log(y);


// console.log(++y) // 3
// console.log(y++) // 3
// console.log(y--) // 4
// console.log(y)// 3


console.log("I am outside of function 1");
const sum = () => {
    console.log("I am in function.");
}
console.log("I am outside of function 2");
// sum()

const num1 = document.querySelector("#num1")
const num2 = document.querySelector("#num2")
const answer = document.querySelector(".answer")

// console.log(num1);
const doSum = () => {
    let x = +num1.value
    let y = +num2.value
    // console.log(typeof y, y);
    // console.log(typeof x, x);
    const ans = x + y
    answer.innerHTML = "<h1>" + ans + "</h1>"
}

// console.log(typeof sum)

