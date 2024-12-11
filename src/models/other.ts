export type HomeData = {
  banner: {
    title: string;
    group_id: number;
    link: string;
    content: string;
  }[];
  news: {
    title: string;
    item_id: string;
    picture: string;
    created_at: number;
    group: {
      title: string;
    };
  }[];
  product: {
    title: string;
    item_id: number;
    picture: string;
    created_at: number;
    item_code: string;
    price_sale: number;
  }[];
};

export type NewsData = {
  data: {
    title: string;
    picture: string;
    created_at: number;
    group: {
      title: string;
    };
  }[];
};

export type NewsDetailData = {
  picture: string;
  title: string;
  short: string;
  content: string;
  created_at: number;
};

export const enum ScanType {
  /** Quét chung */
  GENERAL,
  /** Quét kích hoạt bán hàng */
  SALE,
  /** Quét kích hoạt bảo hành */
  WARRANTY,
  /** Quét tra cứu sản phẩm */
  LOOK_UP,
}

/**
 * Loại kích hoạt: bán hàng / bảo hành
 */
export const enum ActiveType {
  /** kích hoạt bán hàng */
  SALE = 'active',
  /** kích hoạt bảo hành */
  WARRANTY = 'warranty',
}
