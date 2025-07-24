interface CharacterCardProps<T = unknown> {
  data: T;
  title: string;
  onLike: (data: T) => void;
  onClick: (T: T) => void;
  selected?: boolean;
  liked?: boolean;
}

export type { CharacterCardProps };
