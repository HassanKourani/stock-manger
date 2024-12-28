import supabase from "./supabase";
import { History, HistoryView, Location, Material, Stock } from "./types";

export const getStock = async (params: Record<string, string>) => {
  const query = supabase
    .from("Stock")
    .select("*")
    .order("last_updated", { ascending: false })
    .limit(100);

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

export const addMaterial = async (material: Material) => {
  const { data, error } = await supabase.from("Type").insert(material);
  if (error) console.error("Supabase error:", error);
  return data;
};

export const addLocation = async (location: Location) => {
  const { data, error } = await supabase.from("Loc").insert(location);
  if (error) console.error("Supabase error:", error);
  return data;
};

export const addHistory = async (history: History) => {
  const { data, error } = await supabase.from("History").insert(history);
  if (error) console.error("Supabase error:", error);
  return data;
};

export const getHistory = async (
  params: Record<string, string>
): Promise<HistoryView[]> => {
  const query = supabase
    .from("stock_history_view")
    .select("*")
    .order("change_date", { ascending: false })
    .limit(50);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.eq(key, value);
    }
  });

  const { data, error } = await query;
  if (error) console.error("Supabase error:", error);

  return data || [];
};
