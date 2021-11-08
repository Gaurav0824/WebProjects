#!/usr/bin/env node

let fs = require("fs")

let cmd = process.argv.slice(2);
// let name
if (cmd.length !== 0)

    (function () {
        let options = []
        let files = []

        for (let x in cmd) {
            if (cmd[x].startsWith("-") && cmd[x].length == 2)
                options.push(cmd[x]);
            else {
                if (!fs.existsSync(cmd[x])) {
                    console.log(cmd[x] + " does not exist"); return;
                } files.push(cmd[x]);
            }
        }
        /*  for (x in files){ 
                if (!fs.existsSync(files[x])) { console.log(files[x] + " does not exist"); return; }
            } */ //process.exit(0);

        let str = ""

        for (let x in files) {
            str += fs.readFileSync(files[x]).toString();
        }

        // console.log(options);
        // console.log(files);
        // console.log(str);

        str = str.split("\n");

        // console.log(str)

        if (options.includes("-s")) {
            str = removeLargeSpace(str);
        }

        // console.log(str)

        if (options.includes("-n") && options.includes("-b")) {
            if (options.indexOf("-n") < options.indexOf("-b"))
                str = addNum(str)
            else str = addNonEmptyNum(str)
        }
        else {
            if (options.includes("-n")) { str = addNum(str) }
            else if (options.includes("-b")) { str = addNonEmptyNum(str) }
        }

        // console.log(str

        str = str.join("\n")
        console.log(str)

    })();

function removeLargeSpace(arr) {
    let arr1 = []
    let flag = false
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].trim() == "" || arr[i].trim() == "\r") {
            if (flag !== true) { arr1.push(arr[i].trim()); }
            flag = true;
        }
        else { arr1.push(arr[i]); flag = false; }
    }
    return arr1
}

function addNum(arr) {
    let arr1 = []
    let line = 1
    for (let i in arr) {
        arr1[i] = lineNumber(line++) + " " + arr[i];
    }
    return arr1
}

function addNonEmptyNum(arr) {
    let line = 1
    let arr1 = []
    for (let i in arr) {
        let a = arr[i].trim()
        if (a != "" && a != "\r")
            arr1[i] = lineNumber(line++) + " " + arr[i];
    }
    return arr1
}

function lineNumber(num) {
    let num1 = ""
    for (let i = 0; i < 4 - num.toString().length; i++) {
        num1 += (" ");
    } return num1 + num
}
