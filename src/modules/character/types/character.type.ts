import { StatusEnum } from "@enums";

interface Character {
  id: string;
  name: string;
  liked: boolean;
  status: StatusEnum;
  details: Record<string, string>;
  imageUrl: string;
}

export type { Character };
