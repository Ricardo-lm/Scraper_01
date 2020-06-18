const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const [element] = await page.$x('//*[@id="imgBlkFront"]'); //the .$x it's the puppeteer selector by xpath
    const src = await element.getProperty('src');
    const imageURL = await src.jsonValue();

    const [element2] = await page.$x('/html/body/div[2]/div[1]/div[4]/div[5]/div[1]/div/h1/span[1]'); //change this xpath
    const txt = await element2.getProperty('txtContent');
    const title = await txt.jsonValue();

    const [element3] = await page.$x('/html/body/div[2]/div[1]/div[4]/div[3]/div[3]/div/div/div[1]/div/div/div[1]/div/div[1]/a/h5/div/div/div[2]/span'); //change this xpath
    const txt2 = await element3.getProperty('txtContent');
    const price = await txt2.jsonValue();
    
    console.log({imageURL, title, price});
    browser.close();
}

scrapeProduct('https://www.amazon.com/-/es/gp/product/1455586692/ref=ox_sc_act_title_7?smid=ATVPDKIKX0DER&psc=1') //insert here the website URL that you wanna scrape
