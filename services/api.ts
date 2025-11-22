import { use } from "react";
import { retrieveToken } from "./auth";

export interface DataFields {
  [key: string]: string | number | File;
}

export interface ApiResponse<T> {
  data: T;
}

export async function fetchApi(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: DataFields,
  useFormData: boolean = false
): Promise<Response> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const formData = new FormData();

  if (useFormData) {
    if (data) {
      Object.keys(data).forEach((key) =>
        formData.append(key, data[key] as string | Blob)
      );
    }
  }

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  let queryParams = "";

  if (method === "GET" && data) {
    queryParams = `?${new URLSearchParams(
      data as Record<string, string>
    ).toString()}`;
  }

  const body = useFormData ? formData : JSON.stringify(data);

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${await retrieveToken()}`,
  };

  if (!useFormData) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`${apiUrl}/${endpoint}${queryParams}`, {
    method,
    headers: headers,
    body: method === "POST" ? body : undefined,
  });
}

export async function postApi(
  endpoint: string,
  data?: DataFields,
  useFormData: boolean = false
): Promise<Response> {
  return fetchApi("POST", endpoint, data, useFormData);
}

export async function getApi(
  endpoint: string,
  data?: DataFields
): Promise<Response> {
  return fetchApi("GET", endpoint, data);
}

export async function putApi(
  endpoint: string,
  data?: DataFields
): Promise<Response> {
  return fetchApi("PUT", endpoint, data);
}

function getCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}
