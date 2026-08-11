/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm1Platforms(gsap, ScrollTrigger, MotionPathPlugin) {
// PLATFORM VERTICAL SCROLL (All Platforms)
        // ============================================
        const allDSPLogos = [
            { name: 'Spotify', file: 'spotify.png' },
            { name: 'Apple Music', file: 'applemusic.png' },
            { name: 'YouTube Music', file: 'ytmusic.png' },
            { name: 'Amazon Music', file: 'amazonmusic.png' },
            { name: 'YouTube', file: 'youtube.png' },
            { name: 'TikTok Music', file: 'tiktok-music-library.png' },
            { name: 'Instagram Music', file: 'instagram-music.png' },
            { name: 'Meta', file: 'facebook.png' },
            { name: 'JioSaavn', file: 'jiosaavan.png' },
            { name: 'Gaana', file: 'gaana.png' },
            { name: 'Hungama', file: 'hungamamusic.png' },
            { name: 'Wynk Music', file: 'wynkmusic.png' },
            { name: 'Deezer', file: 'deezer.png' },
            { name: 'Tidal', file: 'tidal.png' },
            { name: 'Pandora', file: 'pandora.png' },
            { name: 'Boomplay', file: 'boomplay.png' },
            { name: 'SoundCloud', file: 'soundcloud.png' },
            { name: 'Napster', file: 'napster.png' },
            { name: 'Audiomack', file: 'audiomack.png' },
            { name: 'Anghami', file: 'anghami.png' },
            { name: 'KKBOX', file: 'kkbox.png' },
            { name: 'JOOX', file: 'joox.png' },
            { name: 'QQ Music', file: 'kugoumusic.png' },
            { name: 'Kuwo Music', file: 'kuwomusic.png' },
            { name: 'NetEase', file: 'neteasecloud.png' },
            { name: 'Yandex Music', file: 'yandexmusic.png' },
            { name: 'VK Music', file: 'vkmusic.png' },
            { name: 'Melon', file: 'melonmusic.png' },
            { name: 'Genie', file: 'geniemusic.png' },
            { name: 'Bugs', file: 'bugs.png' },
            { name: 'Boom', file: 'boom.png' },
            { name: 'Awa Music', file: 'awamusic.png' },
            { name: 'Resso', file: 'resso.png' },
            { name: 'Qobuz', file: 'qobuz.png' },
            { name: 'iHeartRadio', file: 'iheartradio.png' },
            { name: 'Tencent', file: 'tencentmusic.png' },
            { name: 'Snapchat', file: 'snapchat-sounds.png' },
            { name: 'WhatsApp', file: 'whatsapp.png' },
            { name: 'Peloton', file: 'peloton.png' },
            { name: 'Flo Music', file: 'flomusic.png' },
            { name: 'UMA Music', file: 'umamusic.png' },
            { name: 'Zvuk', file: 'zvuk.png' },
            { name: 'LINE Music', file: 'linemusic.png' },
            { name: 'Facebook Rights', file: 'facebook-rights-management.png' },
            { name: 'Facebook Audio', file: 'facebook-audio-library.png' },
            { name: 'YouTube CID', file: 'youtube-content-id.png' },
            { name: 'ACRCloud', file: 'acr-cloud.png' }
        ];

        // Split into 4 columns
        const col1Data = allDSPLogos.filter((_, i) => i % 4 === 0);
        const col2Data = allDSPLogos.filter((_, i) => i % 4 === 1);
        const col3Data = allDSPLogos.filter((_, i) => i % 4 === 2);
        const col4Data = allDSPLogos.filter((_, i) => i % 4 === 3);

        function createLogoCards(column, data) {
            data.forEach(logo => {
                const card = document.createElement('div');
                card.className = 'platform-logo-card';
                card.innerHTML = `
      <img src="https://cms.karharimedia.com/images/dsp/${logo.file}" alt="${logo.name}" loading="lazy" decoding="async">
    `;
                column.appendChild(card);
            });
        }

        const col1 = document.getElementById('scrollColumn1');
        const col2 = document.getElementById('scrollColumn2');
        const col3 = document.getElementById('scrollColumn3');
        const col4 = document.getElementById('scrollColumn4');

        createLogoCards(col1, col1Data);
        createLogoCards(col2, col2Data);
        createLogoCards(col3, col3Data);
        createLogoCards(col4, col4Data);

        // Duplicate content for seamless scroll
        [col1, col2, col3, col4].forEach(col => {
            const clone = col.innerHTML;
            col.innerHTML += clone;
        });

        // Animate each column with different speeds for visual interest
        function animateColumn(col, duration, direction) {
            const totalHeight = col.scrollHeight / 2;
            gsap.fromTo(col,
                { y: direction === 'up' ? 0 : -totalHeight },
                {
                    y: direction === 'up' ? -totalHeight : 0,
                    duration: duration,
                    repeat: -1,
                    ease: 'none',
                    modifiers: {
                        y: gsap.utils.unitize(y => parseFloat(y) % totalHeight)
                    }
                }
            );
        }

        animateColumn(col1, 40, 'up');
        animateColumn(col2, 50, 'down');
        animateColumn(col3, 45, 'up');
        animateColumn(col4, 55, 'down');

        // ============================================
        // SECTION SCROLL REVEALS
        // ============================================
        gsap.from('.platforms-content', {
            scrollTrigger: {
                trigger: '.all-platforms',
                start: 'top 75%',
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.platforms-scroll-wrapper', {
            scrollTrigger: {
                trigger: '.all-platforms',
                start: 'top 75%',
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });


        /* ==================== index2.html (km2) scripts ==================== */
}
