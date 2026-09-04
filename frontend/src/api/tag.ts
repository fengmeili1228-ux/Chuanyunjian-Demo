import { get, post, put, del } from './client';
import type { Tag } from '../types';

export interface CreateTagData {
  name: string;
  parentId: number;
  category: string;
}

export interface UpdateTagData {
  name: string;
  parentId: number;
  category: string;
}

export async function fetchTags(): Promise<Tag[]> {
  return get<Tag[]>('/tags');
}

export async function createTag(data: CreateTagData): Promise<{ id: number }> {
  return post<{ id: number }>('/tags', data);
}

export async function updateTag(id: number, data: UpdateTagData): Promise<void> {
  return put<void>(`/tags/${id}`, data);
}

export async function deleteTag(id: number): Promise<void> {
  return del<void>(`/tags/${id}`);
}
