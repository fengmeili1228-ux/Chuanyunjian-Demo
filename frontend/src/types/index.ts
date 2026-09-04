export interface Tag {
  id: number;
  name: string;
  parentId: number;
  category: string;
  children?: Tag[];
}

export interface User {
  id: number;
  name: string;
  online: boolean;
  creditScore: number;
  avgResponseMinutes: number;
  tags: Tag[];
}

export interface Card {
  id: number;
  userId: number;
  name: string;
  coreTag: string;
  tags: string[];
  creditScore: number;
  address: string;
  shareCount: number;
  shareLimit: number;
  unlocked: boolean;
}

export interface Demand {
  id: number;
  title: string;
  budget: number;
  urgency: string;
  tags: string[];
  address: string;
}

export interface MatchResult {
  userId: number;
  name: string;
  tags: string[];
  distance: number;
  online: boolean;
  responseMinutes: number;
  creditScore: number;
  tagMatchRate: number;
  matchScore: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
