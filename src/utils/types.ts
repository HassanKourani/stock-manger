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
