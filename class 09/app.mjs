// let name = "Asad"
// let age = 30
// == // ===
// != // !==
// > \\ >=
// < \\ <=
// &&
// ||


// if else with equal to

// if (age === 20) {
//     console.log(`welcome ${name}`);
// } else if (age === 19) {
//     console.log("You need to wait for 5 years to be enroll.");
// } else {
//     console.log("you are not eligible.");
// }


// if else with not equal to

// if (age !== 20) {
//     console.log(`welcome ${name}`);
// } else if (age === 19) {
//     console.log("You need to wait for 5 years to be enroll.");
// } else {
//     console.log("you are not eligible.");
// }

// if else with > or >=

// let name = "Asad"
// let age = 20

// if (age >= 20) {
//     console.log(`welcome ${name}`);
// } else {
//     console.log("you are not eligible.");
// }

// if else with < or <=

// if (age <= 20) {
//     console.log(`welcome ${name}`);
// } else {
//     console.log("you are not eligible.");
// }


// if else with &&

// let name = "Asad"
// let age = 20

// if (age > 13 && age < 25) {
//     console.log(`welcome ${name}`);
// } else if (age < 13) {
//     console.log("You r very young");
// } else {
//     console.log("You are old.");
// }

// if (age > 13) {
//     if (age < 25) {
//         console.log("welcome");
//     }
// } else if (age < 13) {
//     console.log("You r very young");
// } else {
//     console.log("You are old.");
// }


// if else with ||

// let name = "Hussain"
// let age = 6
// let x = 6 // global scope

// if (age === 13 || age === 25) {
//     console.log(`welcome ${name}`);
//     let z = "kuch b" // block scope
// } else {
//z will throw an error
//     console.log("Sorry.");
// }


// simple switch statement
// let time = 19
// switch (time) {
//     case 12:
//         console.log("Good morning");
//         break;
//     case 18:
//         console.log("Good after noon");
//         break;
//     case 20:
//         console.log("Good evening");
//         break;
//     default:
//         console.log("Good night");
//         break
// }


// kind of advance stuff
let time = 19
// switch (Boolean(time)) {
//     case time < 12:
//         console.log("Good morning");
//         break;
//     case time < 18:
//         console.log("Good after noon");
//         break;
//     case time < 20:
//         console.log("Good evening");
//         break;
//     default:
//         console.log("Good night");
//         break
// }
// 0 // ""
// console.log(Boolean(0));

// let name = "0"
// let isValidValue = Boolean(name)
// console.log(isValidValue);

// if (Boolean(name)) {
// if (name) {
//     console.log("name is not empty");
// } else {
//     console.log("name is empty");
// }


// In JavaScript, we have 6 falsy values:
// false.
// 0 (zero)
// '' or "" (empty string)
// null.
// undefined.
// NaN.

// simple loop
// const num = 5
// for (let i = 0; i < num; i++) {
//     console.log(i);
// }

// loop over array
const names = ["Hammad", "Hussain", "Sheryar", "Muddassir", "Ali"]

console.log(names.length);
names.splice(1, 1)
console.log(names);

// for (let i = 0; i < names.length; i++) {
//     console.log(names[i]);
// }

// const firstTwoElem = names.slice(0, 2)
// console.log(firstTwoElem);

// for (let item of names) {
//     console.log(item);
// }
const container = document.querySelector(".container")

window.renderElements = (isDelete) => {
    if (isDelete) {
        container.innerHTML = ""
    }
    names.map((item, i) => {
        console.log(item, i);
        container.innerHTML += `<span>${item}</span> 
        <button onclick="deleteHandler(${i})" >Delete</button><br>
        `
    })
}
window.deleteHandler = (i) => {
    names.splice(i, 1)
    console.log(names);
    renderElements(true)
}

renderElements()
