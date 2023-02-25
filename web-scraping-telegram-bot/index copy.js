const puppeteer = require("puppeteer");
const telegramBot = require("node-telegram-bot-api");

// bot
const tocken = "6159979470:AAHvo5wbSK_7gMnDBHgjPuWrOh3ivhdIy9Q";

const bot = new telegramBot(tocken, { polling: true });
let userId;
let userPrice;

// data of user
const userData = {
  Name: "",
  Price: Number(""),
  products: {
    Link1: "",
    Link2: "",
  },
};

bot.onText(/\/start/, (message) => {
  userId = message.from.id;
  userData.Name = message.from.first_name;
  console.log(userData.Name);
  bot.sendMessage(userId, `Welcome! ${message.from.first_name}`);
  bot.sendMessage(
    userId,
    " Get started   : 1. use /priceTag [your price choice]  \
                                            \n 2. use /price [product URL]to get Price "
  );
});

bot.onText(/\/priceTag (.+)/, (message, priceTag) => {
  userPrice = priceTag[1];
  console.log(userPrice);
});

bot.onText(/\/price (.+)/, (message, URL) => {
  userId = message.from.id;
  let msgTxt = message.text;
  const productLink = URL[1];

  console.log(msgTxt, productLink, URL[2]);
  console.log(URL);
  checkPrice(productLink);
});

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
