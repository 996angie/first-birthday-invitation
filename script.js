document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DOM ELEMENTS
  ========================= */

  const openInviteButton =
    document.querySelector("#openInvite");

  const hero =
    document.querySelector(".hero");

  const invitationSection =
    document.querySelector("#invitation");

  const attendanceSelect =
    document.querySelector("#attendance");

  const guestsGroup =
    document.querySelector("#guestsGroup");

  const guestsSelect =
    document.querySelector("#guests");

  const rsvpForm =
    document.querySelector("#rsvpForm");

  const rsvpSuccess =
    document.querySelector("#rsvpSuccess");

  const monthButtons =
    document.querySelectorAll(".month-btn");

  const monthImage =
    document.querySelector("#monthImage");

  const monthLabel =
    document.querySelector("#monthLabel");


  /* =========================
     OPEN INVITATION
  ========================= */

  if (openInviteButton && invitationSection) {

    openInviteButton.addEventListener("click", () => {

      hero?.classList.add("is-open");

      setTimeout(() => {

        invitationSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 250);

    });

  }


  /* =========================
     COUNTDOWN
  ========================= */

  /*
    IMPORTANT:
    Change this value when you know
    the exact date and time.
  */

  const eventDate =
    new Date("2026-11-06T17:00:00");


  const daysElement =
    document.querySelector("#days");

  const hoursElement =
    document.querySelector("#hours");

  const minutesElement =
    document.querySelector("#minutes");

  const secondsElement =
    document.querySelector("#seconds");


  function padNumber(number) {

    return String(number).padStart(2, "0");

  }


  function updateCountdown() {

    const now =
      new Date();

    let difference =
      eventDate.getTime() - now.getTime();


    /*
      Event has already started.
    */

    if (difference <= 0) {

      if (daysElement) {
        daysElement.textContent = "00";
      }

      if (hoursElement) {
        hoursElement.textContent = "00";
      }

      if (minutesElement) {
        minutesElement.textContent = "00";
      }

      if (secondsElement) {
        secondsElement.textContent = "00";
      }

      return;

    }


    const day =
      1000 * 60 * 60 * 24;

    const hour =
      1000 * 60 * 60;

    const minute =
      1000 * 60;


    const days =
      Math.floor(difference / day);

    difference %= day;


    const hours =
      Math.floor(difference / hour);

    difference %= hour;


    const minutes =
      Math.floor(difference / minute);

    difference %= minute;


    const seconds =
      Math.floor(difference / 1000);


    if (daysElement) {
      daysElement.textContent =
        padNumber(days);
    }

    if (hoursElement) {
      hoursElement.textContent =
        padNumber(hours);
    }

    if (minutesElement) {
      minutesElement.textContent =
        padNumber(minutes);
    }

    if (secondsElement) {
      secondsElement.textContent =
        padNumber(seconds);
    }

  }


  updateCountdown();

  const countdownInterval =
    setInterval(updateCountdown, 1000);


  /* =========================
     MONTH GALLERY
  ========================= */

  function getMonthLabel(month) {

    const monthNumber =
      Number(month);

    if (monthNumber === 1) {
      return "1 mesec";
    }

    if (
      monthNumber >= 2 &&
      monthNumber <= 4
    ) {
      return `${monthNumber} meseca`;
    }

    return `${monthNumber} meseci`;

  }


  monthButtons.forEach(button => {

    button.addEventListener("click", () => {

      const month =
        button.dataset.month;

      if (!month) {
        return;
      }


      monthButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");


      if (monthImage) {

        monthImage.classList.add(
          "is-changing"
        );


        setTimeout(() => {

          monthImage.src =
            `assets/teodor-${month}.jpg`;

          monthImage.alt =
            `Teodor - ${getMonthLabel(month)}`;


          monthImage.onload = () => {

            monthImage.classList.remove(
              "is-changing"
            );

          };


          /*
            In case the image is cached
            and onload doesn't visibly fire.
          */

          setTimeout(() => {

            monthImage.classList.remove(
              "is-changing"
            );

          }, 300);

        }, 180);

      }


      if (monthLabel) {

        monthLabel.textContent =
          getMonthLabel(month);

      }

    });

  });


  /* =========================
     RSVP CONDITIONAL FIELD
  ========================= */

  function updateGuestsVisibility() {

    if (!attendanceSelect || !guestsGroup) {
      return;
    }


    const answer =
      attendanceSelect.value;


    if (answer === "no") {

      guestsGroup.classList.add(
        "is-hidden"
      );


      if (guestsSelect) {

        guestsSelect.value = "";

        guestsSelect.removeAttribute(
          "required"
        );

      }

    } else {

      guestsGroup.classList.remove(
        "is-hidden"
      );


      if (answer === "yes" && guestsSelect) {

        guestsSelect.setAttribute(
          "required",
          "required"
        );

      } else if (guestsSelect) {

        guestsSelect.removeAttribute(
          "required"
        );

      }

    }

  }


  attendanceSelect?.addEventListener(
    "change",
    updateGuestsVisibility
  );


  updateGuestsVisibility();


  /* =========================
     RSVP FORM
  ========================= */

  rsvpForm?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      /*
        Browser validation.
      */

      if (!rsvpForm.checkValidity()) {

        rsvpForm.reportValidity();

        return;

      }


      const formData =
        new FormData(rsvpForm);


      const responseData = {

        name:
          formData.get("name"),

        attendance:
          formData.get("attendance"),

        guests:
          formData.get("guests") || null,

        message:
          formData.get("message") || "",

        submittedAt:
          new Date().toISOString()

      };


      /*
        TEMPORARY VERSION

        For now this only logs the answer.

        Later you can replace this with:
        - fetch() to your API
        - Supabase
        - Firebase
        - Google Apps Script
        - your own backend
      */

      console.log(
        "RSVP:",
        responseData
      );


      /*
        Example API call:

        await fetch(
          "https://your-api.com/rsvp",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              responseData
            )
          }
        );
      */


      if (rsvpSuccess) {

        rsvpSuccess.hidden = false;

      }


      rsvpForm.reset();

      updateGuestsVisibility();


      if (rsvpSuccess) {

        rsvpSuccess.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }
  );


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = [
    ...document.querySelectorAll(
      ".section-inner"
    ),
    ...document.querySelectorAll(
      ".detail-card"
    ),
    ...document.querySelectorAll(
      ".month-photo-card"
    )
  ];


  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15
      }
    );


  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* =========================
     PRELOAD MONTH PHOTOS
  ========================= */

  function preloadImages() {

    for (
      let month = 1;
      month <= 12;
      month++
    ) {

      const image =
        new Image();

      image.src =
        `assets/teodor-${month}.jpg`;

    }

  }


  preloadImages();


  /* =========================
     CLEANUP
  ========================= */

  window.addEventListener(
    "beforeunload",
    () => {

      clearInterval(
        countdownInterval
      );

    }
  );

});

