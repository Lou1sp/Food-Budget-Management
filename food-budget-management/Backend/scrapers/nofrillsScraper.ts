import { BaseScraper } from "./baseScraper";
export class NoFrillsScraper extends BaseScraper {
    protected source = "nofrills";
    protected maxPages = 50;

    protected buildUrl(query: string, page: number): string {
    return `https://www.walmart.ca/en/search?q=${encodeURIComponent(query)}&page=${page}&affinityOverride=default`;
  }

  protected selectors = {
    item: "[data-item-id]",
    title: '[data-automation-id="product-title"]',
    price: 'div[aria-hidden="true"].b.black',
    pricePerUnit: '[data-testid="product-price-per-unit"]',
    image: '[data-testid="productTileImage"]',
    brand: ".b.f6.black",
    url: "a[link-identifier]",
  };
}