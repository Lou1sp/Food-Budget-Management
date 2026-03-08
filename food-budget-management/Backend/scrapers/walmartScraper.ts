import puppeteer from "puppeteer";

export async function scrapeWalmart(product: string) {

  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    `https://www.walmart.ca/search?q=${product}`,
    { waitUntil: "networkidle2" }
  );

  const products = await page.evaluate(() => {

    const items = Array.from(document.querySelectorAll(".product-tile"));

    return items.map(el => {

      const name =
        el.querySelector(".product-title")?.textContent;

      const price =
        el.querySelector(".price-main")?.textContent;

      return { name, price };

    });

  });

  await browser.close();

  return products;
}