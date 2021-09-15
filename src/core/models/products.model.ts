export interface Product {
  catalog_id: number;
  category: Category;
  id: number;
  images: Image[];
  name: string;
  price: string;
  reference: string;
  variants: Variant[];
}

export interface Image {
  id: number;
  pos: number;
  product_id: number;
  url: string;
  url_original: string;
}

export interface Category {
  active: number;
  categories?: Category[];
  category: string;
  image: string;
  id: number;
  name: string;
}

export interface Variant {
  custitem_tj_category: string;
  id: number;
  price: string;
  product_id: number;
  quantity: number;
  size: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
  price: number;
}

export interface ProductPrice {
  productid: number;
  price: string;
}