/* =========================
   BACKGROUND MUSIC
========================= */

const backgroundMusic = document.querySelector("#backgroundMusic");
const musicToggle = document.querySelector("#musicToggle");
const MUSIC_VOLUME = 0.35;

let musicFadeInterval = null;

function updateMusicButton() {
  if (!backgroundMusic || !musicToggle) return;

  const isPlaying = !backgroundMusic.paused;

  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Isključi muziku" : "Uključi muziku"
  );
  musicToggle.setAttribute("aria-pressed", String(isPlaying));

  const icon = musicToggle.querySelector(".music-icon");
  if (icon) {
    icon.textContent = isPlaying ? "🔊" : "🔇";
  }
}

function stopMusicFade() {
  if (musicFadeInterval !== null) {
    clearInterval(musicFadeInterval);
    musicFadeInterval = null;
  }
}

function fadeInMusic() {
  if (!backgroundMusic) return;

  stopMusicFade();

  let volume = backgroundMusic.volume;

  musicFadeInterval = setInterval(() => {
    if (backgroundMusic.paused) {
      stopMusicFade();
      return;
    }

    volume = Math.min(volume + 0.02, MUSIC_VOLUME);
    backgroundMusic.volume = volume;

    if (volume >= MUSIC_VOLUME) {
      stopMusicFade();
    }
  }, 100);
}

