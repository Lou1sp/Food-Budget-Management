import { createBrowser } from "../utils/browser";
import { randomDelay, autoScroll } from "../utils/delay";
import { BaseScraper } from "./baseScraper";
import { Product } from "./baseScraper";
export class WalmartScraper implements BaseScraper {
  async scrape(query: string): Promise<Product[]> {
    const results: Product[] = [];
    const browser = await createBrowser();

    try {
      for (let pageNum = 1; pageNum <= 50; pageNum++) {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();

        await page.setExtraHTTPHeaders({
          "Accept-Language": "en-CA,en;q=0.9",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/122.0.0.0 Safari/537.36",
        });

        await page.setViewport({ width: 1440, height: 900 });
        const url = `https://www.walmart.ca/en/search?q=${encodeURIComponent(query)}&page=${pageNum}&affinityOverride=default`;
        console.log(`Scraping page ${pageNum}...`);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        console.log("Scrolling...");
        await autoScroll(page);

        await randomDelay(1500, 3000);

        await page
          .waitForFunction(
            () => {
              const lazy = document.querySelectorAll('[data-rendered="false"]');
              return lazy.length === 0;
            },
            { timeout: 10000 },
          )
          .catch(() => {
            console.log("Some items are not finish rendering, continue...");
          });

        
        const products: Product[] = await page.evaluate(() => {
          const items = document.querySelectorAll("[data-item-id]");
          const results: any[] = [];

          items.forEach((item) => {
            const title = item
              .querySelector('[data-automation-id="product-title"]')
              ?.textContent?.trim();

            if (!title) return;

            const id = item.getAttribute("data-dca-id") || undefined;

            const price =
              item
                .querySelector('div[aria-hidden="true"].b.black')
                ?.textContent?.trim() || undefined;

            const pricePerUnit =
              item
                .querySelector('[data-testid="product-price-per-unit"]')
                ?.textContent?.trim() || undefined;

            const image =
              item
                .querySelector('[data-testid="productTileImage"]')
                ?.getAttribute("src") || undefined;

            const brand =
              item.querySelector(".b.f6.black")?.textContent?.trim() ||
              undefined;

            const url =
              item.querySelector("a[link-identifier]")?.getAttribute("href") ||
              undefined;

            results.push({
              title,
              price,
              pricePerUnit,
              image,
              id,
              brand,
              source: "walmart",
              url: url ? `https://www.walmart.ca${url}` : undefined,
            });
          });

          return results;
        });

        if (products.length === 0) {
          console.log("✅ Hết sản phẩm.");
          await page.close();
          break;
        }

        console.log(`✅ Page ${pageNum}: ${products.length} sản phẩm`);
        results.push(...products);

        await page.close();
        await randomDelay(3000, 6000);
      }
    } finally {
      await browser.close();
    }

    return results;
  }
}
