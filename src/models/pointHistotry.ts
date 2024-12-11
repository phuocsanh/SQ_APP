export type PointHistoryItem = {
  id: number;
  type: 'warranty' | 'active';
  event_id: number;
  title: string;
  user_id: number;
  value_type: number;
  value: number;
  value_before: number;
  value_after: number;
  created_at: number;
};