async function playMusic({ fade = false } = {}) {
  if (!backgroundMusic) return false;

  stopMusicFade();
  backgroundMusic.volume = fade ? 0 : MUSIC_VOLUME;

  try {
    await backgroundMusic.play();

    if (fade) {
      fadeInMusic();
    }

    updateMusicButton();
    return true;
  } catch (error) {
    updateMusicButton();
    console.log("Browser je blokirao automatsko puštanje muzike.", error);
    return false;
  }
}

function pauseMusic() {
  if (!backgroundMusic) return;

  stopMusicFade();
  backgroundMusic.pause();
  updateMusicButton();
}

async function toggleMusic() {
  if (!backgroundMusic) return;

  if (backgroundMusic.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
}

musicToggle?.addEventListener("click", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  await toggleMusic();
});

backgroundMusic?.addEventListener("play", updateMusicButton);
backgroundMusic?.addEventListener("pause", updateMusicButton);
backgroundMusic?.addEventListener("ended", updateMusicButton);

window.addEventListener("pageshow", () => {
  if (!backgroundMusic) return;

  if (!backgroundMusic.paused && backgroundMusic.volume === 0) {
    backgroundMusic.volume = MUSIC_VOLUME;
  }

  updateMusicButton();
});

updateMusicButton();

const videoIntro = document.querySelector("#videoIntro");
const introVideo = document.querySelector("#introVideo");
const skipIntro = document.querySelector("#skipIntro");
const siteContent = document.querySelector("#siteContent");

function closeIntro() {
  if (!videoIntro || !siteContent) return;

  videoIntro.classList.add("is-hidden");
  siteContent.classList.remove("is-hidden");

  playMusic({ fade: true });

  setTimeout(() => {
    videoIntro.remove();
  }, 850);
}

introVideo?.addEventListener("ended", closeIntro);

skipIntro?.addEventListener("click", () => {
  introVideo?.pause();
  closeIntro();
});

(() => {
  const signature = document.querySelector('.signature-handwritten');
  if (!signature || !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  signature.classList.add('tedi-ready');
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      signature.classList.add('tedi-writing');
      observer.disconnect();
    }
  }, { threshold: 0.6 });
  observer.observe(signature);
})();


function initBalloonFlight() {
  const block = document.querySelector(".rsvp-with-balloons");
  const balloons = block?.querySelector(".rsvp-balloons");
  const footer = block?.closest(".footer");

  if (
    !block ||
    !balloons ||
    !footer ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  balloons.addEventListener("animationend", (event) => {
    if (event.animationName !== "smoothBalloonFlight") return;

    block.classList.add("balloons-gone");
  });

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.intersectionRatio >= 0.8)) {
      return;
    }

    const balloonRect = balloons.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const distance = balloonRect.bottom - footerRect.top + 60;

    balloons.style.setProperty("--flight-y", `${-distance}px`);
    balloons.classList.add("is-flying");

    observer.disconnect();
  }, {
    threshold: 0.8
  });

  // Sačekaj sliku da bi visina i putanja bili tačno izračunati.
  if (balloons.complete && balloons.naturalWidth > 0) {
    observer.observe(balloons);
  } else {
    balloons.addEventListener("load", () => {
      observer.observe(balloons);
    }, { once: true });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBalloonFlight);
} else {
  initBalloonFlight();
}
