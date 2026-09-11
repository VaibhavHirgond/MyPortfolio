var themeBtn = document.getElementById("theme-toggle");
var body = document.body;

function updateTheme(theme) {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  var icon = themeBtn.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

var currentTheme = localStorage.getItem("portfolio-theme") || "dark";
updateTheme(currentTheme);

themeBtn.addEventListener("click", function () {
  var isDark = body.getAttribute("data-theme") === "dark";
  updateTheme(isDark ? "light" : "dark");
});

document.addEventListener("DOMContentLoaded", function () {
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.25
    });
  }
});

var contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector(".submit-btn");
    var originalText = btn.textContent;
    btn.textContent = "Message Sent!";
    btn.style.background = "#10b981";
    contactForm.reset();
    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.background = "";
    }, 3000);
  });
}

var cursor = document.getElementById("custom-cursor");
var trail = document.getElementById("cursor-trail");
var mouseX = 0;
var mouseY = 0;
var cursorX = 0;
var cursorY = 0;
var trailX = 0;
var trailY = 0;

document.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  var xPercent = (e.clientX / window.innerWidth) * 100;
  var yPercent = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty("--mx", xPercent + "%");
  document.documentElement.style.setProperty("--my", yPercent + "%");
});

function animateCursor() {
  if (cursor) {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
  }
  if (trail) {
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;
    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

if (cursor) {
  var hoverTargets = document.querySelectorAll("a, button, .glass-card");
  for (var i = 0; i < hoverTargets.length; i++) {
    hoverTargets[i].addEventListener("mouseenter", function () {
      cursor.classList.add("cursor-hover");
    });
    hoverTargets[i].addEventListener("mouseleave", function () {
      cursor.classList.remove("cursor-hover");
    });
  }
}

var magneticTargets = document.querySelectorAll(".btn-primary, .btn-ghost, .submit-btn, .nav-links a");
for (var m = 0; m < magneticTargets.length; m++) {
  magneticTargets[m].addEventListener("mousemove", function (e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var relX = e.clientX - rect.left - rect.width / 2;
    var relY = e.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transform = "translate(" + relX * 0.2 + "px, " + relY * 0.2 + "px)";
  });
  magneticTargets[m].addEventListener("mouseleave", function (e) {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  });
}

var statNums = document.querySelectorAll(".stat-num");
if (statNums.length > 0 && "IntersectionObserver" in window) {
  var statObserver = new IntersectionObserver(function (entries) {
    for (var s = 0; s < entries.length; s++) {
      if (entries[s].isIntersecting) {
        var el = entries[s].target;
        var target = parseFloat(el.getAttribute("data-count"));
        var isDecimal = el.getAttribute("data-count").indexOf(".") !== -1;
        var current = 0;
        var step = target / 40;
        var counter = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, 30);
        statObserver.unobserve(el);
      }
    }
  }, { threshold: 0.5 });

  for (var st = 0; st < statNums.length; st++) {
    statObserver.observe(statNums[st]);
  }
}

var revealItems = document.querySelectorAll(".reveal");
if (revealItems.length > 0 && "IntersectionObserver" in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    for (var r = 0; r < entries.length; r++) {
      if (entries[r].isIntersecting) {
        entries[r].target.classList.add("active");
        revealObserver.unobserve(entries[r].target);
      }
    }
  }, { threshold: 0.2 });

  for (var rv = 0; rv < revealItems.length; rv++) {
    revealObserver.observe(revealItems[rv]);
  }
}

var canvas = document.getElementById("hero-canvas");
if (canvas) {
  var ctx = canvas.getContext("2d");
  var w = 0;
  var h = 0;
  var nodes = [];
  var nodeCount = 24;
  var linkDist = 140;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resizeCanvas() {
    var hero = document.getElementById("hero");
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }

  function initNodes() {
    nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var p1 = nodes[a];
        var p2 = nodes[b];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.strokeStyle = "rgba(99, 102, 241, " + (0.18 * (1 - dist / linkDist)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    for (var c = 0; c < nodes.length; c++) {
      ctx.fillStyle = "rgba(34, 211, 238, 0.6)";
      ctx.beginPath();
      ctx.arc(nodes[c].x, nodes[c].y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawFrame);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  initNodes();
  drawFrame();
}
