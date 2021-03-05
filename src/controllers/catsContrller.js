const { HttpCode } = require("../helpers/constants");
const { CatsService } = require("../services");

const catsService = new CatsService();

// в guard на каждом req добавил пользователя! req.user = user;
const getAll = async (req, res, next) => {
  // почему не пишет async ?
  try {
    const userId = req.user.id;
    const cats = await catsService.getAll(userId);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        cats,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsService.getById(req.params, userId);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Cat not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsService.create({ ...req.body, owner: userId });
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        cat,
      },
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsService.update(req.params, req.body, userId);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Cat not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsService.update(req.params, req.body, userId);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Cat not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsService.remove(req.params, userId);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: "Cat not found",
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
