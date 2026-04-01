import { createBrowser } from "../utils/browser";
import { randomDelay, autoScroll } from "../utils/delay";
export interface Product {
  title: string;
  price?: string;
  pricePerUnit?: string;
  image?: string;
  id?: string;
  brand?: string;
  source: string;
  url?: string;
}

export interface ScrapeSelectors {
  item: string;
  title: string;
  price: string;
  pricePerUnit: string;
  image: string;
  brand: string;
  url: string;
}

export abstract class BaseScraper {
  // Each scrapers defines its own attribute
  protected abstract buildUrl(query: string, page: number): string;
  protected abstract selectors: ScrapeSelectors;
  protected abstract source: string;
  protected maxPages: number = 50;

  async scrape(query: string): Promise<Product[]> {
    const results: Product[] = [];
    const browser = await createBrowser();

    try {
      for (let pageNum = 1; pageNum <= this.maxPages; pageNum++) {
        const context = await browser.createBrowserContext();
        const page = await context.newPage();

        await page.setExtraHTTPHeaders({
          "Accept-Language": "en-CA,en;q=0.9",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
        });
        await page.setViewport({ width: 1440, height: 900 });

        const url = this.buildUrl(query, pageNum);
        console.log(`Scraping page ${pageNum}...`);

        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
        await autoScroll(page);
        await randomDelay(1500, 3000);

        await page
          .waitForFunction(
            () =>
              document.querySelectorAll('[data-rendered="false"]').length === 0,
            { timeout: 10000 },
          )
          .catch(() => console.log("Some items not rendered, continuing..."));

        // Inject selectors into browser context
        const sel = this.selectors;
        const source = this.source;

        const products: Product[] = await page.evaluate(
          (sel, source) => {
            const items = document.querySelectorAll(sel.item);
            const results: any[] = [];

            items.forEach((item) => {
              const title = item.querySelector(sel.title)?.textContent?.trim();
              if (!title) return;

              const href = item.querySelector(sel.url)?.getAttribute("href");
              let url: string | undefined;

              if (href) {
                try {
                  // Create new URL from the relative one
                  url = new URL(href, window.location.origin).href;
                } catch {
                  url = undefined;
                }
              }

              results.push({
                title,
                price: item.querySelector(sel.price)?.textContent?.trim(),
                pricePerUnit: item
                  .querySelector(sel.pricePerUnit)
                  ?.textContent?.trim(),
                image: item.querySelector(sel.image)?.getAttribute("src"),
                brand: item.querySelector(sel.brand)?.textContent?.trim(),
                id: item.getAttribute("data-dca-id") || item.querySelector("h3[id]")?.getAttribute("id"),
                source,
                url,
              });
            });

            return results;
          },
          sel,
          source,
        );

        if (products.length === 0) {
          console.log("✅ End of pages.");
          await page.close();
          break;
        }

        console.log(`✅ Page ${pageNum}: ${products.length} products`);
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
