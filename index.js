const puppeteer = require("puppeteer");
const getNextMineDelay = require("./getNextMineDelay");
var argv = require("minimist")(process.argv.slice(2));
const url =
  argv.url ||
  "ws://127.0.0.1:9222/devtools/browser/e03b0e21-f580-461a-a30d-081ce7f5c3f9";

//TODO https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0
const wsChromeEndpointurl = url;

const account = argv.account || "qioba.wam";
function delay(time) {
  let timer = 1;
  let timerId = setInterval(
    () => process.stdout.write(`\r ${timer++}/${(time - 1) / 1000} seconde `),
    1000
  );

  return new Promise(function (resolve) {
    setTimeout(() => {
      process.stdout.write(`\n `);
      clearInterval(timerId);
      resolve();
    }, time);
  });
}

const autoMine = async (page) => {
  const msToWait = await getNextMineDelay(account);

  console.log("minage en cours");
  await delay(msToWait + 1000);
  console.log("minage done");

  // mine
  await page.mouse.click(400, 480);
  await delay(8000);
  let mined = false;
  let tryMine = 0;
  while (!mined) {
    console.log("on essaie de claim");
    //claim
    await page.mouse.click(400, 340);

    const msToWait2 = await getNextMineDelay(account);
    tryMine++;
    console.log("nombre de try ?", tryMine);
    await delay(8000);

    if (msToWait2 > 0 || tryMine > 10) {
      mined = true;
    }
  }

  await delay(8000);

  console.log("on click mining hub");
  //mining hub
  await page.mouse.click(230, 440);

  autoMine(page);
};
(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointurl,
  });
  const page = await browser.newPage();

  await page.goto("https://play.alienworlds.io/");

  const frame = await page.waitForSelector("canvas");
  // Find its coordinates
  await delay(9000);

  console.log("login...");
  //login
  await page.mouse.click(400, 400);
  await delay(9000);

  console.log("mine menu");
  //mine menu
  await page.mouse.click(650, 200);
  await delay(2000);

  autoMine(page);

  // await browser.close();
})();
