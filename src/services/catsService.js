const { CatsRepo } = require('../repositories')

class CatsService {
  constructor(){
    this.repo = {
      cats: new CatsRepo()
    }
  }

  getAll(){
    return this.repo.cats.getAll()
  }

  getById({id}){
    return this.repo.cats.getById(id)
  }

  create(body){
    return this.repo.cats.create(body)
  }

  update({id}, body){
    return this.repo.cats.update(id, body)
  }

  updateStatus({id}, body){
    return this.repo.cats.updateStatus(id, body)
  }

  remove({id}){
    return this.repo.cats.remove(id)
  }
}

module.exports = CatsService