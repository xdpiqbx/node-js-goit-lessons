const { HttpCode } = require("../helpers/constants");
const { AuthService, UsersService } = require("../services");
const fs = require("fs").promises;
const createFolderIsExist = require("../helpers/create-dir");
const path = require("path");
var Jimp = require("jimp");
const { promisify } = require("util");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();

const authService = new AuthService();
const usersService = new UsersService();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_CLOUD_SECRET,
});

const uploadCloud = promisify(cloudinary.uploader.upload);
// теперь uploadCloud будет возвращать промис

const registration = async (req, res, next) => {
  const { name, email, password, sex } = req.body;
  const user = await usersService.findByEmail(email);
  if (user) {
    // если нашел по email значит он есть или раньше рег под этим email
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "This email is already use",
    });
  }
  try {
    const newUser = await usersService.create({ name, email, password, sex });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        avatar: newUser.avatar,
        sex: newUser.sex,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          token,
        },
      });
    }
    next({
      status: HttpCode.UNATHORIZED,
      message: "Invalid credentials",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user.id;
  await authService.logout(userId);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT, message: "Nothing" });
};

const avatars = async (req, res, next) => {
  // благодаря upload.single("avatar")
  // req.file is the `avatar` file
  try {
    const id = req.user.id;
    // const avatarUrl = await saveAvatarToStatic(req);
    const {
      public_id: imgIdCloud,
      secure_url: avatarUrl,
    } = await saveAvatarToCloud(req);
    await usersService.updateAvatar(id, avatarUrl, imgIdCloud);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

const saveAvatarToStatic = async (req) => {
  const id = req.user.id;
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
  const pathFile = req.file.path; // тут путь файла приходит
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
  const avatarUrl = path.normalize(path.join(id, newNameAvatar));
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar)
    );
  } catch (error) {
    console.log(error.message);
  }
  return avatarUrl;
};

const saveAvatarToCloud = async (req) => {
  const pathFile = req.file.path;
  const result = await uploadCloud(pathFile, {
    folder: "goit/avatars",
    transformation: { width: 250, height: 250, crop: "fill" },
  });
  cloudinary.uploader.destroy(req.user.imgIdCloud, (error, result) => {
    console.log(error, result);
  });
  try {
    await fs.unlink(pathFile);
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

module.exports = {
  registration,
  login,
  logout,
  avatars,
  saveAvatarToStatic,
  saveAvatarToCloud,
};
