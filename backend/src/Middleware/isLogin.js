import jwt from "jsonwebtoken";

export const isLogin = (req, res, Next) => {

  let token = req.header("Authorization");
  if (!token) return res.status(400).json({ message: "No Token" });


  const validToken = jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    Next();
  });


};
