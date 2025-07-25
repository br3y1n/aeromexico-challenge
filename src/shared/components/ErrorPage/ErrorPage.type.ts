interface ErrorPageProps {
  title?: string;
  description?: string;
  button?: {
    text: string;
    onClick: () => void;
  };
}

export type { ErrorPageProps };
