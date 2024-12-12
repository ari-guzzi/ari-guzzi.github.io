document.addEventListener("DOMContentLoaded", function() {
    const works = [
        {"link": "webdev.html", "imgSrc": "../images/coverImages/webdev.png", "altText": "Web Development", "description": "Web Development"},
     {"link": "appdev.html", "imgSrc": "../images/coverImages/appdev.png", "altText": "App Development", "description": "App Development"},
     {"link": "vrdev.html", "imgSrc": "../images/coverImages/vrdev.png", "altText": "VR Development", "description": "VR Development"},
      {"link": "game.html", "imgSrc": "../images/coverImages/bayoubolt1.png", "altText": "Game Development", "description": "Tiny Game Development"},
      {"link": "web.html", "imgSrc": "../images/coverImages/webdes.png", "altText": "Web Design", "description": "Web Design"},
      {"link": "appdes.html", "imgSrc": "../images/coverImages/appdes.png", "altText": "App Design", "description": "App Design"},
      {"link": "myhobbies.html", "imgSrc": "../images/coverImages/hobbies.png", "altText": "My Hobbies", "description": "My Hobbies"}
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