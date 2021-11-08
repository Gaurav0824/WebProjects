const puppeteer = require("puppeteer");
let page;
let url = process.argv[2];
(async function () {
    let browser = await puppeteer
        .launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });
    let pages = await browser.pages();
    page = pages[0];
    await page.goto(url);
    await page.waitForSelector(".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer", { visible: true })
    let reqTime = await page.evaluate(async function () {

        function hmsToSec(str) {
            var p = str.split(":")
            s = 0;
            m = 1;
            while (p.length > 0) {
                s += m * parseInt(p.pop(), 10)
                m *= 60
            }
            return s;
        }

        let tVids = Number(document.querySelector("#stats yt-formatted-string span").innerText)
        let noOfScroll = Math.ceil(tVids / 100)
        let timeVal = new Promise(function (resolve, reject) {
            let count = 0;
            let scroll = setInterval(function () {
                let arr = document.querySelectorAll("#index")
                arr[arr.length - 1].scrollIntoView()
                count++;
                if (count == noOfScroll) {
                    clearInterval(scroll)
                    let timeArr = document.querySelectorAll(
                        "span.style-scope.ytd-thumbnail-overlay-time-status-renderer");
                    console.log(timeArr.length);
                    let totalTime = 0;
                    for (let i = 0; i < timeArr.length; i++) {
                        // console.log(timeArr[i])
                        totalTime += hmsToSec(timeArr[i].innerText);
                    }
                    console.log(totalTime / (60 * 60));
                    resolve(totalTime / (60 * 60));
                    // let time = document.querySelectorAll(
                    //     "#overlays  ytd-thumbnail-overlay-time-status-renderer  span")
                    // let min = 0;
                    // let sec = 0;
                    // let hrs = 0;
                    // let day = 0;
                    // let week = 0;

                    // console.log(time.length);
                    // for (let i = 0; i < time.length; i++) {
                    //     let ar = time[i].innerText.split(":")
                    //     sec += ar[1].trim()
                    //     min += ar[0].trim()
                    // }
                    // console.log(day + ":" + hrs + ":" + min + ":" + sec);

                    // week += (day / 7)
                    // week = (day % 7)
                    // day += (hrs / 24)
                    // hrs = (hrs % 24)
                    // hrs += (min / 60)
                    // min = (min % 60)
                    // min += (sec / 60)
                    // sec = (sec % 60)

                    // console.log(day + ":" + hrs + ":" + min + ":" + sec);
                }
            }, 4000);
        })
        return timeVal
    });

    console.log(reqTime);


})();