document.addEventListener("DOMContentLoaded", function () {
  let currentAudio = null; // Şu anda çalan sesin nesnesi
  let isPlaying = false; // Sesin çalıp çalmadığını takip etmek için değişken

  // Video elemanını seç
  const mainVideo = document.getElementById("mainVideo");

  // Tüm ses çubuklarını bul ve işle
  document.querySelectorAll(".audio-player").forEach(function (audioPlayer) {
    const progress = audioPlayer.querySelector(".audio-progress");
    const audioSrc = audioPlayer.getAttribute("data-src");
    const audio = new Audio(audioSrc);

    // Ses çubuğuna tıklandığında
    audioPlayer.addEventListener("click", function () {
      // Eğer tıklanan ses çubuğu şu anda çalıyorsa durdur
      if (currentAudio === audio && isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        // Eğer başka bir ses çalınıyorsa, onu durdur
        if (currentAudio && isPlaying) {
          currentAudio.pause();
        }

        // Videoyu durdur
        if (!mainVideo.paused) {
          mainVideo.pause();
        }

        // Tıklanan ses çubuğunu çalan ses olarak ayarla
        currentAudio = audio;
        // Tıklanan ses çubuğunu çalmaya başla
        audio.play();
        isPlaying = true;
      }
    });

    // Ses çalma durumu değiştikçe güncelleme
    audio.addEventListener("timeupdate", function () {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = progressPercent + "%";
    });

    // Ses çubuğuna tıklandığında ilgili konuma gitme
    progress.addEventListener("click", function (e) {
      const rect = progress.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = offsetX / rect.width;
      const time = percent * audio.duration;
      audio.currentTime = time;
    });
  });

  // Video tekrar oynatılabilir ama duruma göre kontrol edilecek.
  if (mainVideo) {
    mainVideo.addEventListener("play", function () {
      if (currentAudio && isPlaying) {
        currentAudio.pause();
        isPlaying = false;
      }
    });
  }
});

// Hizmetler için alert
const hizmetlerBtn = document.getElementById("hizmetlerBtn");
if (hizmetlerBtn) {
  hizmetlerBtn.addEventListener("click", function () {
    alert("Aktif hizmetimiz bulunmamaktadır...");
  });
}
