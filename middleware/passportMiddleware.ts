import { Application } from "express";
import passport from "passport";
import PassportConfig from "./PassportConfig";

import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";

const strategies = [localStrategy, passportGitHubStrategy];
const passportConfig = new PassportConfig(strategies);
passportConfig.initializeStrategies();

// No need to actually pass the instance of passport since it returns a singleton
// const passportConfig = new PassportConfig();
// passportConfig.addStrategies();
const passportMiddleware = (app: Application): void => {
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportMiddleware;
