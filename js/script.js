//some constants

const Constants = {
  skills: [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "TypeScript",
    "JQuery",
    "Flutter",
    "MySql",
    "Firebase",
    "Git/GitHub",
    "HTML",
    "CSS",
    "C#",
    "React",
    "Google",
    "Heroku",
    "CloudFlare",
    "GoLang",
    "Bash",
    "VSCode"
  ],
  skills_descriptions: {
    Python:
      "I've completed yandex lyceum 2 Python courses. One about basics of this language and second about \
  product development so I have some python projects(using PyQT, pygame and Flask) and quite good knowledge of this programming language.",
    Java: "Completed course about it, can create mobile apps but still not really good at it",
    "C++":
      "I know basics of this language and use it sometimes to solve competitive programming tasks",
    JavaScript:
      "This language is quite similar to Dart which I learnt while was studying Flutter, so I have not bad\
    knowledge of it.",
    TypeScript:
      "Same thing as with JavaScript, also made some contributions in monkeytype using it",
    JQuery:
      "I have basic knowledge about it so I can make websites like this one.",
    Flutter:
      "I've started to learn this framework since 2021 summer so I have quite nice experience using it. \
      Really like idea of the widget application creation instead of markdown.\
      Created some projects using it. \
      You can view them all on my GitHub.",
    MySql: "Worked with it while was creating aNOOBus, have a basic knowledge",
    Firebase: "Used it a lot with Flutter, created OmegaChat using it",
    "Git/GitHub":
      "I have quite nice experience in open source contributing. I was developing discord bot with open\
    source code with my friend and also made some contributions in monkeytype website. They're quite small, but anyways\
    git usage was impoved really good.",
    HTML: "I have basic knowledge about it so I can make websites like this one.",
    CSS: "I have basic knowledge about it so I can make websites like this one.",
    "C#": "Have a bit of experience of this language. Developed some applications using WPF and WinForms.",
    React: "Not really used to it, completed codecademy course.",
    Google:
      "I guess one of the most useful tools for programmer. I am used to Google and I can easily find what I need in browser.",
    Heroku: "Used this website to deploy aNOOBus and MegaPolls",
    CloudFlare:
      "Actually this website works using it cause it provides FREE SSL as I need",
    GoLang:
      "Not really used to this language, completed course about it basics on Stepik",
    Bash: "Have a bit of experience of using Linux and MacOS terminal. Using them since 2022.",
    VSCode: "I am using this code editor a lot and really used to it and love it so much."
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
    radius: Math.min(window.innerWidth * 0.4, 230),
    maxSpeed: "normal",
    initSpeed: "normal",
    direction: 135,
    keep: false,
  });
  paintTagCouldItems();
  $(".tagcloud--item").css("cursor", "pointer");
  if (window.innerWidth > 500) {
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
  $(window).resize(function () {
    tagCloud.destroy();
    initTagCloud();
  });
});
