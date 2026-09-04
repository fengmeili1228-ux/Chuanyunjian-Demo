import axios from 'axios';
import type { ApiResponse } from '../types';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function get<T>(url: string): Promise<T> {
  const res = await client.get<ApiResponse<T>>(url);
  if (res.data.code !== 200) {
    throw new Error(res.data.message);
  }
  return res.data.data;
}

export async function post<T>(url: string, data?: unknown): Promise<T> {
  const res = await client.post<ApiResponse<T>>(url, data);
  if (res.data.code !== 200) {
    throw new Error(res.data.message);
  }
  return res.data.data;
}

export async function put<T>(url: string, data?: unknown): Promise<T> {
  const res = await client.put<ApiResponse<T>>(url, data);
  if (res.data.code !== 200) {
    throw new Error(res.data.message);
  }
  return res.data.data;
}

export async function del<T>(url: string): Promise<T> {
  const res = await client.delete<ApiResponse<T>>(url);
  if (res.data.code !== 200) {
    throw new Error(res.data.message);
  }
  return res.data.data;
}

export default client;
