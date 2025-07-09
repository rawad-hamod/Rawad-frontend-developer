document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.getElementById("lang-toggle");
  const html = document.documentElement;
  let currentLang = "en";

  // Hamburger toggle for mobile
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    // Toggle the icon between hamburger ☰ and close ✖
    if (hamburger.textContent === "☰" || hamburger.innerHTML === "&#9776;") {
      hamburger.textContent = "✖";
    } else {
      hamburger.textContent = "☰";
    }
  });

  // Apply translations using data-i18n attributes
  function applyTranslations(data) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) el.textContent = data[key];
    });

    // Static translations
    document.getElementById("title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;
    document.getElementById("about-title").textContent = data.about_title;
    document.getElementById("about-desc").textContent = data.about_desc;
    document.getElementById("year").textContent = new Date().getFullYear();

    // Dynamic content translations
    if (data.skills) {
      renderSkills(data.skills);
    }

    if (data.projects) {
      renderProjects(data.projects);
    }

    if (data.certificates) {
      renderCertificates(data.certificates);
    }
  }

  async function loadLang(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      const data = await response.json();
      applyTranslations(data);
      html.lang = lang;
      html.dir = lang === "ar" ? "rtl" : "ltr";
      langToggle.textContent = lang === "ar" ? "English" : "العربية";
    } catch (error) {
      console.error("Error loading language file:", error);
    }
  }

  // Render skills section
  function renderSkills(skills) {
  const container = document.getElementById("skills-container");
  container.innerHTML = "";

  skills.forEach(skill => {
    const skillCard = document.createElement("div");
    skillCard.className = "skill-card";

    // Icon or image logic
    let visual;
    if (skill.image) {
      visual = `<img src="${skill.image}" alt="${skill.name}" class="skill-img" />`;
    } else if (skill.icon) {
      visual = `<i class="${skill.icon}"></i>`;
    } else {
      visual = `<i class="fas fa-tools"></i>`; // fallback
    }

    skillCard.innerHTML = `
      ${visual}
      <h3>${skill.name}</h3>
    `;
    container.appendChild(skillCard);
  });
}


  // Render projects section
  function renderProjects(projects) {
    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    projects.forEach((project) => {
  const projectCard = document.createElement("div");
  projectCard.className = "project-card";
  const demoBtn = project.demo_url
  ? `<a href="${project.demo_url}" class="btn" target="_blank">${project.demo_text}</a>`
  : "";

const codeBtn = project.code_url
  ? `<a href="${project.code_url}" class="btn" target="_blank">${project.code_text}</a>`
  : "";
  projectCard.innerHTML = `
    <div class="project-img">
      <img src="${project.image_placeholder}" alt="${project.name}" />
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.name}</h3>
      <p class="project-description">${project.description}</p>
      
      <div class="project-meta">
        <p class="project-tools"><strong></strong> ${project.tools}</p>
        <p class="project-notes"><em>${project.notes}</em></p>
      </div>

      <div class="project-links">
         ${demoBtn}
      ${codeBtn}
      </div>
    </div>
  `;
  container.appendChild(projectCard);
});

  }

  // Render certificates section
 function renderCertificates(certificates) {
  const container = document.getElementById("certificates-container");
  container.innerHTML = "";

  certificates.forEach(cert => {
    const certCard = document.createElement("div");
    certCard.className = "certificate-card";
    certCard.innerHTML = `
      <a href="${cert.link}" target="_blank" title="تحقق من الشهادة">
        <img src="${cert.image}" alt="${cert.name}" class="certificate-img" />
      </a>
      <h3>${cert.name}</h3>
    `;
    container.appendChild(certCard);
  });
}


  // Language switcher button
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    loadLang(currentLang);
  });

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: "smooth",
        });

        // Close mobile menu if open
        navLinks.classList.remove("show");
        // Reset hamburger icon to ☰
        hamburger.textContent = "☰";
      }
    });
  });

  // Initial load
  loadLang(currentLang);
});
