/* ---------- YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- THEME TOGGLE ---------- */
const toggle = document.getElementById("themeToggle");
const body = document.body;

if(localStorage.getItem("theme")==="dark"){
    body.classList.add("dark");
}

toggle.addEventListener("click", ()=>{
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

/* ---------- SECTION REVEAL ---------- */
const reveals = document.querySelectorAll(".reveal");

const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }
    });
},{threshold:0.18});

reveals.forEach(el=>obs.observe(el));

/* ---------- ACTIVE NAVBAR LINK ---------- */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", ()=>{
    let scrollPos = window.scrollY + 120;

    sections.forEach(sec=>{
        if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight){
            navLinks.forEach(a=>a.classList.remove("active"));
            let id = sec.getAttribute("id");
            document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add("active");
        }
    });
});
/* ---------- NAVBAR GRADIENT BOX ANIMATION ---------- */

const navBar = document.querySelector(".nav-links");
const navBox = document.createElement("div");
navBox.className = "nav-box";
navBar.appendChild(navBox);

function moveNavBox(target) {
  const rect = target.getBoundingClientRect();
  const parentRect = navBar.getBoundingClientRect();

  navBox.style.width = rect.width + "px";
  navBox.style.left = rect.left - parentRect.left + "px";
  navBox.style.opacity = 1;
}

// Hover → move to hovered link
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => moveNavBox(link));
});

// Leave navbar → return to active link
navBar.addEventListener("mouseleave", () => {
  const activeLink = document.querySelector(".nav-links a.active");
  if (activeLink) moveNavBox(activeLink);
});

// Scroll → keep box at current active section
window.addEventListener("scroll", () => {
  const activeLink = document.querySelector(".nav-links a.active");
  if (activeLink) moveNavBox(activeLink);
});

// On page load
window.addEventListener("load", () => {
  const activeLink = document.querySelector(".nav-links a.active");
  if (activeLink) moveNavBox(activeLink);
});




/* ---------- AVATAR MICRO HOVER ---------- */
const avatar = document.querySelector(".avatar-wrapper");

if(avatar){
    avatar.addEventListener("mousemove", (e)=>{
        const r = avatar.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width/2);
        const y = e.clientY - (r.top + r.height/2);
        avatar.style.transform = `translate(${x/25}px, ${y/25}px)`;
    });

    avatar.addEventListener("mouseleave", ()=>{
        avatar.style.transform = "translate(0,0)";
    });
}

/* ---------- CONTACT FORM (EMAILJS) ---------- */
(function() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script.onload = () => {
        emailjs.init("vqfWlRQpc7Z57eu4a");   // ✔ CHANGE THIS
    };
    document.body.appendChild(script);
})();

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();
        statusMsg.textContent = "Sending...";

        emailjs.sendForm(
            "service_f9kcwge",      // ✔ CHANGE THIS
            "template_5gyd4cj",     // ✔ CHANGE THIS
            form
        ).then(()=>{
            statusMsg.textContent = "Message sent successfully!";
            form.reset();
        }).catch(()=>{
            statusMsg.textContent = "Sending failed. Try again.";
        });
    });
}

/* ---------- ICONS ---------- */
setTimeout(()=>{ 
    lucide.createIcons(); 
}, 100);

/* ---------- SUPER SMOOTH NAV LINK SCROLL ---------- */

function smoothScroll(target, duration = 900) {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY - 80; // offset for navbar
  const distance = end - start;
  let startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, start + distance * easeInOutQuad(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/* Apply smooth scroll to navbar links */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute("href"));
    smoothScroll(section);
  });
});

/* ---------- SMOOTH SCROLL FOR PROJECT BUTTONS ---------- */

const projectButtons = document.querySelectorAll('a[href="#projects"]');

projectButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    smoothScroll(target);
  });
});
