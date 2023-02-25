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

bot.on("message", (message) => {
  userId = message.from.id;
  if (message.text.toLocaleLowerCase().includes("hi")) {
    bot.sendMessage(userId, `Hi there ${message.from.first_name}`);
    bot.sendMessage(userId, `What you want to know`);
  }
  // else {
  //   bot.sendMessage(userId, `Wrong input`);
  // }
  console.log(message.text);
});

bot.on("message", (message) => {
  if (message.text.toLocaleLowerCase().includes("price")) {
    bot.sendMessage(userId, `ok which product, send link from amazon.com`);
  }
});

const regexForLink =
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

bot.on("message", (message) => {
  if (message.text.toLocaleLowerCase().includes(regexForLink)) {
    console.log(true);
  }
});

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
