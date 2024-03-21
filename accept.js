const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const profileDirectory = "Artpmmmrooo"; // Name of the profile directory you want to use
(async () => {
  const browser = await puppeteer.launch({
    userDataDir:
      "/Users/piyawatmahattanasawat/Library/Application Support/Google/Chrome/Artpmmmrooo",
    // userDataDir:
    //   "/Users/Piyawat/Library/Application Support/Google/Chrome", // Path to Chrome user data directory
    headless: false, // Set to true if you want to run in headless mode
    // userDataDir: `/Users/piyawatmahattanasawat/Library/Application Support/Google/Chrome/Piyawat`,
    args: [`--profile-directory=${profileDirectory}`],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 720 });
  const handleClickSelector = async (selector) => {
    try {
      await page.waitForSelector(selector, { timeout: 1000 });
      const buttonClick = await page.$(selector);
      if (buttonClick) {
        await buttonClick.evaluate((b) => b.click());
      } else {
        console.log("no selector", selector);
      }
      console.log("click ", selector);
    } catch (error) {
      //   console.log("Error:", error.message); // Log the error message
      console.log("Selector not found:", selector);
    }
  };

  async function handleCheckSelectorContent(selector) {
    try {
      // Wait for the selector to appear on the page
      await page.waitForSelector(selector, { timeout: 500 });

      // Once the selector appears, get the element handle
      const elementHandle = await page.$(selector);

      // If the element handle is valid, extract its content
      if (elementHandle) {
        const content = await page.evaluate(
          (element) => element.textContent,
          elementHandle
        );
        console.log("Content of the selector:", content);

        return content;
        // Perform further actions based on the content, if needed
        // For example, you can compare the content or extract specific data from it
      } else {
        console.error("Element not found:", selector);
      }
    } catch (error) {
      console.error("Waiting failed5555:", error);
      return null;
      // Handle timeout or other errors here
    }
  }

  // Navigate to rollbit.com
  await page.goto("https://rollbit.com/duel-arena");

  //   close popup
  const handleClostPopup = async () => {
    const closePopupSelector =
      "#rollbit-modal-popover-container > div > div > div > div.css-1nc5kzu > div";
    console.log("before click close popup");
    try {
      await page.waitForSelector(closePopupSelector, { timeout: 1000 });
      const buttonClick = await page.$(closePopupSelector);
      if (buttonClick) {
        await buttonClick.evaluate((b) => b.click());
      } else {
        console.log("no closePopupSelector", closePopupSelector);
      }
      console.log("click ", closePopupSelector);
    } catch (error) {
      console.log("Error:", error.message); // Log the error message
      console.log("closePopupSelector not found:", closePopupSelector);
    }

    console.log("after close popup");

    console.log("beforeclick add");
  };

  const checkAndGoToRoom = async () => {
    await delay(750); // Wait for 10 seconds

    const roomSelector = [
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:first-child > span",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(2) > span",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(3) > span",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(4) > span",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(5) > span",
    ];

    const handleBan1Min = async () => {
      await delay(750);
      const cancelButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div.css-ihqyha > div > div.css-xh1exg > div.css-at020p > button:nth-child(2)`;
      await handleClickSelector(cancelButtonSelector);
      await delay(750);
      const confirmBanButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-e6dost > div > div:nth-child(3) > button:nth-child(2)`;
      const confirmCancelButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1ky6vx > div > div > button:nth-child(2)`;

      await handleClickSelector(confirmCancelButtonSelector);
      await delay(750);
      await handleClickSelector(confirmBanButtonSelector);
      await delay(750);
    };
    const handleChangePrice = async (opponentPrice) => {
      await delay(500);
      const ourPriceSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-9sbvmf > div:nth-child(1) > h3 > span`;
      const ourPriceContent = await handleCheckSelectorContent(
        ourPriceSelector
      );
      const ourPriceNumber = Number(ourPriceContent.replace(/\D/g, "")) / 100;
      console.log("ourPriceNumber", ourPriceNumber);
      console.log("opponentPrice", opponentPrice);
      const modifindedOpponentPprice = Number(opponentPrice * 0.9);
      let resultOpponentPrice =
        Math.floor(modifindedOpponentPprice * 100) / 100;
      // special case
      await delay(750); // Wait for 10 seconds
      if (opponentPrice >= 10.9 && opponentPrice <= 11.11) {
        console.log("special case");
        if (ourPriceNumber !== 10) {
          const editSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-9sbvmf > div:nth-child(1) > div > div > div > button`;
          await handleClickSelector(editSelector);
          const amountInputSelector = `input[autocomplete="off"]:not([placeholder])`;
          await page.waitForSelector(amountInputSelector, { timeout: 500 });
          const amountInput = await page.$(amountInputSelector);
          await amountInput.click({ clickCount: 3 });
          await page.type(amountInputSelector, `10`);
          const UpdateButtonSelector = `button.css-9wd0vo`;
          await handleClickSelector(UpdateButtonSelector);
        } else {
          const allowButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-xh1exg > div.css-at020p > button:nth-child(1)`;
          handleClickSelector(allowButtonSelector);
        }
      } else {
        if (ourPriceNumber !== resultOpponentPrice) {
          console.log("ourPriceNumber", ourPriceNumber);
          console.log("resultOpponentPrice", resultOpponentPrice);
          console.log("case !=== 0.9");
          const editSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-9sbvmf > div:nth-child(1) > div > div > div > button`;
          await handleClickSelector(editSelector);
          const amountInputSelector = `input[autocomplete="off"]:not([placeholder])`;
          await page.waitForSelector(amountInputSelector, { timeout: 500 });
          const amountInput = await page.$(amountInputSelector);
          await amountInput.click({ clickCount: 3 });
          const finalOurPrice = opponentPrice * 0.9;
          const finnal2OurPrice = finalOurPrice >= 10 ? finalOurPrice : 10;
          await page.type(amountInputSelector, `${finnal2OurPrice}`);
          const UpdateButtonSelector = `button.css-9wd0vo`;
          await handleClickSelector(UpdateButtonSelector);
        } else {
          console.log("case === 0.9");
          // const UpdateButtonSelector = `button.css-9wd0vo`;
          // await handleClickSelector(UpdateButtonSelector);
          // case ourprice < opponentPrice
          const allowButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-xh1exg > div.css-at020p > button:nth-child(1)`;
          handleClickSelector(allowButtonSelector);
        }
      }

      // set money
      // click create
    };
    const handleCheckOpponentPrice = async () => {
      // click accept

      const opponentPriceSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-9sbvmf > div:nth-child(3) > h3 > span`;
      const opponentPriceContent = await handleCheckSelectorContent(
        opponentPriceSelector
      );
      if (!opponentPriceContent) {
        return;
      }
      const opponentPriceNumber =
        Number(opponentPriceContent.replace(/\D/g, "")) / 100;

      if (opponentPriceNumber > 60 || opponentPriceNumber < 10.8) {
        console.log("case >105 < 10.8", opponentPriceNumber);

        await handleBan1Min();
      } else {
        await handleChangePrice(opponentPriceNumber);
      }

      console.log("opponentPriceContent", opponentPriceContent);
    };
    async function art(array) {
      await delay(500);
      let result;
      for (const item of array) {
        try {
          console.log("current room =", item);
          const lobbyButtonSelector = `.css-93ujpa > :first-child`;
          console.log("click lobby");
          await handleClickSelector(lobbyButtonSelector);
          const content = await handleCheckSelectorContent(item);

          console.log("content2 =", content);
          if (content !== "Waiting...") {
            console.log("click");
            await handleClickSelector(item);
            await handleCheckOpponentPrice();
          }
          //   const amountInRoomSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-9sbvmf > div:nth-child(1) > div > div > div > div > span`;
          //   await page.waitForSelector(amountInRoomSelector);
          //   const amountElement = await page.$(amountInRoomSelector);
          //   if (amountElement) {
          //     const amountText = await page.evaluate(
          //       (element) => element.textContent,
          //       amountElement
          //     );
          //     console.log("Amount in room:", amountText);
          //     amounts.push(amountText);
          //     console.log(amounts);
          //   } else {
          //     console.error("Element not found:", amountInRoomSelector);
          //   }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      }
      //   await delay(3000);
      return result;
    }
    await art(roomSelector);

    // await handleCreateRooms(roomLeft);
  };

  while (true) {
    console.log("checking");
    // const lobbyButtonSelector = `.css-93ujpa > :first-child`;
    // console.log("click lobby");
    // await handleClickSelector(lobbyButtonSelector);
    // await delay(750); // Wait for 10 seconds
    // console.log("after click lobby");
    await checkAndGoToRoom();
    await delay(750); // Wait for 10 seconds
    await handleClostPopup();
  }
  // Close the browser
})();
