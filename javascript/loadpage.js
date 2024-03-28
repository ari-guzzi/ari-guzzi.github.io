function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.body.innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", page + ".html", true);
    xhttp.send();
}

// Get the width of the current screen
var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

console.log("Current screen width: " + screenWidth + "px");

