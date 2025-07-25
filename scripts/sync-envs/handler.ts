import { ENVS_CONFIG } from "scripts/constants/env-config";
import { EnvLine, ParsedEnv } from "./types";

export class EnvFileHandler {
  static parse(content: string): ParsedEnv {
    const lines = content.split("\n");
    const envMap = new Map<string, { value: string; comment?: string }>();
    const parsedLines: EnvLine[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      const result: EnvLine = { original: line };

      if (!trimmed || trimmed.startsWith("#")) {
        result.isComment = true;
        parsedLines.push(result);
        continue;
      }

      const match = trimmed.match(
        /^([^=#\s]+)=(".*?"|'.*?'|[^#\r\n]*)(?:\s*#(.*))?$/,
      );
      if (match) {
        result.key = match[1].trim();
        result.value = match[2].trim();
        if (match[3]) result.comment = match[3].trim();

        envMap.set(result.key, {
          value: result.value,
          comment: result.comment,
        });
      }

      parsedLines.push(result);
    }

    return { lines: parsedLines, envMap };
  }

  static generateLine(key: string, value: string): string {
    const config = ENVS_CONFIG[key];
    let line = `${key}=${value}`;

    if (config) {
      line += ` # options: ${config.options.join(" | ")}`;
    }

    return line;
  }

  static validateExampleValue(key: string, value?: string): string {
    const config = ENVS_CONFIG[key];
    if (!config) return value || "";

    if (value && config.options.includes(value)) {
      return value;
    }

    return config.default;
  }
}
