import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
  try {
      const users = await Users.findAll({
          attributes:['id','name','email']
      });
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const Register = async (req, res) => {
  const { name, email, nomer, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password Tidak Cocok" });
      const salt = await bcrypt.genSalt();
      const hassPassword = await bcrypt.hash(password,salt);

      try {
        await Users.create({
            name : name,
            email : email,
            nomer_hp : nomer,
            password  : hassPassword
        });
    res.json({msg : "registrasi berhasil"});
      } catch (err) {
        console.log(err);
      }


};  

export const Login = async (req, res) => {
    try {
      const user = await Users.findAll({
        where: {
          email: req.body.email
        }
      });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) return res.status(400).json({ msg: "Wrong Password" });
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
      });
      const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      await Users.update({ refresh_token: refreshToken }, {
        where: {
          id: userId
        }
      });
  
      if (req.body.email === "adminzoepy@gmail.com") {
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, redirectTo: '/admin' });
      } else {
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, redirectTo: '/' });
      }
    } catch (error) {
      res.status(404).json({ msg: "Email tidak ditemukan" });
    }
  };
  

export const Logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
      where:{
          refresh_token: refreshToken
      }
  });
  if(!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update({refresh_token: null},{
      where:{
          id: userId
      }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}
