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



document.addEventListener("DOMContentLoaded", function() {
  // Create the footer element
  const footer = document.createElement("footer");

  // Create the contact-info div
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";
  contactInfo.innerHTML = `<a href="mailto:acguzzi@comcast.net">acguzzi@comcast.net</a><br><br>
                           <a href="https://github.com/ari-guzzi" target="_blank">Github</a>`;

  // Create the centered-logo div
  const centeredLogo = document.createElement("div");
  centeredLogo.className = "centered-logo";
  centeredLogo.innerHTML = `<img src="images/logo/AG2LightGrey.png" alt="Me">`;

  // Create the links div
  const links = document.createElement("div");
  links.className = "links";
  links.innerHTML = `<a href="https://www.linkedin.com/in/arianna-guzzi/" target="_blank">LinkedIn</a><br><br>
                     <a href="../images/resume.pdf" target="_blank">Resume</a>`;

  // Append all parts to the footer
  footer.appendChild(contactInfo);
  footer.appendChild(centeredLogo);
  footer.appendChild(links);

  // Append the footer to the placeholder in the document
  document.getElementById("footer-placeholder").appendChild(footer);
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-view');
        }
      });
    }, {
      threshold: 0.5 // Adjust this value based on when you want the fade in to start
    });
  
    // Query and observe all sections intended to fade in
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      observer.observe(section);
    });
  });

// fade code
function initializeFadeIn() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-view');
      }
    });
  }, {
    threshold: .5
  });

  const sections = document.querySelectorAll('.fade-in-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', initializeFadeIn);

function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.body.innerHTML = this.responseText;
            initializeFadeIn(); // Re-initialize fade-in effect
        }
    };
    xhttp.open("GET", page + ".html", true);
    xhttp.send();
}
