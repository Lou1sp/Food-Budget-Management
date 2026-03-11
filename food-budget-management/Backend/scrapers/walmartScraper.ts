import fetch from "node-fetch";
import { load } from "cheerio";

interface Product {
  title: string;
  price?: string;
  pricePerUnit?: string;
  image?: string;
  id?: string;
  brand?: string;
}

export async function scrapeWalmart(query: string) {
  const results: Product[] = [];

  for (let page = 1; page <= 10; page++) {
    try {
      const url = `https://www.walmart.ca/en/search?q=${encodeURIComponent(query)}&page=${page}&affinityOverride=default`;

      const res = await fetch(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "accept-language": "en-CA,en;q=0.9",
        },
      });

      const html = await res.text();
      const $ = load(html);

      const jsonText = $("#__NEXT_DATA__").html();
      if (!jsonText) {
        console.log("No NEXT_DATA found");
        break;
      }

      const data: any = JSON.parse(jsonText);
      const items =
        data?.props?.pageProps?.initialData?.searchResult?.itemStacks?.[0]
          ?.items || [];

      const priceContainers = $('div[data-automation-id="product-price"]');

      const products: Product[] = items.map((item: any, index: number) => {
        const container = priceContainers.eq(index);

        const price =
          container.find("div[aria-hidden='true']").first().text().trim() ||
          undefined;

        const pricePerUnit =
          container
            .find('div[data-testid="product-price-per-unit"]')
            .text()
            .trim() || undefined;

        // Brand: JSON first, DOM fallback
        const brand =
          item.brand ||
          item.brandName ||
          $(`[data-automation-id="product-brand"]`).eq(index).text().trim() ||
          undefined;

        return {
          title: item.name,
          price,
          pricePerUnit,
          image: item.image,
          id: item.usItemId,
          brand,
        };
      });

      if (products.length === 0) break;
      results.push(...products);
    } catch (err) {
      console.error("Walmart scrape error:", err);
      break;
    }
  }

  return results;
}