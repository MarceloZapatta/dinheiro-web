import { retrieveToken } from "./auth";
import { Category } from "@/types/category";

interface CategoryResponse {
  data: {
    expense: Category[];
    income: Category[];
  };
}

export async function fetchCategories(): Promise<CategoryResponse | undefined> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/categorias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
  });

  if (!res.ok) {
    console.error("Fetching categories failed");
    return;
  }

  return await res.json();
}
