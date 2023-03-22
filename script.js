function loadData() {
  var xhttp = new XMLHttpRequest()
  xhttp.onload = function() {
    if (this.status == 200) {
      let posts = JSON.parse(this.responseText)
      drawPosts(posts)
    }
  }
  xhttp.open("GET", "https://raw.githubusercontent.com/sc00l8oy/DI/main/posts.json", true)
  xhttp.send()
}

function drawPosts(posts) {
  const main = document.getElementById('main')
  for (let post of posts) {
    main.innerHTML += '<div class="post">' +
    '<img src="'+ post.avatar +'">' +
    '<a href="#">@'+ post.username +'</a>' +
    '<p>'+ post.description +'</p>' +
    '<div>' +
      '<button onclick="like(event, '+post.id+')">Like ('+ post.like_count +')</button>' +
      '<button>Share ('+ post.share_count +')</button>' +
      '<button>Comment ('+ post.comment_count +')</button>' +
    '</div>' +
  '</div>'
  }
}

function toast(message) {
  const elem = document.createElement('div')
  elem.className = 'toast'
  elem.innerText = message
  document.body.appendChild(elem)

  setTimeout(function () {
    elem.remove()
  }, 3000)
}

function like(event, postId) {
  var text = event.target.innerText
  let startIndex = text.indexOf('(')+1
  let lastIndex = text.indexOf(')')
  let likeCount = parseInt(text.substring(startIndex, lastIndex))+1
  event.target.innerText = 'Like (' + likeCount + ')'
  toast('You liked a post with id: ' + postId)
}

loadData()