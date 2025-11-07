export interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

export async function handleLoginService(data: LoginData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Login failed");
    return;
  }

  const result: LoginResponse = await res.json();

  localStorage.setItem("access_token", result.data.access_token);
  localStorage.setItem("token_type", result.data.token_type);
  localStorage.setItem("expires_in", result.data.expires_in.toString());
}

export async function retrieveToken() {
  const token = localStorage.getItem("access_token");
  return token;
}
