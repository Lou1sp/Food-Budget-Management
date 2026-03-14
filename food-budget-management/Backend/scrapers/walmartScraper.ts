import { createBrowser } from "../utils/browser";
import { randomDelay, autoScroll } from "../utils/delay";
import { BaseScraper } from "./baseScraper";
import { Product } from "./baseScraper";
export class WalmartScraper implements BaseScraper {
  /**
   * Scrapes Walmart Canada search results for a given query.
   * Uses Puppeteer to handle lazy-loaded content and dynamic rendering.
   * @param query - Search term to query on Walmart Canada
   * @returns Array of products with title, price, brand, image, and URL
   */
  async scrape(query: string): Promise<Product[]> {
    const results: Product[] = [];
    // Initialize browser
    const browser = await createBrowser();

    try {
      // Go to each page of the searched category
      for (let pageNum = 1; pageNum <= 50; pageNum++) {
        // Each page gets its own isolated context (separate cookies, cache)
        const context = await browser.createBrowserContext();
        const page = await context.newPage();
        // Mimic a real browser to avoid bot detection
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

        // Wait until network is idle to ensure initial content is loaded
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        // Scroll down to trigger lazy rendering of prices and product details
        console.log("Scrolling...");
        await autoScroll(page);
    
        // Additional wait to allow JS to finish rendering after scroll
        await randomDelay(1500, 3000);
        
        // Wait until all lazy placeholders are replaced with actual content
        await page
          .waitForFunction(
            () => {
              const lazy = document.querySelectorAll('[data-rendered="false"]');
              return lazy.length === 0; //until there is no placeholder
            },
            { timeout: 10000 },
          )
          .catch(() => {
            // Non-fatal: some items may not render in time, continue anyway
            console.log("Some items are not finish rendering, continue...");
          });

        // Extract product data from the fully rendered DOM 
        const products: Product[] = await page.evaluate(() => {
          const items = document.querySelectorAll("[data-item-id]");
          const results: any[] = [];

          items.forEach((item) => {
            const title = item
              .querySelector('[data-automation-id="product-title"]')
              ?.textContent?.trim();
            
            // Skip items without a title
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
            
            // Add a product with all attributes in the array
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
        
        // No products found means we have reached the last page
        if (products.length === 0) {
          console.log("✅ End of page.");
          await page.close();
          break;
        }

        console.log(`✅ Page ${pageNum}: ${products.length} products`);
        results.push(...products);

        await page.close();
        await randomDelay(3000, 6000); // Random delay between pages to avoid rate limiting
      }
    } finally {
      await browser.close();
    }

    return results;
  }
}
