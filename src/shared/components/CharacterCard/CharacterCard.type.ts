interface CharacterCardProps<T = unknown> {
  data: T;
  title: string;
  onLike: (data: T) => void;
  onClick: (T: T) => void;
  selected?: boolean;
  liked?: boolean;
  className?: string;
}

export type { CharacterCardProps };
