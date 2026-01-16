
export enum UserRole {
  GUEST = 'GUEST',
  TEAM_MEMBER = 'TEAM_MEMBER',
  JUDGE = 'JUDGE',
  COORDINATOR = 'COORDINATOR'
}

export interface Team {
  id: string;
  name: string;
  members: string[];
  mindclansScore: number;
  sellProductEarnings: number;
  pitchProductMarks: number;
  totalScore: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  baseValue: number;
  imageUrl: string;
}

export type GameID = 'bingo' | 'mindclans' | 'sell' | 'pitch' | 'treasure';

export interface GameMetadata {
  id: GameID;
  title: string;
  description: string;
  icon: string;
  externalLink?: string;
  color: string;
}
