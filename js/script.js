//some constants

const Constants = {
  skills: [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "TypeScript",
    "JQuery",
    "Dart",
    "Flutter",
    "MySql",
    "Firebase",
    "Git/GitHub",
    "HTML",
    "CSS",
  ],
  skills_descriptions: {
    Flutter:
      "I've started to learn this framework since 2021 summer so I have quite nice experience using it. \
      Really like idea of the widget application creation instead of markdown.\
      Created some projects using it. \
      You can view them all on my GitHub.",
  },
};
//Themes customization
themeMainColors = [];
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
  themeMainColors = getThemeMainColors();
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
  changeThemeButtonIcon(localStorage.getItem("theme") == "theme-dark");
}
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
  changeThemeButtonIcon(localStorage.getItem("theme") == "theme-dark");
})();
function getThemeMainColors() {
  var style = getComputedStyle(document.body);
  return [
    style.getPropertyValue("--color-accent"),
    style.getPropertyValue("--color-primary"),
    style.getPropertyValue("--color-secondary"),
  ];
}

function changeThemeButtonIcon(value) {
  if (value)
    $(".toggle-theme-button").html(
      '<i class="fa fa-sun-o fa-2x toggle-theme-button-icon"></i>'
    );
  else
    $(".toggle-theme-button").html(
      '<i class="fa fa-moon-o fa-2x toggle-theme-button-icon"></i>'
    );
}

//TagCloud funcitons
var tagCloud;

function paintTagCouldItems() {
  $(".tagcloud--item").css("color", function () {
    return themeMainColors[
      Math.round(Math.random() * (themeMainColors.length - 1))
    ];
  });
}

function showMenu(title) {
  $(".menu").fadeIn();
  $(".menu-title").text(title);
  if (title in Constants["skills_descriptions"])
    $(".menu-text").text(Constants["skills_descriptions"][title]);
  // else $(".menu-text").text("idk");
  $(".menu-wrapper").fadeIn();
  $(".menu-wrapper").css("z-index", "3");
}

function hideMenu() {
  $(".menu").fadeOut();
  $(".menu-wrapper").fadeOut();
}

function initTagCloud() {
  tagCloud = TagCloud(".skills-cloud", Constants["skills"], {
    radius: window.innerWidth * .4,
    maxSpeed: "normal",
    initSpeed: "normal",
    direction: 135,
    keep: false,
  });
  paintTagCouldItems();
  $(".tagcloud--item").css("cursor", "pointer");
  if (window.innerWidth > 500){
  $(".tagcloud--item").on("mouseenter", function () {
    $(this).addClass("scaled-cloud-item");
  });
  $(".tagcloud--item").on("mouseleave", function () {
    $(this).removeClass("scaled-cloud-item");
  });
  }
  $(".tagcloud--item").on("click", function () {
    showMenu(this.textContent);
  });
}

$(document).ready(function () {
  //bouncing icons
  $(".social-network").bind(
    "webkitAnimationEnd mozAnimationEnd animationend",
    function () {
      $(this).removeClass("animated");
    }
  );
  $(".social-network").on("mouseenter", function () {
    $(this).addClass("animated");
  });
  //dynamic header
  $(window).scroll(function () {
    if ($(this).scrollTop() > window.innerHeight * 0.5) {
      $(".second-header").fadeIn();
    } else {
      $(".second-header").fadeOut();
    }
  });
  //TagCloud
  initTagCloud();
  //themes
  $(".toggle-theme-button").on("click", function () {
    toggleTheme();
  });
  $(".menu-wrapper").on("click", function () {
    hideMenu();
  });
  //sizing
  $(window).resize(function() {
    tagCloud.destroy();
    initTagCloud();
  })
});
