const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.length === 0
      ? 0 
      : blogs.reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
    const reducer = (blog, item) => {
      if(blog.likes > item.likes){
        return blog
      }else{
        return item
      }
    }
    return blogs.reduce(reducer, {})
  }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }