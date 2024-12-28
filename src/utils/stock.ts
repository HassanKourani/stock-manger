import supabase from "./supabase";
import { Location, Material, Stock } from "./types";

export const getStock = async (params: Record<string, string>) => {
  const query = supabase.from("Stock").select("*");

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.eq(key, value);
    }
  });

  const { data, error } = await query;
  if (error) console.error("Supabase error:", error);

  return data || [];
};

export async function getLocations(): Promise<Location[]> {
  const { data } = (await supabase.from("Loc").select()) as {
    data: Location[];
  };
  return data;
}

export async function getMaterials(): Promise<Material[]> {
  const { data } = (await supabase.from("Type").select()) as {
    data: Material[];
  };
  return data;
}

export const addStock = async (stock: Stock) => {
  const { data, error } = await supabase.from("Stock").insert(stock);
  if (error) console.error("Supabase error:", error);
  return data;
};
