const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
const userDataDir =
  "/Users/piyawatmahattanasawat/Library/Application Support/Google/Chrome"; // Path to Chrome's user data directory
const profileDirectory = "Person 1"; // Name of the profile directory you want to use
(async () => {
  const roomPrices = [11, 15, 20, 25, 30];
  let roomPriceTemp = [11, 15, 20, 25, 30];
  const browser = await puppeteer.launch({
    userDataDir:
      "/Users/piyawatmahattanasawat/Library/Application Support/Google/Chrome/Profile 10",
    // executablePath: require("puppeteer").executablePath(),
    // userDataDir:
    //   "/Users/Piyawat/Library/Application Support/Google/Chrome", // Path to Chrome user data directory
    // headless: false, // Set to true if you want to run in headless mode
    // userDataDir: `/Users/piyawatmahattanasawat/Library/Application Support/Google/Chrome/Piyawat`,
    args: [`--profile-directory=${profileDirectory}`, "--disable-extensions"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 220 });

  const handleClickSelector = async (selector) => {
    try {
      await page.waitForSelector(selector, { timeout: 3000 });
      const buttonClick = await page.$(selector);
      if (buttonClick) {
        await buttonClick.evaluate((b) => b.click());
      } else {
      }
    } catch (error) {}
  };

  // Navigate to rollbit.com
  await page.goto("https://rollbit.com/duel-arena");

  //   close popup
  const handleClosePopup = async () => {
    const closePopupSelector =
      "#rollbit-modal-popover-container > div > div > div > div.css-1nc5kzu > div";
    await handleClickSelector(closePopupSelector);
  };
  // // click login
  // const loginButtonSelector = "#root > div.css-1cn0dze > div > div";
  // await handleClickSelector(loginButtonSelector);

  // // Type email
  // const emailFieldSelector = `input[name="email"]`;
  // await page.waitForSelector(emailFieldSelector);
  // await page.type(emailFieldSelector, "art.pm99@gmail.com");
  // // Type password
  // const passwordFieldSelector = `input[name="password"]`;
  // await page.waitForSelector(passwordFieldSelector);
  // await page.type(passwordFieldSelector, "Mahat43758!");
  // await page.screenshot({ path: "4.png" });

  //   click login
  // const submitButtonSelector =
  //   "#rollbit-modal-popover-container > div > div > div > div > div.css-nwen1v > form > button";
  // await handleClickSelector(submitButtonSelector);

  const handleCreateRoom = async (price) => {
    const lobbyButtonSelector = `.css-93ujpa > :first-child`;
    await handleClickSelector(lobbyButtonSelector);
    const createRoomButton = `img[alt="plus"]`;
    //   await page.click(".css-bt07qr");
    await handleClickSelector(createRoomButton);

    const addButton = `img[alt="coins"]`;
    await handleClickSelector(addButton);
    const amountInputSelector = `input[autocomplete="off"]:not([placeholder])`;
    try {
      await page.waitForSelector(amountInputSelector, { timeout: 2000 });
      await page.type(amountInputSelector, `${price}`);

      // set money
      const UpdateButtonSelector = `button.css-9wd0vo`;
      await handleClickSelector(UpdateButtonSelector);
      // click create
      const createDuelButtonSelector = "button.css-1m7zi3s";
      await handleClickSelector(createDuelButtonSelector);
      // click close popup
      const popupSelector = `.css-ikjtri`;
      await handleClickSelector(popupSelector);

      // back to lobby

      await handleClickSelector(lobbyButtonSelector);
    } catch (error) {}
  };

  // await handleCreateRooms(roomPrices);
  // #root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(4)
  const handleClearRoom = async () => {
    await delay(500);
    const cancelButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-xh1exg > div.css-at020p > button:nth-child(2)`;
    await handleClickSelector(cancelButtonSelector);
    await delay(500);
    const confirmCancelButtonSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1ky6vx > div > div > button:nth-child(2)`;
    await handleClickSelector(confirmCancelButtonSelector);
    await delay(500);
  };
  let isReadyToCreate = true;
  const checkAndCreateRoom = async () => {
    async function handleCreateRooms(array) {
      let result;
      for (const item of array) {
        result = await handleCreateRoom(item);
      }
      // await delay(2500);
      return result;
    }
    const roomSelector = [
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:first-child",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(2)",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(3)",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(4)",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(5)",
    ];
    const roomImageSelector = [
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:first-child > img",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(2) > img",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(3) > img",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(4) > img",
      "#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1o5y6bl > div > div > button:nth-child(5) > img",
    ];

    let amounts = [];

    async function art(array) {
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

            return content;
            // Perform further actions based on the content, if needed
            // For example, you can compare the content or extract specific data from it
          } else {
            console.error("Element not found:", selector);
          }
        } catch (error) {
          console.error("Waiting failed5555:", error);
          // Handle timeout or other errors here
        }
      }
      async function handleCheckImageAlt(selector) {
        try {
          // Wait for the selector to appear on the page
          await page.waitForSelector(selector, { timeout: 500 });

          // Once the selector appears, get the element handle
          const elementHandle = await page.$(selector);

          // If the element handle is valid, extract its alt attribute
          if (elementHandle) {
            const alt = await page.evaluate(
              (element) => element.getAttribute("alt"),
              elementHandle
            );

            return alt;
            // Perform further actions based on the alt attribute, if needed
          } else {
            return null; // Handle the case when elementHandle is null
          }
        } catch (error) {
          console.error("Error occurred:", error);
          return null; // Handle timeout or other errors here
        }
      }

      let result;
      for (const [index, item] of array.entries()) {
        const imageAlt = await handleCheckImageAlt(roomImageSelector[index]);
        if (imageAlt !== "swords") {
          try {
            await delay(500);

            result = await handleClickSelector(item);

            const amountInRoomSelector = `#root > div.css-yj8y94 > div.css-1gcbewu > div > div.css-s63olu > div.css-1w9prk4 > div > div > div > div > div.css-9sbvmf > div:nth-child(1) > div > div > div > div > span`;
            await page.waitForSelector(amountInRoomSelector, { timeout: 2000 });
            const amountElement = await page.$(amountInRoomSelector);
            if (amountElement) {
              const amountText = await page.evaluate(
                (element) => element.textContent,
                amountElement
              );

              const amountNumber = Number(amountText.replace(/\D/g, ""));
              const roomContent = await handleCheckSelectorContent(item);

              if (
                !roomPriceTemp.includes(amountNumber) &&
                roomContent === "Waiting..."
              ) {
                // await delay(1000);
                await handleClearRoom();

                isReadyToCreate = false;
                return;
              } else {
                roomPriceTemp = roomPriceTemp.filter((p) => p !== amountNumber);

                amounts.push(amountText);
              }
            } else {
              console.error("Element not found:", amountInRoomSelector);
            }
          } catch (error) {
            console.error("Error occurred:", error);
          }
        }
      }
      // await delay(5000);
      return result;
    }
    await art(roomSelector);

    const numbersOnly = amounts.map((amount) => {
      // Extract numbers from the string using a regular expression
      const number = parseInt(amount.replace(/\D/g, ""), 10); // Replace non-digit characters with an empty string
      return number;
    });
    const roomLeft = roomPrices.filter((price) => !numbersOnly.includes(price));

    if (isReadyToCreate) {
      await handleCreateRooms(roomLeft);
    }
  };

  while (true) {
    await delay(500);
    roomPriceTemp = [11, 15, 20, 25, 30];
    const lobbyButtonSelector = `.css-93ujpa > :first-child`;

    await handleClickSelector(lobbyButtonSelector);
    // await delay(1000); // Wait for 10 seconds

    await checkAndCreateRoom();

    isReadyToCreate = true;
    await handleClosePopup();
    // await delay(1000); // Wait for 10 seconds
  }
  // Close the browser
})();
