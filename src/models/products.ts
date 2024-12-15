export type ProductItem = {
  _id: string;
  product_name: string;
  product_price: number;
  product_thumb: string;
  product_type: ProductType;
  product_discountedPrice: number;
  product_selled: number;
  discount: number;
  product_ratingsAverage: number;
};

export type ProductType = 'Electronic' | 'Clothing' | 'Furniture' | 'Wallet_Bag' | 'Watch';
export type ProductGroupItem = {
  group_id: number;
  title: string;
};

export type ProductBanner = {
  content: string;
};

export interface ProductDetail {
  _id: string;
  product_name: string;
  product_price: number;
  product_thumb: string;
  product_ratingsAverage: number;
  product_variations: any[];
  product_description: string;
  product_quantity: number;
  product_type: ProductType;
  product_shop: string;
  discount: number;
  product_discountedPrice: number;
  product_selled: number;
  product_attributes: ProductAttributes;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttributes {
  brand: string;
  size: string;
  material: string;
}

export type ProductInfo = {
  product: {
    id: number;
    title: string;
    /** Tên model */
    item_code: string;
    group: {
      group_id: number;
      title: string;
    };
    picture: string;
  };
  /** Mã kíchh hoạt */
  active_code: string;
  /** Mã Serial */
  serial_code: string;
  qrcode: string;
  /** Ngày sản xuất */
  manufacture_at: number;
  /** Ngày KH bán hàng */
  actived_at?: number;
  /** Ngày KH bảo hành */
  warrantied_at?: number;
  warranty: {
    warranty_end: number;
    /** Số ngày */
    warranty_remain: number;
    warranty_remain_text: string;
    warranty_range: string;
  };
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  customer_address?: string;
  customer_province?: string;
  customer_district?: string;
};

export type ActiveProductResult = {
  title: string;
  mess: string;
  note?: {
    title: string;
    content: string;
    point: number;
  };
  error?: string[];
};
