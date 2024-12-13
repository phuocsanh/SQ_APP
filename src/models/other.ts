export type Banner = {
  _id: string;
  banner: number;
  type_app: 'APP' | 'WEB';
  type_page: 'HOME' | 'PRODUCT';
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
