import { CliFlagEnum } from "./enums/cli-flag.enum";

interface EnvConfig {
  options: string[];
  default: string;
  flagName: CliFlagEnum;
}

type CommandConfig = {
  getCommand: (flags: Record<CliFlagEnum, string>) => string;
  name: string;
  prefixColor: string;
  condition: (flags: Record<CliFlagEnum, string>) => boolean;
};

export type { EnvConfig, CommandConfig };
