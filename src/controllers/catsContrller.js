const { HttpCode } = require("../helpers/constants");
const { CatsService } = require("../services");

const catsService = new CatsService()

const getAll = (req, res, next) => { // почему не пишет async ?
  try{
    const cats = catsService.getAll()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        cats
      }
    })
  } catch(e) {
    next(e)
  }
};

const getById = (req, res, next) => {
  try{
    const cat = catsService.getById(req.params)
    if(cat){
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat
        }
      })
    }else{
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Cat not found',
        data: 'Not found'
      })
    }
  } catch(e) {
    next(e)
  }
};

const create = (req, res, next) => {
  try{
    const cat = catsService.create(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        cat
      }
    })
  } catch(e) {
    next(e)
  }
};

const update = (req, res, next) => {
  try{
    const cat = catsService.update(req.params, req.body)
    if(cat.id){
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat
        }
      })
    }else{
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Cat not found',
        data: 'Not found'
      })
    }
  } catch(e) {
    next(e)
  }
};

const updateStatus = (req, res, next) => {
  try{
    const cat = catsService.update(req.params, req.body)
    if(cat){
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat
        }
      })
    }else{
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Cat not found',
        data: 'Not found'
      })
    }
  } catch(e) {
    next(e)
  }
};

const remove = (req, res, next) => {
  try{
    const cat = catsService.remove(req.params)
    if(cat){
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat
        }
      })
    }else{
      // пробрасываю в app -> app.use((err, req, res, next) => {....
      return next({
        status: HttpCode.NOT_FOUND,
        code: HttpCode.NOT_FOUND,
        message: 'Cat not found',
        data: 'Not found'
      })
    }
  } catch(e) {
    next(e)
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
