import fs from "fs";
import path from "path";
import { ParsedEnv } from "./types";
import { EnvFileHandler } from "./handler";
import { CliFlagEnum } from "scripts/enums/cli-flag.enum";
import { ENVS_CONFIG } from "scripts/constants/env-config";

class EnvSynchronizer {
  private args: Record<CliFlagEnum, string>;
  private envExamplePath: string;
  private envPath: string;

  constructor() {
    this.args = this._parseCliArgs();
    this.envExamplePath = path.join(process.cwd(), ".env.example");
    this.envPath = path.join(process.cwd(), ".env");
  }

  private _parseCliArgs(): Record<CliFlagEnum, string> {
    const args = process.argv.slice(2);

    return args.reduce<Record<string, string>>((flags, currentArg) => {
      const [key, value] = currentArg.replace(/^--/, "").split("=");
      flags[key] = value;
      return flags;
    }, {});
  }

  private _validateAndUpdateExample(): ParsedEnv {
    console.log("[1/3] Validating .env.example file...");

    const exampleContent = fs.readFileSync(this.envExamplePath, "utf-8");
    let exampleEnv = EnvFileHandler.parse(exampleContent);

    const updatedExampleLines = exampleEnv.lines.map((line) => {
      if (!line.key) return line.original;

      const validValue = EnvFileHandler.validateExampleValue(
        line.key,
        line.value,
      );

      return EnvFileHandler.generateLine(line.key, validValue);
    });

    fs.writeFileSync(this.envExamplePath, updatedExampleLines.join("\n"));

    console.log("✓ .env.example validated and updated");
    return EnvFileHandler.parse(updatedExampleLines.join("\n"));
  }

  private _processExistingEnv(exampleEnv: ParsedEnv): string[] {
    console.log("[2/3] Processing existing .env file...");

    let existingEnv: ParsedEnv = { lines: [], envMap: new Map() };
    const outputLines: string[] = [];

    if (fs.existsSync(this.envPath)) {
      const existingContent = fs.readFileSync(this.envPath, "utf-8");
      existingEnv = EnvFileHandler.parse(existingContent);
    }

    for (const line of existingEnv.lines) {
      if (!line.key) {
        outputLines.push(line.original);
        continue;
      }

      if (exampleEnv.envMap.has(line.key)) {
        const config = ENVS_CONFIG[line.key];
        let value = line.value || "";

        if (config) {
          const argValue = this.args[config.flagName];

          value =
            argValue && config.options.includes(argValue)
              ? argValue
              : config.default;
        }

        outputLines.push(EnvFileHandler.generateLine(line.key, value));
        exampleEnv.envMap.delete(line.key);
      } else {
        outputLines.push(line.original);
      }
    }

    return outputLines;
  }

  private _addMissingVariables(
    outputLines: string[],
    exampleEnv: ParsedEnv,
  ): string[] {
    console.log("[3/3] Adding missing variables...");

    if (exampleEnv.envMap.size > 0) {
      const hasOutputLines = outputLines.length > 0;

      if (hasOutputLines) outputLines.push("");
      else return exampleEnv.lines.map(({ original }) => original);

      outputLines.push("# Generated from .env.example");
      outputLines.push("");

      for (const [key, entry] of exampleEnv.envMap) {
        const config = ENVS_CONFIG[key];
        const value = config?.default || entry.value || "";

        outputLines.push(EnvFileHandler.generateLine(key, value));
      }
    }

    return outputLines;
  }

  public execute(): void {
    try {
      console.log("Starting environment synchronization process...");

      const exampleEnv = this._validateAndUpdateExample();

      let outputLines = this._processExistingEnv(exampleEnv);

      outputLines = this._addMissingVariables(outputLines, exampleEnv);

      fs.writeFileSync(this.envPath, outputLines.join("\n"));

      console.log("✓ .env file successfully synchronized");
      console.log("Environment synchronization completed!");
    } catch (error) {
      console.error(
        "✗ Error:",
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  }
}

new EnvSynchronizer().execute();
