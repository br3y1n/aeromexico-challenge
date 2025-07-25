interface EnvLine {
  key?: string;
  value?: string;
  comment?: string;
  original: string;
  isComment?: boolean;
}

interface ParsedEnv {
  lines: EnvLine[];
  envMap: Map<string, { value: string; comment?: string }>;
}

export type { EnvLine, ParsedEnv };
