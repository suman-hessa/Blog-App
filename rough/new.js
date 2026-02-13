const pattern = /[^a-zA-Z\d]+/g

const str = "Hi there &((&)) $$are you";
const newStr = str.replace(pattern, "-");
console.log(newStr)