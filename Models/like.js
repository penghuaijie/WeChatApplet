import {HTTP} from '../util/http.js'

class FavorateModel extends HTTP {
  like(behavior, artID, category){
    this.request({
      url: behavior=='like'? "/like":"/like/cancel",
      method: "POST",
      data:{
        art_id: artID,
        type: category
      }
    })
  }
}

export {FavorateModel}