export interface Stock {
  id?: number;
  type_id: number;
  width: number;
  length: number;
  thickness: number;
  location_id: number;
  qty: number;
}

export interface Location {
  id?: number;
  loc_name: string;
}

export interface Material {
  id?: number;
  name: string;
}

export interface History {
  id?: number;
  stock_id: number;
  by_who: string;
  reason?: string;
  change_date: string;
}
