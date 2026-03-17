import { getApi } from "./api";

interface ColorResponse {
  data: Cor[];
}

export async function fetchColors(): Promise<ColorResponse | undefined> {
  const res = await getApi("cores");

  if (!res.ok) {
    console.error("Fetching colors failed");
    return;
  }

  return await res.json();
}
