import fetch from "node-fetch";
import { load } from "cheerio";

interface Product {
  title: string;
  price?: string;
  image?: string;
  id?: string;
}

export async function scrapeWalmart(query: string): Promise<Product[]> {
  try {
    const url = `https://www.walmart.ca/en/search?q=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "accept-language": "en-CA,en;q=0.9",
      },
    });
    
    //get the html of the page
    const html = await res.text();
    
    //load html using cheerio, turn HTML into DOM TREE, then we can find the NEXT_DATA using $("")
    const $ = load(html);

    //All state of the page is inside a script with id=__NEXT_DATA__, so we get that specific part
    const jsonText = $("#__NEXT_DATA__").html();

    if (!jsonText) {
      console.log("No NEXT_DATA found");
      return [];
    }

    const data: any = JSON.parse(jsonText);

    const items =
      data?.props?.pageProps?.initialData?.searchResult?.itemStacks?.[0]?.items || [];

    const products: Product[] = items.map((item: any) => ({
      title: item.name,
      price: item.priceInfo?.currentPrice?.priceString,
      image: item.image,
      id: item.usItemId,
    }));

    return products;
  } catch (err) {
    console.error("Walmart scrape error:", err);
    return [];
  }
}