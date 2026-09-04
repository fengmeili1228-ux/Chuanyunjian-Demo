import { get, post } from './client';
import type { Card } from '../types';

export interface CreateCardData {
  userId: number;
  coreTagId: number;
  tagIds: number[];
}

export async function createCard(data: CreateCardData): Promise<{ id: number }> {
  return post<{ id: number }>('/cards', data);
}

export async function fetchCard(id: number): Promise<Card> {
  return get<Card>(`/cards/${id}`);
}

export async function shareCard(id: number): Promise<Card> {
  return post<Card>(`/cards/${id}/share`);
}
