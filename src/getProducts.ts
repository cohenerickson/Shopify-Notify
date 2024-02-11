import * as config from "../config.json";

type Product = {
  body_html: string;
  created_at: string;
  handle: string;
  id: number;
  images: Image[];
  options: Option[];
  product_type: string;
  published_at: string;
  tags: string[];
  title: string;
  updated_at: string;
  variants: Variant[];
  vendor: string;
};

type Image = {
  creatd_at: string;
  height: number;
  id: number;
  position: number;
  product_id: number;
  src: string;
  updated_at: string;
  variant_ids: number[];
  width: number;
};

type Option = {
  name: string;
  position: number;
  values: string[];
};

type Variant = {
  available: boolean;
  compare_at_price: string | null;
  created_at: string;
  featured_image: Image | null;
  grams: number;
  id: number;
  [key: `option${number}`]: string | null;
  position: number;
  price: string;
  product_id: number;
  requres_shipping: boolean;
  sku: string | null;
  taxable: boolean;
  title: string;
  updated_at: string;
};

export async function getProducts(
  store: keyof typeof config
): Promise<Product[]> {
  let url: string;
  try {
    url = new URL(`https://${store}/products.json`).toString();
  } catch (e) {
    url = new URL(`https://${store}.myshopify.com/products.json`).toString();
  }

  return new Promise<Product[]>(async (resolve, reject) => {
    const products = [];

    let page = 1;

    while (true) {
      try {
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();

        if (data.products.length === 0) {
          break;
        }

        products.push(...data.products);
        page++;
      } catch {
        break;
      }
    }

    resolve(products);
  });
}
