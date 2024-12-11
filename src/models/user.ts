export type UserInfo = {
  id: number;
  user_code: string;
  username: string;
  full_name: string;
  note: string;
  // "is_show": Bool;
  group_code: ActivePermission;
  phone: string;
  email: string;
  // "note": "",
  picture?: string;
  // "birthday": null;
  gender: string;
  // "gg_id": null,
  // "fb_id": null,
  // "ap_id": null,
  // "folder_upload": "3XnZYI",
  point: number;
  // "created_at": "2024-12-04 09:54:32",
  // "updated_at": "2024-12-04 09:54:32",
  // "admin_created_at": null,
  // "admin_updated_at": null,
  // "cur_lang": "vi",
  // "show_order": 0,
  // "admin_id": null,
  // "admin_full_name": null,
  address_full: string;
  address_book: {
    full_name: string;
    phone: string;
    address: string;
    province: string;
    district: string;
  };
};

export const enum ActivePermission {
  BOTH = 'both',
  SALE = 'active',
  WARRANTY = 'warranty',
}
