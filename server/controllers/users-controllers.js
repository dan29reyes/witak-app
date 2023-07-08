const HTTPCodes = require("../utils/HTTPCodes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { isEmail } = require("../utils/validator");
const { registerUser, getCredentials, forgotPassword } = require("../services/user-services");

async function register(req, res) {
  try{
    const { email, password } = req.body;
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 30000, 64, "sha256")
        .toString("base64");
      const [newUserId] = await registerUser({
        ...req.body,
        encryptedPassword,
        salt,
      });

      res.send({
        success: true,
        newUserId,
      });
    }
  }catch(e){
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
      detail: e.toString(),
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try{
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid");
    }
    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const [credentials] = await getCredentials(email);
      const encryptedPassword = crypto
        .pbkdf2Sync(password, credentials.salt_usuario, 30000, 64, "sha256")
        .toString("base64");
      if (encryptedPassword == credentials.pass_usuario) {
        const accessToken = jwt.sign({ email }, process.env.TOKEN_KEY || "AS4D5FF6G78NHCV7X6X5C",{
          expiresIn: "1d",
        });
        const refreshToken = jwt.sign({ email }, process.env.TOKEN_KEY || "AS4D5FF6G78NHCV7X6X5C",{
          expiresIn: "1m",
        });
        res.send({
          success: true,
          data: {
            accessToken,
            refreshToken,
            id_user: credentials.id_user,
          }
        });
      } else {
        res.status(HTTPCodes.UNAUTHORIZED).send({
          message: "Contrasena incorrecta",
        });
      }
    }
  }catch(e){
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      message:"Try again later",
    })
  }
}

async function forgot(req, res) {
  try{
    const { email, password } = req.body;
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 30000, 64, "sha256")
        .toString("base64");
      await forgotPassword({
        ...req.body,
        encryptedPassword,
        salt,
      });

      res.send({
        success: true,
        message: "password updated"
      });
    }
  }catch(e){
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
      detail: e.toString(),
    });
  }
}

module.exports = {
  register,
  login,
  forgot,
};