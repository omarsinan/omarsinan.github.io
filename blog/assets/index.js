// typed.js init
var options = {
    strings:['Blog.^2000', 'All posts are originally posted on <a class="linkColor" href="https://dev.to/omarhashimoto">dev.to</a>.^2000', 'Come back later for more posts :)^2000'],
    typeSpeed:40,
    startDelay:500,
    backSpeed:40,
    backDelay:1000,
    loop:true,
}
var typed = new Typed(".typed", options)

function is_banned(arr) {
    const banList = ['discuss', 'introductions']
    for (let i = 0; i < banList.length; i++) {
        if (arr.indexOf(banList[i]) != -1) {
            return true
        }
    }
    return false
}

function isoDateReviver(value) {
    if (typeof value === 'string') {
        var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:([\+-])(\d{2})\:(\d{2}))?Z?$/.exec(value);
        if (a) {
            var utcMilliseconds = Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]);
            return new Date(utcMilliseconds);
        }
    }
    return value;
}

window.onload = function () {
    var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const articles = document.getElementById('posts')
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://dev.to/api/articles?username=omarhashimoto', true)
    xhr.responseType = 'json'
    xhr.onload = function() {
        var status = xhr.status
        if (status === 200) {
            console.log(xhr.response)
            for (let i = 0; i < xhr.response.length; i++) {
                if (!is_banned(xhr.response[i]['tag_list'])) {
                    let clone = document.getElementById('postClone').cloneNode(true)
                    clone.id = ''
                    clone.className = 'postParent'
                    clone.style.display = 'block'
                    let post = xhr.response[i]
                    let postClone = clone.querySelector('.post')
                    var d = isoDateReviver(post["published_timestamp"])
                    let cardPostTitle = postClone.querySelector('.cardPostTitle')
                    let cardPostDetails = postClone.querySelector('.cardPostDetails')
                    let cardPostSnippet = postClone.querySelector('.cardPostSnippet')
                    let cardPostImage = clone.querySelector('.cardPostImage')
                    let cardReaction = postClone.querySelector('.cardReaction')
                    let cardPostImageLink = clone.querySelector('.cardPostImageLink')
                    let cardPostTags = clone.querySelector('.cardPostTags')
                    let cardReactionCountText = cardReaction.querySelector('.cardReactionCountText')
                    let cardCommentCountText = cardReaction.querySelector('.cardCommentCountText')
                    cardPostTitle.innerHTML = post['title']
                    cardPostDetails.innerHTML = "Posted on " + month_names_short[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " by " + post["user"]["name"]
                    cardPostSnippet.innerHTML = post["description"]
                    let postImage = 'https' + post["cover_image"].split("https")[2]
                    let imageURL = 'https://res.cloudinary.com/practicaldev/image/fetch/w_420,c_scale/' + postImage
                    cardPostImage.setAttribute('src', imageURL)
                    cardReaction.setAttribute('href', post["url"] + '#comments-container')
                    cardPostTitle.setAttribute('href', post["url"])
                    cardPostImageLink.setAttribute('href', post["url"])
                    cardReactionCountText.innerHTML = post["positive_reactions_count"]
                    cardCommentCountText.innerHTML = post["comments_count"]
                    post["tag_list"].forEach(function(tag) {
                        cardPostTags.innerHTML += '<span class="postTag">' + tag + '</span>'
                    })
                    articles.appendChild(clone)
                }
            }

        } else {
            console.log('ERROR: ' + xhr.response)
        }
    }
    xhr.send()
}