import { getApi } from "./api";
import { Category } from "@/types/category";

interface CategoryResponse {
  data: {
    expense: Category[];
    income: Category[];
  };
}

export async function fetchCategories(): Promise<CategoryResponse | undefined> {
  const res = await getApi("categorias");

  if (!res.ok) {
    console.error("Fetching categories failed");
    return;
  }

  return await res.json();
}
