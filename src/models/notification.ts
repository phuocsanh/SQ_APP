export type NotificationDetail = {
  id: number;
  item_id: number;
  type_of: string;
  user_id: string;
  title: string;
  short: string;
  content: string;
  is_show: number;
  show_order: number;
  created_at: number;
  admin_id: number;
  admin_full_name: string;
  viewed: {
    notification_item_id: number;
    user_id: number;
  } | null;
};
export type NotificationItem = Pick<
  NotificationDetail,
  'item_id' | 'created_at' | 'viewed' | 'title'
>;
