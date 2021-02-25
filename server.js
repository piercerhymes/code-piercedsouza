const express = require("express"),
app = express(),
//puppeteer = require("puppeteer");
puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

scrapeProduct('https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020');


async function scrapeProduct(url) {

try{
    
const browser = await puppeteer.launch({ devtools:true, slowMo:20});

const page = await browser.newPage();
await page.goto(url, {waitUntil:'domcontentloaded'});
await page.setViewport({width: 1496, height: 667});

const aElementsWithHi = await page.$x('//*[@id="block-gtranslate"]/div/div/a[3]');
await aElementsWithHi[0].click();

const [el] = await page.$x('//*[@id="block-views-block-view-noticia-pbh-block-5"]/div/div/div/div/div/div[2]/span/p[1]');
const src = await el.getProperty('textContent');
const object = await src.jsonValue();

const [el2] = await page.$x('//*[@id="block-views-block-view-noticia-pbh-block-5"]/div/div/div/div/div/div[2]/span/span[6]');
const txt = await el2.getProperty('textContent');
const publicationdate = await txt.jsonValue();

const [el3] = await page.$x('//*[@id="block-views-block-view-noticia-pbh-block-5"]/div/div/div/div/div/div[2]/span/span[1]');
const txtr = await el3.getProperty('textContent');
const biddingdate = await txtr.jsonValue();

//Links related to tender

const [el4] = await page.$x('//*[@id="block-views-block-view-noticia-pbh-block-5"]/div/div/div/div/div/div[3]/div/table/tbody/tr[1]/td[2]/div/div/div/a');
const txtone = await el4.getProperty('href');
const price_linkone = await txtone.jsonValue();

const [el5] = await page.$x('//*[@id="block-views-block-view-noticia-pbh-block-5"]/div/div/div/div/div/div[3]/div/table/tbody/tr[2]/td[2]/div/div/div/a');
const txttwo = await el5.getProperty('href');
const bidding_linktwo = await txttwo.jsonValue();

const [el6] = await page.$x('//*[@id="block-views-block-view-noticia-pbh-block-5"]/div/div/div/div/div/div[3]/div/table/tbody/tr[3]/td[2]/div/div/div/a');
const txtthree = await el6.getProperty('href');
const identifier_linkthree = await txtthree.jsonValue();



console.log({object, publicationdate, biddingdate, price_linkone, bidding_linktwo, identifier_linkthree });


browser.close();


}
catch(err){
    console.log(err);
}

}

