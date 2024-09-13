import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

const appConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ["./dev-env/.env.development"],
  validationSchema: Joi.object({
    APP_PORT: Joi.number(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  }),
};

export default appConfig;
