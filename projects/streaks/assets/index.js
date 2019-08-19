// typed.js init
var options = {
    strings:["Streaks."],
    typeSpeed:40,
}
var typed = new Typed(".typed", options)

window.onload = function () {
    // scroll to div on click of buttons
    const projectsLink = document.getElementById('projectsLink')
    const projectsTitle = document.getElementById('projectsTitle')
    projectsLink.onclick = function() {
        console.log('projects link clicked')
        skrollTop.scrollTo({
            to: projectsTitle.offsetTop - 20
        });
    }
}