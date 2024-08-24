$(document).ready(function () {
  let currentAudio = null; // Şu anda çalan sesin nesnesi
  let isPlaying = false; // Sesin çalıp çalmadığını takip etmek için değişken

  // Ses çubuklarını kontrol etme
  $(".audio-player").each(function () {
    const $progress = $(this).find(".audio-progress");
    const audioSrc = $(this).attr("data-src");
    const audio = new Audio(audioSrc);

    // Ses çubuğuna tıklandığında
    $(this).on("click", function () {
      // Eğer tıklanan ses çubuğu şu anda çalıyorsa durdur
      if (currentAudio === audio && isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        // Eğer başka bir ses çalınıyorsa, onu durdur
        if (currentAudio && isPlaying) {
          currentAudio.pause();
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
      $progress.width(progressPercent + "%");
    });

    // Ses çubuğuna tıklandığında ilgili konuma gitme
    $progress.on("click", function (e) {
      const rect = this.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = offsetX / rect.width;
      const time = percent * audio.duration;
      audio.currentTime = time;
    });
  });
});

// hızmetler ıcın alert
document.getElementById("hizmetlerBtn").addEventListener("click", function() {
  alert("Aktif hizmetimiz bulunmamaktadır...");
});
