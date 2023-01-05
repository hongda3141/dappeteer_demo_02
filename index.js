import puppeteer from 'puppeteer';
import dappeteer from '@chainsafe/dappeteer';
// import {RECOMMENDED_METAMASK_VERSION} from "@chainsafe/dappeteer/dist/index";

async function main() {
  const [metamask, page, browser] = await dappeteer.bootstrap(puppeteer, {
     seed: "bubble young armed shed unusual acid pilot chase caught crop defense only", 
     password: "12345678", 
     metamaskVersion: "10.15.0" });
  const pages = await browser.pages();
  console.log('01...');
  // await pages[1].reload();
  // await pages[1].waitForNavigation();
  // console.log('02...');

  // // click continue
  // await pages[1].evaluate(() => document.querySelector('.btn-primary').click());

  // // click connect
  // await pages[1].evaluate(() => document.querySelector('.btn-primary').click());
  // you can change the network if you want
  await metamask.switchNetwork('ropsten');
  console.log('await metamask.switchNetwork...');

  // you can import a token
  await metamask.addToken({
    tokenAddress: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
    symbol: 'KAKI',
  });
  console.log('add token done');

  // go to a dapp and do something that prompts MetaMask to confirm a transaction
  await page.goto('http://my-dapp.com');
  const payButton = await page.$('#pay-with-eth');
  await payButton.click();

  // 🏌
  await metamask.confirmTransaction();
  console.log('end...');
}

main();
