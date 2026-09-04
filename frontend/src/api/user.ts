import { get, post } from './client';
import type { User } from '../types';

export interface CreateUserData {
  name: string;
  longitude?: number;
  latitude?: number;
  onlineStatus?: number;
  creditScore?: number;
  avgResponseMinutes?: number;
}

export async function createUser(data: CreateUserData): Promise<{ id: number }> {
  return post<{ id: number }>('/users', data);
}

export async function fetchUser(id: number): Promise<User> {
  return get<User>(`/users/${id}`);
}

export async function heartbeat(id: number): Promise<void> {
  return post<void>(`/users/${id}/heartbeat`);
}
