
import {HTTP} from '../util/http-p.js'

class BookModel extends HTTP {
  getHotBooKList(){
    return this.request({url: '/book/hot_list'})
  }

  getBookCount(){
    return this.request({url: '/book/favor/count'})
  }

  //获取书籍详情
  getBookDetail(bookId){
    return this.request({url: '/book/'+bookId+'/detail'})
  }

  //获取书籍点评
  getBookComments(bookId){
    return this.request({url: '/book/'+bookId+'/short_comment'})
  }

  //获取书籍点赞状态
  getBookFavoStatus(bookId){
    return this.request({ url: '/book/'+bookId+'/favor'})
  }

  //提交点评
  postComment(bookId, comment){
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data:{
        book_id: bookId,
        content: comment
      }
    })
  }
}

export {BookModel}