// typed.js init
var options = {
    strings:["Hi.^1000","I'm Omar.^1000","I program random things.^2000"],
    typeSpeed:40,
    startDelay:500,
    backSpeed:40,
    backDelay:1000,
    loop:true,
}
var typed = new Typed(".typed", options)

window.onload = function () {
    // scroll to div on click of buttons
    const homeLink = document.querySelector('.homeLink')
    const projectsLink = document.querySelectorAll('.projectsLink')
    const projectsTitle = document.getElementById('projectsTitle')
    for (var i = 0; i < projectsLink.length; i++) {
        projectsLink[i].addEventListener('click', function() {
            skrollTop.scrollTo({
                to: projectsTitle.offsetTop - 20
            })
        })
    }
    homeLink.addEventListener('click', function() {
        skrollTop.scrollTo({
            to: 0
        })
    })
}