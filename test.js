//import devices from './puppeteerDevices'
const puppeteer = require('puppeteer');
//const DevicesMap = require( "./puppeteerDevices");

//const devices = puppeteer.devices;
const testedMobileDevices = ["Galaxy Note 3", "Galaxy Note 3 landscape", "Galaxy Note II", "Galaxy Note II landscape",
    "Galaxy S III", "Galaxy S III landscape", "Galaxy S5", "Galaxy S5 landscape", "iPad", "iPad landscape",
    "iPad Mini", "iPad Mini landscape", "iPad Pro", "iPad Pro landscape", "iPhone 4", "iPhone 4 landscape",
    "iPhone 5", "iPhone 5 landscape", "iPhone 6", "iPhone 6 landscape", "iPhone 6 Plus", "iPhone 6 Plus landscape",
    "iPhone 7", "iPhone 7 landscape", "iPhone 7 Plus", "iPhone 7 Plus landscape", "iPhone 8", "iPhone 8 landscape",
    "iPhone 8 Plus", "iPhone 8 Plus landscape", "iPhone SE", "iPhone SE landscape", "iPhone X",
    "iPhone X landscape", "iPhone XR", "iPhone XR landscape", "iPhone 11", "iPhone 11 landscape", "iPhone 11 Pro",
    "iPhone 11 Pro landscape", "iPhone 11 Pro Max", "iPhone 11 Pro Max landscape", "Nexus 10", "Nexus 10 landscape",
    "Nexus 4", "Nexus 4 landscape", "Nexus 5", "Nexus 5 landscape", "Nexus 5X", "Nexus 5X landscape", "Nexus 6",
    "Nexus 6 landscape", "Nexus 6P", "Nexus 6P landscape", "Nexus 7", "Nexus 7 landscape", "Pixel 2",
    "Pixel 2 landscape", "Pixel 2 XL", "Pixel 2 XL landscape"
];



async function login() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const username = 'thisisausername'
    const password = 'thisisapassword'
    const base_url = 'http://127.0.0.1:8000/'
    await page.setDefaultNavigationTimeout(0);
    process.setMaxListeners(0);
    await page.goto(`${base_url}/login`,{
        waitUntil: 'domcontentloaded'
    });
    //await page.type('[name=username]', username);
    //await page.type('[name=password]', password);
    await page.type('#username', username);
    await page.type('#password', password);
    await page.click('[type=submit]');
}

async function test() {
    for (let device of testedMobileDevices) {
        await login();
        const base_url = 'http://127.0.0.1:8000/'
        const urls = ['feed/', 'friends/', 'mynetwork/']
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        process.setMaxListeners(0);
        await page.emulate(puppeteer.devices[device]);

        for (let url of urls) {           
            await page.goto(`${ base_url }/${url}`,{
                waitUntil: 'domcontentloaded'
            });

            await page.screenshot({
                path: "./screenshots.jpg",
                type: "jpeg",
            });
        }
    }
}

test().then(() => {
    console.log("all done");
}).catch(err => {
    console.log(err);
});