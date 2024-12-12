let proj;

fetch('javascript/projects.json')
    .then(function (response) {
        return response.json();
    })
    .then(projects => {
        console.log(projects);
        filterProjects(projects);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function filterProjects(data) {
    const currentPage = window.location.pathname.split('/').pop(); // Extracts filename from URL path
    const subdomain = currentPage.replace('.html', ''); // Removes the .html extension to match the subdomain

    // Filter projects based on subdomain
    const filteredProjects = data.projects.filter(project => project.subdomain === subdomain);

    parseData({ projects: filteredProjects });
}

function parseData(projects) {
    const grid = document.getElementById("grid");

    projects.projects.forEach(project => {
        // Create a container div for the project
        const projectDiv = document.createElement("div");
        projectDiv.className = "row project";

        // Left side: Title, subtitle, GitHub link, and button
        const leftDiv = document.createElement("div");
        leftDiv.className = "left";
        leftDiv.innerHTML = `
            <h2>${project.name}</h2>
            <p>${project.subtitle}</p>
            <p><a href="${project.github}" target="_blank">GitHub Repository</a></p>
            <a class="button1" href="${project.button1}" target="_blank">View Project</a>
        `;

        // Right side: Video and image slideshow
        const rightDiv = document.createElement("div");
        rightDiv.className = "right";

        // Slideshow container
        const slideshowContainer = document.createElement("div");
        slideshowContainer.className = "slideshow-container";

        const dotsContainer = document.createElement("div");
        dotsContainer.className = "dots-container";

        // Combine video and images for the slideshow
        const media = project.images.map(img => ({ type: "image", src: `images/proj/${img}` }))
        .concat([{ type: "video", src: project.video }]);

        // Create slides and dots
        media.forEach((item, index) => {
            // Create slide
            const slide = document.createElement("div");
            slide.className = "mySlides fade";
            slide.style.display = index === 0 ? "block" : "none"; // Show the first slide initially

            if (item.type === "image") {
                slide.innerHTML = `<img src="${item.src}" style="width:100%">`;
            } else if (item.type === "video") {
                slide.innerHTML = `
                    <video preload = "auto" controls autoplay muted style="width:100%">
                        <source src="${item.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
            }

            slideshowContainer.appendChild(slide);

            // Create dot
            const dot = document.createElement("span");
            dot.className = "dot";
            dot.onclick = () => currentSlide(index + 1, slideshowContainer, dotsContainer);
            dotsContainer.appendChild(dot);
        });
        const prevButton = document.createElement("a");
        prevButton.className = "prev";
        prevButton.innerHTML = "❮";
        prevButton.onclick = () => plusSlides(-1, slideshowContainer, dotsContainer);

        const nextButton = document.createElement("a");
        nextButton.className = "next";
        nextButton.innerHTML = "❯";
        nextButton.onclick = () => plusSlides(1, slideshowContainer, dotsContainer);

        slideshowContainer.appendChild(prevButton);
        slideshowContainer.appendChild(nextButton);

        rightDiv.appendChild(slideshowContainer);
        rightDiv.appendChild(dotsContainer);

        // Append left and right divs to the project container
        projectDiv.appendChild(leftDiv);
        projectDiv.appendChild(rightDiv);

        // Add project container to grid
        grid.appendChild(projectDiv);

        // Initialize the slideshow for this project
        showSlides(1, slideshowContainer, dotsContainer);
    });
}

function showSlides(n, slideshowContainer, dotsContainer) {
    let i;
    const slides = slideshowContainer.getElementsByClassName("mySlides");
    const dots = dotsContainer.getElementsByClassName("dot");
    let slideIndex = n;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Save the current slide index in the slideshow container
    slideshowContainer.setAttribute("data-slide-index", slideIndex);
}

function plusSlides(n, slideshowContainer, dotsContainer) {
    const currentSlideIndex = parseInt(slideshowContainer.getAttribute("data-slide-index") || 1, 10);
    showSlides(currentSlideIndex + n, slideshowContainer, dotsContainer);
    
}

function currentSlide(n, slideshowContainer, dotsContainer) {
    showSlides(n, slideshowContainer, dotsContainer);
}
