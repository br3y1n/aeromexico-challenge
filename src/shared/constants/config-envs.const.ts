const configEnvs = {
  API: process.env.NEXT_PUBLIC_API ?? "",

  TARGET_QUESTIONS: process.env.NEXT_PUBLIC_TARGET_CHARACTERS ?? "", // QuestionImplementationEnum.LOCAL,

  LOCAL_DELAY_RESPONSE_MS: Number(
    process.env.NEXT_PUBLIC_LOCAL_DELAY_RESPONSE_MS ?? 500,
  ),

  NUMBER_RETRIES_REQUEST: Number(
    process.env.NEXT_PUBLIC_NUMBER_RETRIES_REQUEST ?? 2,
  ),
};

export { configEnvs };
