//Create a function that whenever it's called, delay for a random amount of time, using await
export function randomDelay(min = 2000, max = 5000) {
    const ms = Math.random() * (max - min) + min;
    return new Promise(r => setTimeout(r, ms));
}

//Autoscroll down the page
export async function autoScroll(page: any){
  //evaluate() means puppeteer will send the function into the browser, and browser run that function, return result to nodejs
  await page.evaluate(async () => {
    //Scroll 200px every 150ms, till to the end of the page then finish the Promise
    await new Promise<void>(resolve => {
      let totalHeight = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 200);
        totalHeight += 200;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
}