const num1 = document.querySelector("#num1");
const num2 = document.querySelector("#num2");
const answer = document.querySelector(".answer");
const input_value = document.querySelector("#input_value");

// const doSum = () => {
//   let x = +num1.value;
//   let y = +num2.value;
//   let ans = x + y;
//   console.log(ans);
//   answer.innerHTML = ans
// };

window.doSumWithEval = () => {
  const val = input_value.value;
  console.log(val);
  const ans = eval(val);
  console.log(ans);
  answer.innerHTML = `<h1> your ans is ${ans} <br> your question was ${val}</h1>`;
};
// window.doSumWithEval = doSumWithEval

const sum = (x, y) => {
  // parameters
  const ans = x + y;
  return ans;
};

// const sumValue = sum(9,3) // argument

// console.log(sumValue,"this is sumValue");

const arr = ["obaid", 123, true]; // array
//    0,    1,     2;
// console.log(typeof arr);
// console.log(arr[0]);
// console.log(arr[1]);
// console.log(arr[2]);
// console.log(arr, `before push and its length is ${arr.length}`);
// arr.push("asad");
// console.log(arr, "after push");
// arr[0] = "hussain";
// console.log(arr, "after update");

// arr.pop();
// console.log(arr, "after pop");
// console.log(arr.length, "arr length");

// const slicedArr = arr.slice(2, 3);
// console.log(slicedArr, "slicedArr");
// console.log(arr, "arr after sliced");

// const splicedArr = arr.splice(2, 1,false);
// console.log(splicedArr, "splicedArr");
// console.log(arr, "arr after spliced");

const foundData = arr.map((item, i, data) => {
  console.log(item);
  document.querySelector(".answer").innerHTML += item + "<br>";
});
