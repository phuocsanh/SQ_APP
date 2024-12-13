export type UserInfo = {
  _id: number;
  email: string;
  name: string;
  note: string;
  group_code: ActivePermission;
  phone: string;
  picture?: string;
  gender: string;

  point: number;

  address_full: string;
};

export const enum ActivePermission {
  BOTH = 'both',
  SALE = 'active',
  WARRANTY = 'warranty',
}
