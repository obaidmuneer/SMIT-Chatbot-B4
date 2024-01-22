// const container = document.querySelector(".container")

// window.renderElements = (isDelete) => {
//     if (isDelete) {
//         container.innerHTML = ""
//     }
//     names.map((item, i) => {
//         console.log(item, i);
//         container.innerHTML += `<span>${item}</span> 
//         <button onclick="deleteHandler(${i})" >Delete</button><br>
//         `
//     })
// }
// window.deleteHandler = (i) => {
//     names.splice(i, 1)
//     console.log(names);
//     renderElements(true)
// }

// renderElements()

const items = ["hussain", "asad", "hammad"]
// let name = 'obaid'
// const firstAlpha =  name[0]
// console.log(firstAlpha);

let i = 0
// for (let item of items) {
//   console.log(item);
//   console.log(i);
//   i++
// }

// const doSum = num1 => num1

// const sum = doSum(5)
// console.log(sum);

// const data = items.map(item => item)

// const data = items.map((item, i) => {
//   console.log(item, i);
//   if (item === "hussain") return "obaid"
//   return item
// })

// console.log(data);

// const myFunc = () => {
//   const num = 1
//   return num
//   num + 2
// }

// const _d = myFunc()
// console.log(_d);



// for (const item of items) {
//   // if(item === "asad") break
//   console.log(item, "before continue");
//   if(item === "asad") continue
//   console.log(item, "after continue");
// }

// const age = 13
// let msg = ""
// if(age >= 20){
//   msg = "welcome"
//   console.log(123);
// }else{
//   msg = "not welcome"
// }

// console.log(msg);

// ternary opr
const age = 18
const _msg = (age >= 13 && age <= 20) ? "welcome" : "not welcome"
// console.log(_msg);

// const car = {
//   name: "Honda",
//   color: "black",
//   model: 2016
// }

// console.log(car.name);
// console.log(car.color);

const student_1 = {
  name: "Asad",
  roll: 123,
  obtainedMarks: 80
}

const student_2 = {
  name: "Qasim",
  roll: 456,
  obtainedMarks: 60
}

const student_3 = {
  name: "Ali",
  roll: 789,
  obtainedMarks: 90
}

const students = [student_1, student_2, student_3]

console.log(students);

for (const std of students) {
  console.log(std);
  console.log(std.name);
}
