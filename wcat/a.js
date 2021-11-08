let fs = require("fs")

fs.writeFileSync("f.txt", "Hello")
fs.readFileSync("f.txt")
console.log(fs.readFileSync("f.txt").toString())

fs.existsSync("f.txt")
console.log(fs.existsSync("f.txt"))

console.log(process.argv)

let cmd = process.argv.slice(2)
console.log(cmd) 


let a = ["", " ", "  ", "asd ", "  "]
function removeLargeSpace(arr) {
let arr1 = []
for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i].trim()
    let b = arr[i + 1].trim()
    if ((a == "" && b == "") || (a == "\r" && b == "\r")) { }
    else { arr1.push(arr[i].trim()) }
}
return arr1
}

function removeLargeSpace(arr) {
let arr1 = []
let flag = false
for (let i = 0; i < arr.length; i++) {
    if (arr[i].trim() == "" || arr[i].trim() == "\r") {
        if (flag == true) { }
        else { arr1.push(arr[i].trim()); }
        flag = true;
    }
    else { arr1.push(arr[i]); flag = false; }
}
return arr1
}
console.log(removeLargeSpace(a))
