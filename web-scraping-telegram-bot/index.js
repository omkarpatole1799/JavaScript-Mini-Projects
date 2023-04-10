const puppeteer = require("puppeteer");
const telegramBot = require("node-telegram-bot-api");

// bot
const tocken = "6159979470:AAHvo5wbSK_7gMnDBHgjPuWrOh3ivhdIy9Q";

const bot = new telegramBot(tocken, { polling: true });
let userId;
let userPrice;

// check price function
async function checkPrice(productLink) {
  await bot.sendMessage(userId, "Beep Boop, wait a second");
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto(`${productLink}`);
  const price = await page.evaluate(() => {
    return document.querySelector(
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole"
    ).textContent;
  });

  if (price >= userPrice) {
    bot.sendMessage(userId, "Price Increased, current price: " + price);
  } else {
    bot.sendMessage(userId, "Price Dropped, current price: " + price);
  }

  browser.close();
}

// text
bot.on("message", (msg) => {
  userId = msg.from.id;
  let userMessage = msg.text.toLowerCase();
  if (userMessage.includes("hi") || userMessage.includes("hello")) {
    bot.sendMessage(
      userId,
      "Hello there, send me product link and I'll keep an eye on the pricing."
    );
    bot.sendMessage(
      userId,
      "First send me pricing of the product and then send product link"
    );
  } else if (userMessage.includes("price")) {
    bot.sendMessage(
      userId,
      "OK, first send the price you want to buy product on"
    );
  } else if (userMessage.includes(/^[0-9]+$/)){
    console.log("number");
  }
    else {
    bot.sendMessage(userId, "Wrong input");
  }
});
