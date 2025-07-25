import { Command } from "commander";
import concurrently from "concurrently";
import { CliFlagEnum } from "../enums/cli-flag.enum";
import { ENVS_CONFIG } from "scripts/constants/env-config";
import { SERVERS_OPTIONS } from "scripts/constants/servers-options";

const program = new Command();

Object.entries(ENVS_CONFIG).forEach(([envVar, config]) => {
  program.option(
    `--${config.flagName} <value>`,
    `Define target for ${envVar} (options: ${config.options.join(", ")})`,
    config.default,
  );
});

program.parse(process.argv);
const cliFlags = program.opts<Record<CliFlagEnum, string>>();

Object.values(ENVS_CONFIG).forEach((config) => {
  const flagValue = cliFlags[config.flagName].toLowerCase();

  if (!config.options.includes(flagValue)) {
    console.error(
      `❌ Invalid value for --${config.flagName}: ${flagValue}. Valid options: ${config.options.join(", ")}`,
    );
    process.exit(1);
  }
});

const commandsToRun = SERVERS_OPTIONS.filter((config) =>
  config.condition(cliFlags),
).map((config) => ({
  ...config,
  command: config.getCommand(cliFlags),
}));

(async () => {
  try {
    console.log(
      "🚀 Starting services:",
      commandsToRun.map((c) => c.name).join(", "),
    );

    const { result } = concurrently(commandsToRun, {
      prefix: "{name}",
      killOthersOn: ["failure"],
      restartTries: 1,
      cwd: process.cwd(),
    });

    await result;
  } catch (error) {
    console.error("❌ Failed to start services:", error);
    process.exit(1);
  }
})();
