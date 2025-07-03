document.addEventListener("DOMContentLoaded", function() {
    const works = [
      {"link": "finishd.html", "imgSrc": "../images/coverimages/finishdlogo.png", "altText": "finish'd internship", "description": "Redesigning finish'd, Inc.'s UI"},
      {"link": "capstone.html", "imgSrc": "../images/coverimages/capstonelogo.png", "altText": "Capstone Project", "description": "Capstone Project (App Dev)"},
      {"link": "webdev.html", "imgSrc": "../images/coverimages/webdev.png", "altText": "Web Development", "description": "Front-End Web Development"},
      {"link": "appdev.html", "imgSrc": "../images/coverimages/appdev.png", "altText": "App Development", "description": "App Development"},
      {"link": "vrdev.html", "imgSrc": "../images/coverimages/vrdev.png", "altText": "VR Development", "description": "VR Development"},
      {"link": "game.html", "imgSrc": "../images/coverimages/bayoubolt1.png", "altText": "Game Development", "description": "Tiny Game Development"},
      {"link": "web.html", "imgSrc": "../images/coverimages/webdes.png", "altText": "Web Design", "description": "Web Design"},
      {"link": "appdes.html", "imgSrc": "../images/coverimages/appdes.png", "altText": "App Design", "description": "App Design"},
      {"link": "myhobbies.html", "imgSrc": "../images/coverimages/hobbies.png", "altText": "My Hobbies", "description": "My Hobbies"}
    ];
  
    const gallery = document.getElementById("work-gallery");
  
    works.forEach(work => {
      const item = document.createElement("div");
      item.className = "work-item";
      item.innerHTML = `<a href="${work.link}" onclick="loadPage('${work.altText.toLowerCase()}')">
                          <img src="${work.imgSrc}" alt="cover photo for ${work.altText} page" class="round-img">
                          <div class="label">${work.description}</div>
                        </a>`;
      gallery.appendChild(item);
    });
  });