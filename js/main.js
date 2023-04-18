// showing and hiding the setting box
let settingIcon = document.querySelector(".toggle-settings");
settingIcon.addEventListener("click", (e) => {
  settingIcon.parentElement.classList.toggle("open");
  e.target.classList.toggle("fa-spin");
});

//changing main color based on color box
let colors = document.querySelectorAll(".colors-list li");
let optionColor = localStorage.getItem("optionColor");
if (optionColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("optionColor")
  );
  colors.forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === optionColor) {
      ele.classList.add("active");
    }
  });
} else {
  document.documentElement.style.setProperty("--main-color", "#f89400");
}
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    // set the main color to the clicked color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // change the color value in the local storage
    localStorage.setItem("optionColor", e.target.dataset.color);
    // remove the active class from all list items
    colors.forEach((ele) => {
      ele.classList.remove("active");
    });
    // add the active class to the clicked element
    e.target.classList.add("active");
  });
});

// control the on/off of the random background
let isRandom = true;
let intervaControl;
let localStoredOption = localStorage.getItem("background_option");
let randomBackgroundControls = document.querySelectorAll(
  ".random-background button"
);
if (localStoredOption !== null) {
  randomBackgroundControls.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (localStoredOption == "Yes") {
    isRandom = true;
    randomBackgroundControls[0].classList.add("active");
  } else {
    isRandom = false;
    randomBackgroundControls[1].classList.add("active");
  }
}
randomBackgroundControls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // remove the active class from all list items
    randomBackgroundControls.forEach((ele) => {
      ele.classList.remove("active");
    });
    // add the active class to the clicked element
    e.target.classList.add("active");
    if (e.target.textContent === "Yes") {
      isRandom = true;
      backgroundSwitch();
      localStorage.setItem("background_option", "Yes");
    } else {
      isRandom = false;
      clearInterval(intervaControl);
      localStorage.setItem("background_option", "No");
    }
  });
});

// change the landing background Image randomly every 3 sec
let landing = document.querySelector(".landing");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function backgroundSwitch() {
  if (isRandom) {
    intervaControl = setInterval(() => {
      let rnd = Math.floor(Math.random() * imgsArray.length);
      landing.style.backgroundImage = 'url("../images/' + imgsArray[rnd] + '")';
    }, 3000);
  }
}
backgroundSwitch();

// make the skills progress animate on scroll

window.onscroll = function () {
  let skillsOffsetTop = document.querySelector(".skills").offsetTop;
  let skillsOuterHeight = document.querySelector(".skills").offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScrollTop = window.scrollY;
  let progSpans = document.querySelectorAll(".skill-progress span");
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    progSpans.forEach((ele) => {
      ele.style.width = ele.dataset.prog;
    });
  }
};

// create overlay layer to put the image on
let imagesBoxes = document.querySelectorAll(".images-box img");
imagesBoxes.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create the overlay
    let overlay = document.createElement("div");
    overlay.className = "overLayer";
    // append the overlay to the body
    document.body.appendChild(overlay);
    // create the image box
    let imageBox = document.createElement("div");
    imageBox.className = "image-box";
    // append the popup box to the body
    document.body.appendChild(imageBox);
    // create image title above it
    let imgTitle = document.createElement("h3");
    imgTitle.className = "img-title";
    // assign the img alt attribute value to the imgTitle text content
    imgTitle.textContent = e.target.alt;
    // append the image title to the popup box
    imageBox.appendChild(imgTitle);
    // create the iamge element
    let img = document.createElement("img");
    // assign the image source of the clicked image to the created image
    img.src = e.target.src;
    imageBox.appendChild(img);
    // create close button to remove the popup box and the overlay
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "X";
    imageBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentElement.remove();
    document.querySelector("body > .overLayer").remove();
  }
});

// allow the nav bullets to go to the selected section
const bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//control the appearance of the section bullets
let navBullet = document.querySelector(".nav-bullets");
let showBullets = document.querySelectorAll(".show-bullets button");
let bulletOption = localStorage.getItem("bullets_options");
// checking whether the local storage has value with key bullets_options or not
if (bulletOption != null) {
  showBullets.forEach((ele) => ele.classList.remove("active"));
  if (bulletOption == "Show") {
    showBullets[0].classList.add("active");
    navBullet.style.display = "block";
  } else {
    showBullets[1].classList.add("active");
    navBullet.style.display = "none";
  }
}

// loop over each button of the show/Hide buttons
showBullets.forEach((btn) => {
  // add click event to each button
  btn.addEventListener("click", (e) => {
    // remove the active class from all buttons
    showBullets.forEach((ele) => ele.classList.remove("active"));
    // check the value of the textContent of the clicked button
    if (e.target.textContent == "Show") {
      e.target.classList.add("active");
      navBullet.style.display = "block";
      localStorage.setItem("bullets_options", "Show");
    } else {
      e.target.classList.add("active");
      navBullet.style.display = "none";
      localStorage.setItem("bullets_options", "Hide");
    }
  });
});

// add click event to the restore-defaults button
document.querySelector(".restore-defaults").onclick = function () {
  let restoreConfirmed = confirm("Do you want to restore- defaults ?");
  if (restoreConfirmed) {
    localStorage.clear();
    window.location.reload();
  }
};

// control the toggle menu
let toggleSwitch = document.querySelector(".landing .header .toggle i");
let links = document.querySelector(".landing .header ul");

toggleSwitch.addEventListener("click", function () {
  links.classList.toggle("open");
});
window.addEventListener("click", function (e) {
  if (e.target != toggleSwitch) {
    links.classList.remove("open");
  }
});
