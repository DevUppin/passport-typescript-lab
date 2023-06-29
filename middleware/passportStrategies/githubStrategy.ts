import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
const User = require('../../models/userModel');
import { Request } from 'express';
import { getUserById } from "../../controllers/userController";
import passport from "passport";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "29c55fecb36ecd237a78",
        clientSecret: "c4379a6f6123038058b86bd81a874ef321a55458",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
        console.log(profile);
        return done(null, profile);
    }

);
declare global {
    namespace Express {
        interface User {
          email: string;
        }
    }
  }

passport.serializeUser(function (user: Express.User, done: (err: any, email: string) => void) {
    done(null, user.email);
  });

passport.deserializeUser(function (id: number, done: any) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

  


const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
