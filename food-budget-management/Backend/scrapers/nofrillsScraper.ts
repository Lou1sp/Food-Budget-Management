import { BaseScraper } from "./baseScraper";
export class NoFrillsScraper extends BaseScraper {
    protected source = "nofrills";
    protected maxPages = 50;

    protected buildUrl(query: string, page: number): string {
    return `https://www.nofrills.ca/en/search?search-bar=${encodeURIComponent(query)}&storeId=3640&page=${page}`;
  }

  protected selectors = {
    item: '[class="chakra-linkbox css-yxqevf"]',
    title: '[data-testid="product-title"]',
    price: '[data-testid="regular-price"]',
    pricePerUnit: '[data-testid="product-package-size"]',
    image: '[class="chakra-image css-1qfh40k"]',
    brand: '[data-testid="product-brand"]',
    url: 'a[class="chakra-linkbox__overlay css-1hnz6hu"]',
  };
}