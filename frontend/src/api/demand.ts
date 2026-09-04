import { get, post } from './client';
import type { Demand, MatchResult } from '../types';

export interface CreateDemandData {
  userId: number;
  title: string;
  tagIds: number[];
  budget: number;
  urgency: string;
  longitude: number;
  latitude: number;
  address: string;
}

export async function createDemand(data: CreateDemandData): Promise<{ id: number }> {
  return post<{ id: number }>('/demands', data);
}

export async function fetchDemand(id: number): Promise<Demand> {
  return get<Demand>(`/demands/${id}`);
}

export async function fetchMatches(id: number): Promise<MatchResult[]> {
  return get<MatchResult[]>(`/demands/${id}/matches`);
}
