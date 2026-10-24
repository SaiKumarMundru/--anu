
(() => {
  // Floating romantic stickers
  const floaties = document.querySelector(".floaties");

  if (floaties) {
    const stickers =
      document.body.dataset.page === "apology"
        ? ["🐰", "💗", "🧸", "💖", "🐇", "💕"]
        : ["💗", "🌸", "✨", "💕"];

    function addSticker() {
      const el = document.createElement("span");

      el.className = "floating-sticker";
      el.textContent =
        stickers[Math.floor(Math.random() * stickers.length)];

      el.style.left = Math.random() * 94 + "vw";
      el.style.fontSize = 22 + Math.random() * 24 + "px";
      el.style.animationDuration = 8 + Math.random() * 7 + "s";

      floaties.appendChild(el);

      setTimeout(() => el.remove(), 16000);
    }

    for (let i = 0; i < 7; i++) {
      setTimeout(addSticker, i * 700);
    }

    setInterval(addSticker, 1700);
  }

  // Expandable promises on the promises page
  document.querySelectorAll(".promise").forEach((button) => {
    button.addEventListener("click", () => {
      const opened = button.classList.toggle("open");
      const symbol = button.querySelector("b");

      if (symbol) {
        symbol.textContent = opened ? "−" : "＋";
      }
    });
  });

  // Automatic music playback with a user-initiated fallback
  const song = document.getElementById("pageSong");
  const playButton = document.getElementById("playSong");
  const status = document.getElementById("musicStatus");

  if (song) {
    song.volume = 0.65;

    function updatePlayingState() {
      if (playButton) {
        playButton.textContent = "♫ Our song is playing ♡";
      }

      if (status) {
        status.textContent = "Enjoy the song ❤️";
      }
    }

    function updatePausedState() {
      if (playButton) {
        playButton.textContent = "♫ Tap to play our song";
      }

      if (status) {
        status.textContent =
          "Tap the button if music doesn't start automatically.";
      }
    }

    // Attempt autoplay when the page loads.
    song.play()
      .then(updatePlayingState)
      .catch(() => {
        updatePausedState();
      });

    // A tap allows playback when autoplay is blocked.
    if (playButton) {
      playButton.addEventListener("click", async () => {
        try {
          if (song.paused) {
            await song.play();
            updatePlayingState();
          } else {
            song.pause();
            playButton.textContent = "▶ Play our song again";
            if (status) {
              status.textContent = "Song paused.";
            }
          }
        } catch (error) {
          if (status) {
            status.textContent =
              "Please check the audio file and try again.";
          }
        }
      });
    }

    song.addEventListener("play", updatePlayingState);
    song.addEventListener("pause", () => {
      if (song.ended === false) {
        updatePausedState();
      }
    });
  }
})();
