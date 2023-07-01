import express, { Request, Response, request } from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();


router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// router.get("/login", forwardAuthenticated, (req, res) => {
//   res.render("login");
// });

router.get("/login", forwardAuthenticated, (req, res) => {
  let error = (req.session as any).messages || "";
  res.render("login", { error });
});


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true
  })

);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
