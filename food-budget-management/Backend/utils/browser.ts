/*Create a headless browser, prevent the code from being detected as a bot by the website*/

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

//Activate plugin
puppeteer.use(StealthPlugin());

//Create browser instance
export async function createBrowser(){
    return puppeteer.launch({
        headless: true,
        args: ["no-sandbox", "--disable-setuid-sandbox"],
    })
}