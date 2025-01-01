const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const extract = require('./data');
const { proxies } = require('../constants/data');

const generateRandomProxy = () => {
  const index = Math.floor(Math.random() * proxies.length);
  return proxies[index];
};

async function getTrends() {
  let driver;
  
  while (true) {
    try {
      const chromeOptions = new chrome.Options();
      const proxy = generateRandomProxy();

      chromeOptions.addArguments('--no-sandbox', '--disable-dev-shm-usage');
      chromeOptions.addArguments('--disable-gpu');
      chromeOptions.addArguments('--headless');
      chromeOptions.addArguments(`--proxy-server=${proxy}`);

      driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(chromeOptions)
        .build();

      await driver.manage().window().maximize();
      await driver.get("https://x.com/i/flow/login");

      // Wait for username input and type the username
      const username = await driver.wait(until.elementLocated(By.css('input[autocomplete="username"]')), 20000);
      await username.sendKeys(process.env.TWITTER_USERNAME, Key.ENTER);
      console.log("Username entered");

      try {
        const email = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 20000);
        await email.sendKeys(process.env.TWITTER_EMAIL, Key.ENTER);
        console.log("Email verified");
      } catch (err) {
        console.log("No email section found");
      }

      // Wait for password input and type the password
      const password = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 40000);
      await password.sendKeys(process.env.TWITTER_PASSWORD, Key.ENTER);
      console.log("Entered password");

      await driver.wait(until.elementLocated(By.xpath('//div[@data-testid="trend"]')), 40000);
      console.log("Trending elements found");
      const trending = await driver.wait(until.elementLocated(By.xpath("//div[@aria-label='Timeline: Trending now']")), 40000);
      console.log("Extracting HTML...");
      const html = await trending.getAttribute("outerHTML");

      const data = extract(html);
      data.ipAddress = proxy;
      console.log(data);
      return data;

    } catch (err) {
      console.error("Error occurred:", err.message);
    } finally {
      console.log("Finally ended");
      // Uncomment to close the browser after execution
      await driver.quit();
    }
  }
}

module.exports = getTrends;
