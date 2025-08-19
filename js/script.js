// HOME

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  if (slides && dots && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      let newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
    });
    prevBtn.addEventListener("click", () => {
      let newIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showSlide(parseInt(dot.dataset.slide));
      });
    });
  }
});

//ADMIN
//NEW NAME THING

var footer = document.getElementsByClassName("footer");
var nameBox = document.getElementById("newName");
var logo = document.getElementsByClassName("name");

function setName() {
  var newName = nameBox.value;
  if (newName) {
    localStorage.setItem("siteName", newName); // save name
    alert("Website name changed to: " + newName);
  }
  location.reload();
}

if (footer.length > 0) {
  var savedName = localStorage.getItem("siteName") || "Al Menus";
  for (var i = 0; i < footer.length; i++) {
    footer[i].innerHTML =
      "&copy; 2023 " + savedName + " Food Delivery. All rights reserved.";
  }
}

if (logo.length > 0) {
  var savedName = localStorage.getItem("siteName") || "Al Menus";
  for (var i = 0; i < logo.length; i++) {
    logo[i].innerHTML = savedName;
  }
}

// NEW RRESTAURANT

function addRestaurant() {
  const name = document.getElementById("restName").value;
  const desc = document.getElementById("restDesc").value;
  const rating = document.getElementById("restRating").value;
  const time = document.getElementById("restTime").value;
  const img = document.getElementById("restImg").value;

  if (!name || !desc || !rating || !time) {
    alert("Please fill all fields");
    return;
  }

  let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

  restaurants.push({
    name,
    desc,
    rating,
    time,
    img,
  });

  localStorage.setItem("restaurants", JSON.stringify(restaurants));

  alert("Restaurant added successfully!");
  location.reload();
}

// LIST RESTS
var defRestaurants = [
  {
    name: "Willy's Kitchen",
    img: "willys.webp",
    desc: "Your go-to spot for fast and healthy Mediterranean food. Specializing in delicious sandwiches.",
    rating: "4.8",
    time: "25-35 min",
  },
  {
    name: "Papa Johns",
    img: "papajohns.jpeg",
    desc: "Enjoy the ease of ordering delicious pizza for delivery or carryout from a Papa Johns near you.",
    rating: "4.7",
    time: "30-45 min",
  },
  {
    name: "KFC",
    img: "kfc.jpg",
    desc: "Order great tasting fried chicken, sandwiches & family meals online with KFC.",
    rating: "3.8",
    time: "20-30 min",
  },
  {
    name: "Dolato",
    img: "dolato.png",
    desc: "Explore Dolato's menu featuring authentic Italian gelato and other delightful treats.",
    rating: "4.9",
    time: "15-25 min",
  },
];

if (!localStorage.getItem("restaurants")) {
  localStorage.setItem("restaurants", JSON.stringify(defaultRestaurants));
}

const restaurantGrid = document.getElementById("restaurants");

if (restaurantGrid) {
  let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

  restaurants.forEach((rest) => {
    const card = document.createElement("div");
    card.classList.add("restaurant-card");

    card.innerHTML = `
      <div class="restaurant-img">
        <img src="${rest.img}" alt="${rest.name}">
      </div>
      <div class="restaurant-info">
        <h3>${rest.name}</h3>
        <p>${rest.desc}</p>
        <div class="restaurant-footer">
          <span class="rating">${rest.rating} ★</span>
          <span class="delivery-time">${rest.time}</span>
        </div>
      </div>
    `;

    restaurantGrid.appendChild(card);
  });
}

// DELETE REST

const deleteGrid = document.getElementById("restaurant-list");

if (deleteGrid) {
  let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

  restaurants.forEach((rest, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${rest.name}</h3>
        <p>${rest.desc}</p>
        <a href="#" class="btn" onclick="deleteRestaurant(${index})">Delete</a>
    `;

    deleteGrid.appendChild(card);
  });
}

function deleteRestaurant(index) {
  let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
  alert("Restaurant deleted: " + restaurants[index].name);
  restaurants.splice(index, 1);
  localStorage.setItem("restaurants", JSON.stringify(restaurants));
  location.reload();
}

// SIGNUP

const form = document.getElementById("signupForm");
if (form) {
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value;

      let valid = true;

      if (name === "") {
        document.getElementById("nameError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("nameError").style.display = "none";
      }

      let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        document.getElementById("emailError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("emailError").style.display = "none";
      }

      let passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;
      if (!password.match(passPattern)) {
        document.getElementById("passwordError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("passwordError").style.display = "none";
      }
      if (password.match(passPattern)) {
        alert("Account created successfully!");
        window.location.href = "home.html";
      }
    });
}

// SIGNIN

function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();
  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");
  let loginError = document.getElementById("loginError");

  emailError.textContent = "";
  passwordError.textContent = "";
  loginError.textContent = "";

  // Email validation
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (user === "") {
    emailError.textContent = "Email is required!";
    valid = false;
  } else if (!emailPattern.test(user)) {
    emailError.textContent = "Enter a valid email (e.g., test@example.com)";
    valid = false;
  }
  // Password validation
  if (pass === "") {
    passwordError.textContent = "Password is required!";
    valid = false;
  } else if (pass.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters!";
    valid = false;
  }

  if (user.match(emailPattern) && pass.length >= 6) {
    valid = true;
  }

  if (valid) {
    window.location.href = "home.html";
  }
}

const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");
if (togglePassword && passwordField) {
  togglePassword.addEventListener("click", function () {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    login();
  }
});
