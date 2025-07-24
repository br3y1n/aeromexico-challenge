interface CharacterApiResponse {
  id: string;
  name: string;
  status: string;
  details: Record<string, string>;
  imageUrl: string;
}

export type { CharacterApiResponse };
