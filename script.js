document.addEventListener("DOMContentLoaded", function () {
  const umschlagKasten = document.getElementById("umschlag-kasten");
  const siegel = document.getElementById("siegel");
  const tippText = document.getElementById("tipp-text");
  const hauptInhalt = document.getElementById("haupt-inhalt");
  const lichtAura = document.getElementById("licht-aura");

// Sanfte, langsame Scroll-Funktion mit einstellbarer Dauer
  function sanftNachUntenScrollen(zielElement, dauerInMs) {
    const zielPosition = zielElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distanz = zielPosition - startPosition;
    let startZeit = null;

    function animationsSchritt(aktuelleZeit) {
      if (!startZeit) startZeit = aktuelleZeit;
      const vergangeneZeit = aktuelleZeit - startZeit;
      const fortschritt = Math.min(vergangeneZeit / dauerInMs, 1);

      // Sanftes Abbremsen (Ease-in-out-Effekt)
      const easing = fortschritt < 0.5 
        ? 2 * fortschritt * fortschritt 
        : -1 + (4 - 2 * fortschritt) * fortschritt;

      window.scrollTo(0, startPosition + distanz * easing);

      if (vergangeneZeit < dauerInMs) {
        requestAnimationFrame(animationsSchritt);
      }
    }

    requestAnimationFrame(animationsSchritt);
  }

  // 1. Umschlag & Siegel Klick-Effekt
  if (siegel) {
    siegel.addEventListener("click", function () {
      if (lichtAura) lichtAura.classList.add("aktiv");

      setTimeout(() => {
        if (umschlagKasten) umschlagKasten.classList.add("geoeffnet");
        siegel.setAttribute("aria-expanded", "true");
        if (tippText) tippText.textContent = "Die Einladung ist geöffnet ✨";
      }, 250);

      // Wartet 1,8 Sekunden, damit man erst den Umschlag und den Goldglanz sieht,
      // und gleitet dann innerhalb von 2200 ms (2,2 Sekunden) sanft nach unten
      setTimeout(() => {
        if (hauptInhalt) {
          hauptInhalt.hidden = false;
          sanftNachUntenScrollen(hauptInhalt, 4200);
        }
      }, 2800);
    });
  }

  // 2. RSVP Pop-up Modal Klick-Funktion
  const rsvpBtn = document.getElementById("rsvp-btn");
  const rsvpModal = document.getElementById("rsvp-modal");
  const modalSchliessen = document.getElementById("modal-schliessen");

  if (rsvpBtn && rsvpModal) {
    // Öffnen bei Klick auf den RSVP-Button
    rsvpBtn.addEventListener("click", function () {
      rsvpModal.style.display = "flex";
    });

    // Schließen bei Klick auf das X
    if (modalSchliessen) {
      modalSchliessen.addEventListener("click", function () {
        rsvpModal.style.display = "none";
      });
    }

    // Schließen bei Klick neben die Box auf den dunklen Hintergrund
    rsvpModal.addEventListener("click", function (event) {
      if (event.target === rsvpModal) {
        rsvpModal.style.display = "none";
      }
    });
  }

  // 3. Live Countdown
  const zielDatum = new Date(2026, 9, 30, 18, 0, 0).getTime();

  function aktualisiereCountdown() {
    const jetzt = new Date().getTime();
    const differenz = zielDatum - jetzt;

    const tageEl = document.getElementById("tage");
    const stundenEl = document.getElementById("stunden");
    const minutenEl = document.getElementById("minuten");
    const sekundenEl = document.getElementById("sekunden");

    if (!tageEl) return;

    if (differenz <= 0) {
      tageEl.textContent = "0";
      stundenEl.textContent = "00";
      minutenEl.textContent = "00";
      sekundenEl.textContent = "00";
      return;
    }

    const tage = Math.floor(differenz / (1000 * 60 * 60 * 24));
    const stunden = Math.floor((differenz % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minuten = Math.floor((differenz % (1000 * 60 * 60)) / (1000 * 60));
    const sekunden = Math.floor((differenz % (1000 * 60)) / 1000);

    tageEl.textContent = tage;
    stundenEl.textContent = String(stunden).padStart(2, "0");
    minutenEl.textContent = String(minuten).padStart(2, "0");
    sekundenEl.textContent = String(sekunden).padStart(2, "0");
  }

  aktualisiereCountdown();
  setInterval(aktualisiereCountdown, 1000);
});
