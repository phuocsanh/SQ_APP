export type ProductItem = {
  item_id: number;
  item_code: string;
  title: string;
  picture: string;
  price_sale: number;
};

export type ProductGroupItem = {
  group_id: number;
  title: string;
};

export type ProductBanner = {
  content: string;
};

export type ProductDetail = {
  id: number;
  item_id: number;
  title: string;
  item_code: string;
  picture: string;
  arr_picture: string[];
  price: number;
  price_sale: number;
  short: {
    [key: string]: {
      key: string;
      value: string;
    };
  };
  content: string;
  friendly_link: string;
  show_order: number;
  is_show: number;
  is_focus: number;
  num_sold: number;
  num_view: number;
};

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
