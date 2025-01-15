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
  if (error) throw new Error(error.message);

  return data || [];
};

export const getStockDependingOnArea = async (
  params: Record<string, string>
) => {
  const query = supabase
    .from("stock_with_area")
    .select("*")
    .order("area", { ascending: false })
    .limit(100);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.eq(key, value);
    }
  });

  const { data, error } = await query;
  if (error) throw new Error(error.message);

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
  if (error) throw new Error(error.message);
  return data;
};

export const addMaterial = async (material: Material) => {
  const { data, error } = await supabase.from("Type").insert(material);
  if (error) throw new Error(error.message);
  return data;
};

export const addLocation = async (location: Location) => {
  const { data, error } = await supabase.from("Loc").insert(location);
  if (error) throw new Error(error.message);
  return data;
};

export const addHistory = async (history: History) => {
  const { data, error } = await supabase.from("History").insert(history);
  if (error) throw new Error(error.message);
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
  if (error) throw new Error(error.message);

  return data || [];
};

export const updateStock = async (stock: Stock) => {
  // get the current stock
  const { data: currentStock } = await supabase
    .from("Stock")
    .select("qty")
    .eq("id", stock.id)
    .single();

  if (!currentStock) {
    throw new Error("Stock not found");
  }

  // Calculate new quantity
  const newQty = Number(currentStock.qty) + Number(stock.qty);

  // Update with the new calculated quantity
  const { data, error } = await supabase.from("Stock").upsert({
    id: stock.id,
    type_id: stock.type_id,
    width: stock.width,
    length: stock.length,
    thickness: stock.thickness,
    location_id: stock.location_id,
    qty: newQty,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const getStockById = async (id: string) => {
  const { data } = await supabase.from("Stock").select().eq("id", id).single();
  return data;
};

export const updateMaterial = async (material: Material) => {
  const { data, error } = await supabase.from("Type").upsert(material);
  if (error) throw new Error(error.message);
  return data;
};

export const deleteMaterial = async (id: string) => {
  const { data, error } = await supabase.from("Type").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};

export const getStockSummary = async (params: Record<string, string>) => {
  const query = supabase
    .from("stock_summary_view")
    .select("*")
    .order("area", { ascending: false })
    .limit(100);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.eq(key, value);
    }
  });

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
};
