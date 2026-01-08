/*
* FlipbookifyImageJS
* https://siwakornpc.neocities.org/modules/flipbookify-image-js
* 
* Copyright Siwakorn P. and only me
* 
* 6/Jan/2026
*/

export function flipbookify(obj) {
	if (!obj.pageImages) {
		throw new Error("FlipbookifyImageJS: Object pageImages is null.\n\tCannot generate the flipbook without any pages.")
	}

    if (obj.audios && typeof obj.audios === "object") {
        const fileExtensionNames = [
            ".3gp",
            ".aa",
            ".aac",
            ".aax",
            ".act",
            ".aiff",
            ".alac",
            ".amr",
            ".ape",
            ".au",
            ".awb",
            ".dss",
            ".dvf",
            ".flac",
            ".gsm",
            ".iklax",
            ".ivs",
            ".m4a",
            ".m4b",
            ".m4p",
            ".mmf",
            ".movpkg",
            ".mp1",
            ".mp2",
            ".mp3",
            ".mpc",
            ".msv",
            ".nmf",
            ".ogg",
            ".oga",
            ".mogg",
            ".opus",
            ".ra",
            ".rm",
            ".raw",
            ".rf64",
            ".sln",
            ".tta",
            ".voc",
            ".vox",
            ".wav",
            ".wma",
            ".wv",
            ".webm",
            ".8svx",
            ".cda"
        ];

        function hasFileExtension(name) {
            return fileExtensionNames.some(ext =>
                name.toLowerCase().endsWith(ext)
            );
        }
            
        function isValidURL(str) {
            try {
                new URL(str);
                return true;
            } catch {
                return false;
            }
        }

        function hasSelfURL(name) {
            const base = `${window.location.protocol}//${window.location.host}/`;
            return (
                isValidURL(`${base}${name}.mp3`) ||
                isValidURL(`${base}${name}.ogg`)
            );
        }

        for (const [key, value] of Object.entries(obj.audios)) {

            if (hasFileExtension(value)) {
                throw new Error(
                    `FlipbookifyImageJS: Audio "${key}" should not include a file extension.\n\tExtensions are added automatically.`
                );
            }

            if (hasSelfURL(value)) {
                continue;
            }

            if (
                !isValidURL(`${value}.mp3`) &&
                !isValidURL(`${value}.ogg`)
            ) {
                throw new Error(
                    `FlipbookifyImageJS: Invalid audio source for "${key}".\n\tOnly .mp3 and .ogg are supported.`
                );
            }
        }
    }


    console.log("%cSiwakorn's JS Flipbook v1.1.0", "font-size: 20px;");
    let holder = "";

    if (obj.ui) {
        holder += `<div class="ui-book">`;

        if (obj.audios) {
            holder += `
          <p class="ui-btn ui-btn-disabled" style="color:white; margin: 5px 0px;">♫</p>
          <div class="ui-b-c">
            <div class="ui-btn pause" id="play"></div>
            <div class="volplayer">
              <div class="ui-btn vol0" id="volBtn"></div>
              <div id="volcontrol" class="hidden">
                <div class="ui-btn plus" id="volPlus"></div>
                <div class="ui-slider" id="volSlider">
                  <output type="number" id="volOutput" class="ui-btn-num output flex">100</output>
                  <input type="range" id="volume-slider" min="0" max="100" value="100" oninput="this.value">
                </div>
                <div class="ui-btn minus" id="volMinus"></div>
              </div>
            </div>
          </div>`;
        }

        holder += `          <div id="not-mobile">`;

        if (obj.hasZoom) {
            holder += `
            <p class="ui-btn ui-btn-disabled notoify" style="color:white; margin: 5px 0px;">🔍</p>
            <div class="ui-b-c">
              <div class="ui-btn mag" id="zoom"></div>
              <div class="ui-b-c not-used" id="zoomcontrol">
                <div class="ui-btn plus" id="zoomPlus"></div>
                <div class="ui-btn-static ui-btn-num ui-w-num" id="zoomPer">100%</div>
                <div class="ui-btn minus" id="zoomMinus"></div>
              </div>
            </div>`;
        }

        if (obj.keybinds) {
            holder += `
            <p class="ui-btn ui-btn-disabled notoify" style="color:white; margin: 5px 0px;">ℹ</p>
            <div class="ui-b-c">
              <div class="ui-btn key-help" id="help"></div>
              <div class="flex" id="helpbox-align">
                <div class="ui-btn ui-freestyle-text ui-ft-hang" style="width: 220px;" id="helpbox">
                  <p class="ui-btn-num" style="font-size: 0.8em; text-align: left; margin: 0px; text-shadow: 0 0 5px #000000c0;">
                    <span class="key-label">P</span>&#9;Play/Pause
                    <br><span class="key-label">M</span>&#9;Mute/Unmute
                    <br><span class="key-label">↑</span><span class="key-label">↓</span>&#9;Adjust Volume (±5%)
                    <br><span class="key-label">Z</span>&#9;Zoom
                    <br><span class="key-label">+</span><span class="key-label">-</span>&#9;Adjust Zoom (±50%)
                    <br><span class="key-label">A</span><span class="key-label">D</span>|<span class="key-label">←</span><span class="key-label">→</span>&#9;Flip Pages
                  </p>
                </div>
              </div>
              <div class="flex">
                <div style="width: 240px; height:1px; position:absolute;" id="secbox"></div>
              </div>
            </div>`;
        }
        holder += `</div>`;
    }
          
    holder += `</div>`;
    
    if (obj.audios) {
        holder += `
    <audio loop autoplay class="player">
      <source src="" type="audio/ogg">
      <source src="" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>`;
    }

    document.getElementById('base').innerHTML = `
    <div class="book">
    
      <div>
          <div class="ui-btn ui-btn-disabled">
          </div>
      </div>
      
      <div class="e-book">
      </div>
      
      <div class="webtoon">
      </div>
    
      <!--ui book-->
      <div>
      ${holder}
      </div>
    </div>`;

    if (obj.keybinds) {
        document.getElementById('base').innerHTML += `
        <div id="indi" class="">
            <div class="ui-e-indi"><span>NULL</span></div>
        </div>`; 
    }

    const book = document.querySelector('.book');
    const eBook = document.querySelector('.e-book');
    const webtoon = document.querySelector('.webtoon');
    const page = document.createElement('div');
    const pageWebtoon = document.createElement('div');
    const forb = document.createElement('div');
    const pageContent = document.createElement('img');
    const pagesData = obj.pageImages;

    let isRight = false;
    let pageWebtoonCounter = 0;

    function buildPage(page, sw, pd) {
        const forb = document.createElement('div');
        const pageContent = document.createElement('img');

        forb.className = sw === 0 ? 'front' : 'back';
        pageContent.className = sw === 0 ? 'p-right' : 'p-left';
        pageContent.src = pagesData[pd];

        if (sw === 1) {
            pageContent.classList.add('translate');
        }

        forb.appendChild(pageContent);
        page.appendChild(forb);
    }

    for (let i = 0; i < pagesData.length; i++) {
        const page = document.createElement('div');
        page.className = 'page';
        page.style.zIndex = pagesData.length - i - 1;

        buildPage(page, 0, i);
        if (i + 1 < pagesData.length) buildPage(page, 1, i + 1);

        if (i + 1 === pagesData.length) continue;

        if (obj.singlePages) i++;

        eBook.appendChild(page);
    }

    for (let i = 0; i < pagesData.length; i++) {
        if (!obj.singlePages) {
            ['p-left', 'p-right'].forEach((side) => {
                if (side === 'p-left' && i === 0) return;
                const pageWebtoon = document.createElement('div');
                const pageContent = document.createElement('img');

                pageWebtoon.className = "pageWebtoon";
                pageWebtoon.id = pageWebtoonCounter++;
                pageContent.className = side;
                pageContent.src = pagesData[i];

                pageWebtoon.appendChild(pageContent);
                webtoon.appendChild(pageWebtoon);
            });
        } else {
            const pageWebtoon = document.createElement('div');
            const pageContent = document.createElement('img');

            pageWebtoon.className = "pageWebtoon";
            pageWebtoon.id = pageWebtoonCounter++;
            pageContent.src = pagesData[i];

            pageWebtoon.appendChild(pageContent);
            webtoon.appendChild(pageWebtoon);
        }
    }

    const pages = document.querySelectorAll('.page');

    let topZ = pages.length;
    pages.forEach((page, index) => {

    const originalZ = pages.length - index - 1;
    page.style.zIndex = originalZ;

    page.addEventListener('click', () => {

        const isFlipped = page.classList.contains('flipped');
        page.classList.toggle('flipped');

        if (!isFlipped) {
        page.style.zIndex = topZ;
        } else {
        if (!page.nextElementSibling) return;
        page.nextElementSibling.style.zIndex = originalZ;
        }
    });
    });

    let isOpenFirst = false;
    let isOpenLast = false;
    let currentPageIndex = -1;
    let savedPageIndexPosition = 0;

    pages.forEach((page, index) => {
    page.addEventListener('click', (e) => {

        if (index === 0) {
        isOpenFirst = !isOpenFirst;

        if (isOpenFirst) {
            book.classList.add('l-center');
            document.querySelector('.e-book').classList.add('l-center');
        } else {
            book.classList.remove('l-center');
            document.querySelector('.e-book').classList.remove('l-center');
        }
        }

        if (index === pages.length - 1) {
        isOpenLast = !isOpenLast;

        if (isOpenLast) {
            book.classList.add('r-center');
            document.querySelector('.ui-book').classList.add('r-center');
            document.querySelector('.e-book').classList.add('r-center');
        } else {
            book.classList.remove('r-center');
            document.querySelector('.ui-book').classList.remove('r-center');
            document.querySelector('.e-book').classList.remove('r-center');
        }
        }
        if (!page.classList.contains("flipped")) {
        currentPageIndex--;
        } else {
        currentPageIndex = index;
        }
    });
    });

    pages.forEach((page, index) => {
    page.addEventListener('click', () => {
        const wasFlipped = page.classList.contains("flipped");

        if (!wasFlipped) {
        savedPageIndexPosition = index;
        } else {
        savedPageIndexPosition = index + 1;
        }

        const webtoonIndex = bookToWebtoonPage(savedPageIndexPosition);

        if (wasFlipped) {
            pagesWebtoon[webtoonIndex].classList.add('onscreen');
            pagesWebtoon[webtoonIndex - 1].classList.add('onscreen');
        } else {
            pagesWebtoon[webtoonIndex + 2].classList.remove('onscreen');
            pagesWebtoon[webtoonIndex + 1].classList.remove('onscreen');
        }
        localStorage.setItem("pageIndex", savedPageIndexPosition);
    });
    });

    function updatePageLabelFromEventIndiOnEvents(index) {
    switch (index){
        case -1:
        return "Cover";
        break;
        case 0:
        return "Pre-Cover";
        break;
        case 1:
        return `Page: Quote - ${index}`;
        break;
        case (pages.length - 1):
        return "Back Cover";
        break;
        default:
        const left = (index - 1) * 2;
        const right = left + 1;
        return `Page: ${left} - ${right}`;
    }
    }

    pages.forEach(function (page) {
    page.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
    });

    window.userPaused = false;

    const slider = document.getElementById('volume-slider');
    const players = document.querySelectorAll('.player');
    const output = document.getElementById('volOutput');
    const plusBtn = document.getElementById('volPlus');
    const minusBtn = document.getElementById('volMinus');
    const volBtn = document.getElementById('volBtn');
    const step = 0.05;

    function updateSliderFill(slider) {
        const val = +slider.value;
        const max = +slider.max || 100;
        const percent = (val / max) * 100;
        slider.style.setProperty('--val', `${percent}%`);
    }

    function updateUIFromVolume(volume) {
        const percent = Math.round(volume * 100);
        if (slider) slider.value = percent;
        if (output) output.textContent = percent;
        updateSliderFill(slider);
        updateVolButton(percent);
    }

    function saveVolume() {
        const avgVol =
        [...players].reduce((sum, p) => sum + p.volume, 0) / players.length;
        localStorage.setItem('volume', avgVol);
    }

    function getAverageVolume() {
        return (
        [...players].reduce((sum, p) => sum + p.volume, 0) / players.length
        );
    }

    const saved = parseFloat(localStorage.getItem('volume'));
    const startVolume = !isNaN(saved) ? saved : 1;
    players.forEach(p => (p.volume = startVolume));
    updateUIFromVolume(startVolume);

    slider?.addEventListener('input', () => {
        const volume = slider.value / 100;
        players.forEach(p => (p.volume = volume));
        updateUIFromVolume(volume);
        saveVolume();
    });

    plusBtn?.addEventListener('click', () => {
        players.forEach(p => (p.volume = Math.min(p.volume + step, 1)));
        const avgVol = getAverageVolume();
        updateUIFromVolume(avgVol);
        saveVolume();
    });

    minusBtn?.addEventListener('click', () => {
        players.forEach(p => (p.volume = Math.max(p.volume - step, 0)));
        const avgVol = getAverageVolume();
        updateUIFromVolume(avgVol);
        saveVolume();
    });

    document?.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
        players.forEach(p => (p.volume = Math.min(p.volume + step, 1)));
        const avgVol = getAverageVolume();
        updateUIFromVolume(avgVol);
        updateEventIndiOnEvents(`Volume: ${output.textContent}%`);
        saveVolume();
        }
        if (event.key === 'ArrowDown') {
        players.forEach(p => (p.volume = Math.max(p.volume - step, 0)));
        const avgVol = getAverageVolume();
        updateUIFromVolume(avgVol);
        updateEventIndiOnEvents(`Volume: ${output.textContent}%`);
        saveVolume();
        }
    });

    // play stop
    const playBtn = document.getElementById('play');

    playBtn.addEventListener('click', () => {
        let isPlaying = false;
        
        players.forEach(p => {
        if (!p.paused) isPlaying = true;
        });

        if (isPlaying) {
        players.forEach(p => p.pause());
        playBtn.classList.add('play');
        playBtn.classList.remove('pause');
        window.userPaused = true;
        } else {
        players.forEach(p => p.play());
        playBtn.classList.add('pause');
        playBtn.classList.remove('play');
        window.userPaused = false;
        }
    });



    setInterval(() => {
        players.forEach(player => {
        if (!player.paused) {
            playBtn.classList.add('pause');
            playBtn.classList.remove('play');
        } else {
            playBtn.classList.add('play');
            playBtn.classList.remove('pause');
        }
        });
    }, 200);

    // vol button
    updateVolButton(Math.round(startVolume * 100));

    function updateVolButton(volumePercent) {
        volBtn.classList.remove('volno', 'vol1', 'vol2');

        if (volumePercent === 0) {
        volBtn.classList.add('volno');
        } else if (volumePercent <= 50) {
        volBtn.classList.add('vol1');
        } else if (volumePercent <= 100) {
        volBtn.classList.add('vol2');
        }
    }

    let lastVolume = 1; // default to full volume
    let isMuted = false;

    slider.addEventListener('click', function () {
        if (output.value === 0 || output.value < 0.01) {
        lastVolume = 0.2;
        isMuted = true;
        } else {
        isMuted = false;
        }
    });

    minusBtn.addEventListener('click', function () {
        if (output.value === 0 || output.value < 0.01) {
        lastVolume = 0.2;
        isMuted = true;
        } else {
        isMuted = false;
        }
    });

    volBtn.addEventListener('click', function () {
        if (!isMuted) {
        lastVolume = getAverageVolume();
        players.forEach(p => p.volume = 0);
        updateUIFromVolume(0);
        isMuted = true;
        } else {
        players.forEach(p => p.volume = lastVolume);
        updateUIFromVolume(lastVolume);
        isMuted = false;
        }
        saveVolume();
    });

    const volCtrl = document.getElementById('volcontrol');

    volBtn.addEventListener('mouseenter', () => {
        volCtrl.classList.add('visible');
    });

    volBtn.addEventListener('mouseleave', () => {
        volCtrl.classList.remove('visible');
    });

    volCtrl.addEventListener('mouseenter', () => {
        volCtrl.classList.add('visible');
    });
    volCtrl.addEventListener('mouseleave', () => {
        volCtrl.classList.remove('visible');
    });
    // change audio in-between scenes
    const mainPlayer = document.querySelector('audio');
    const sourceTags = mainPlayer.querySelectorAll('source');
    const outputNum = document.querySelector('output');
    const pagesWebtoon = document.querySelectorAll('.pageWebtoon');

    const pageSongs = obj.audios;

    let currentSrcBase = pageSongs[0];

    let userPaused = false;

    mainPlayer.addEventListener('pause', () => {
        userPaused = true;
    });

    mainPlayer.addEventListener('play', () => {
        userPaused = false;
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        mainPlayer.load();
    }, {once: true});

    function setSourcePaths(basePath) {
        sourceTags.forEach(source => {
        if (source.type === "audio/ogg") {
            source.src = `${basePath}.ogg`;
        }
        if (source.type === "audio/mpeg") {
            source.src = `${basePath}.mp3`;
        }
        });
        if (!userPaused) {
        mainPlayer.load();
        } else {
        mainPlayer.load();
        mainPlayer.pause();
        }
    }

    setSourcePaths(currentSrcBase);
    
    let fadeActive = false;
    let fadeTimer = null;

    function clearFade() {
        if (fadeTimer) {
        clearInterval(fadeTimer);
        fadeTimer = null;
        }
    }

    function fadeOut(song, duration, onDone = () => {}) {
        if (!song) {
        console.error("ERROR: FUNCTION: [JavaScript fadeOut()]: Cannot find song, return null");
        onDone();
        return;
        }

        clearFade();

        let steps = 50;
        let stepTime = duration / steps;
        let stepSize = song.volume / steps;

        fadeTimer = setInterval(() => {
        if (song.volume > stepSize) {
            song.volume = Math.max(0, song.volume - stepSize);
        } else {
            song.volume = 0;
            clearFade();
            if (userPaused) {
            song.pause();
            }
            onDone();
        }
        }, stepTime);
    }

    function fadeIn(song, targetVolume, duration) {
        if (!song) {
        console.error("ERROR: FUNCTION: [JavaScript fadeIn()]: Cannot find song, return null");
        return;
        }

        clearFade();

        song.volume = 0;
        if (!userPaused) {
        song.play();
        } else {
        return;
        }

        let steps = 50;
        let stepTime = duration / steps;
        let stepSize = targetVolume / steps;

        fadeTimer = setInterval(() => {
        if (song.volume < targetVolume - stepSize) {
            song.volume = Math.min(targetVolume, song.volume + stepSize);
        } else {
            song.volume = targetVolume;
            clearFade();
        }
        }, stepTime);
    }

    function findNearestSongId(targetIndex, dir, songMap, totalPages) {
        if (dir === "backward") {
        if (songMap[targetIndex]) return targetIndex;
        } else {
        for (let i = targetIndex - 1; i >= 0; i--) {
            if (songMap[i]) return i;
        }
        }
        return null;
    }

    pages.forEach((page, index) => {
        page.addEventListener('click', () => {
        const wasFlipped = page.classList.contains('flipped');
        const isFlippingForward = !wasFlipped;
        
        if ((index === 0)) {
            return;
        }

        const currentPageId = index;
        const dir = isFlippingForward ? "forward" : "backward";

        const nextPageId = findNearestSongId(index, dir, pageSongs, pages.length);
        if (nextPageId !== null) console.log(`At ${currentPageId}, flipping ${dir}, next song: ${nextPageId}`);

        const nextSrcBase = pageSongs[nextPageId];
        if (!nextSrcBase || nextSrcBase === currentSrcBase) return;

        const currentVolume = Number(outputNum.value);
        fadeOut(mainPlayer, 100, () => {
            setSourcePaths(nextSrcBase);
            currentSrcBase = nextSrcBase;
            fadeIn(mainPlayer, currentVolume / 100, 100);
        });
        });
    });

    let ticking = false;
    let lastCenteredIndex = -1;
    let lastScrollY = window.scrollY;

    let lastCenteredBookIndex = -1;

    let isOnLoad = true;

    setTimeout(function() {
        isOnLoad = false;
    }, 500);

    function updateWebtoonPagesIfMiddleScreen() {
        let centeredIndex = -1;
    
        pagesWebtoon.forEach((pageWebtoon, i) => {
        const rect = pageWebtoon.getBoundingClientRect();
        const centerY = window.innerHeight / 2.8;

        if (rect.top <= centerY && rect.bottom >= centerY) {
            centeredIndex = i + 1;
        }
        });

        if (centeredIndex === -1 || centeredIndex === lastCenteredIndex)
        return;

        const isScrollingDown = window.scrollY > lastScrollY;
        const direction = isScrollingDown ? "next" : "rewind";

        if (direction === "next") {
        pagesWebtoon[centeredIndex - 1].classList.add('onscreen');
        } else {
        pagesWebtoon[centeredIndex].classList.remove('onscreen');
        }

        lastCenteredIndex = centeredIndex;
        lastScrollY = window.scrollY;

        const bookPageIndex = centeredIndex / 2 | 0;
        localStorage.setItem("pageIndex", bookPageIndex);

        const nextPageId = findNearestSongId(bookPageIndex, direction, pageSongs, pages.length);

        if (nextPageId) {
        const nextSrcBase = pageSongs[nextPageId];

        if (nextSrcBase && nextSrcBase !== currentSrcBase) {
            const currentVolume = Number(outputNum.value) / 100;

            fadeOut(mainPlayer, 100, () => {
            setSourcePaths(nextSrcBase);
            currentSrcBase = nextSrcBase;
            fadeIn(mainPlayer, currentVolume, 100);
            });
        }
        }

        if (isOnLoad || bookPageIndex < 0 || bookPageIndex === lastCenteredBookIndex || bookPageIndex === savedPageIndexPosition) return;
        
        if (direction === "next") {
        pages[bookPageIndex - 1].click();
        } else {
        pages[bookPageIndex].click();
        }
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
        requestAnimationFrame(() => {
            updateWebtoonPagesIfMiddleScreen();
            ticking = false;
        });
        ticking = true;
        }
    });

    // now this acts as a cache-er... WHAT
    window.scrollTo({
        top: 0
    });
    //zoom
    const zoomBtn = document.getElementById('zoom');
    const zoomPlusBtn = document.getElementById('zoomPlus');
    const zoomMinusBtn = document.getElementById('zoomMinus');
    const zoomCtrl = document.getElementById('zoomcontrol');
    let zoomPcnt = document.getElementById('zoomPer');
    let currentScale = 1;
    let currentMoveOffset = -0.3;

    let isZoomed = false;

    let nMpX = "0px";
    let nMpY = "0px";
    let waitT;

    let mouseX;
    let mouseY;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const easeSpeed = 0.1;
    
    document.addEventListener('mouseover', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mouseX = e.clientX;
        mouseY = e.clientY;
        targetX = (e.clientX - cx) * currentMoveOffset;
        targetY = (e.clientY - cy) * currentMoveOffset;
    }, { once: true });
    
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mouseX = e.clientX;
        mouseY = e.clientY;
        targetX = (e.clientX - cx) * currentMoveOffset;
        targetY = (e.clientY - cy) * currentMoveOffset;
    });

    function updateMO() {
        currentMoveOffset = -0.4 * Math.pow(currentScale - 1, 0.415);
    }

    function updateZP() {
        zoomPcnt.textContent = `${currentScale*100}%`;
        if (currentScale*100 === 100) {
            zoomMinusBtn.classList.add('not-used');
        } else if (currentScale*100 === 500) {
            zoomPlusBtn.classList.add('not-used');
        } else {
            zoomMinusBtn.classList.remove('not-used');
            zoomPlusBtn.classList.remove('not-used');
        }
    }

    function updateZPonZ() {
        zoomPcnt.textContent = `${currentScale*100}%`;
        if (currentScale*100 === 100) {
            zoomMinusBtn.classList.add('not-used');
        } else if (currentScale*100 === 500) {
            zoomPlusBtn.classList.add('not-used');
        } else {
            zoomMinusBtn.classList.remove('not-used');
            zoomPlusBtn.classList.remove('not-used');
        }
        updateEventIndiOnEvents(`Zoom: ${zoomPcnt.textContent}`);
    }

    function updateMousePositionForKeyBindingOfZoom() {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetX = (mouseX - cx) * currentMoveOffset;
        targetY = (mouseY - cy) * currentMoveOffset;
    }

    function animate() {
        // function centerShift(baseOffset) {
        //   return baseOffset - (currentScale - 1.5);
        // }
        function fixedCenter(baseOffset, offset) {
        let scale2 = 4.34;
        let scale2o5 = scale2 + 2.64;
        let scale3 = scale2o5 + 1.76;
        let scale3o5 = scale3 + 1.24;
        let scale4 = scale3o5 + 0.92;
        let scale4o5 = scale4 + 0.74;
        let scale5 = scale4o5 + 0.58;
        if (currentScale === 1.5) return baseOffset;
        if (currentScale === 2)   return baseOffset + (scale2    * offset);
        if (currentScale === 2.5) return baseOffset + (scale2o5  * offset);
        if (currentScale === 3)   return baseOffset + (scale3    * offset);
        if (currentScale === 3.5) return baseOffset + (scale3o5  * offset);
        if (currentScale === 4)   return baseOffset + (scale4    * offset);
        if (currentScale === 4.5) return baseOffset + (scale4o5  * offset);
        if (currentScale === 5)   return baseOffset + (scale5    * offset);
        }
        if (isZoomed && !isWindowLeave) {
        currentX += (targetX - currentX) * easeSpeed;
        currentY += (targetY - currentY) * easeSpeed;
        if (window.innerWidth <= 1070 && currentScale !== 1
        ) {
            currentY += (targetY - currentY - 85) * easeSpeed;
        }

        eBook.style.transform = `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`;

        if (eBook.classList.contains("l-center")) {
            eBook.style.transform = `scale(${currentScale}) translate(calc(${currentX}px + ${fixedCenter(8.76, 1)}vh), ${currentY}px)`;
        } else if (currentScale === 1) {
            eBook.style.transform = `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`;
        }

        if (eBook.classList.contains("r-center")) {
            eBook.style.transform = `scale(${currentScale}) translate(calc(${currentX}px + ${fixedCenter(8.76 * 2, 1.96)}vh), ${currentY}px)`;
        } else if (currentScale === 1) {
            eBook.style.transform = `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`;
        }
        } else {
        currentX += (0 - currentX) * easeSpeed;
        currentY += (0 - currentY) * easeSpeed;
        eBook.style.transform = `scale(1) translate(${currentX}px, ${currentY}px)`;
        }
        requestAnimationFrame(animate);
    }
    
    animate();
    
    zoomBtn.addEventListener('click', () => {
        if (!zoomBtn.classList.contains("pressed")) {
        zoomBtn.classList.add("pressed");
        eBook.classList.add("zoomed");
        zoomCtrl.classList.remove('not-used');
        currentScale = 1.5;
        updateMO();
        updateZP();
        isZoomed = true;
        } else {
        zoomBtn.classList.remove("pressed");
        eBook.classList.remove("zoomed");
        zoomCtrl.classList.add('not-used');
        zoomPcnt.textContent = "100%";
        isZoomed = false;
        }
    });
    
    let isWindowLeave = false;
    
    document.addEventListener('mouseenter', () => {
        isWindowLeave = false;
        if (isZoomed) {
        eBook.classList.add("zoomed");
        }
    });
    
    document.addEventListener('mouseleave', () => {
        isWindowLeave = true;
        if (isZoomed) {
        eBook.classList.remove("zoomed");
        }
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!isZoomed) return;
    });

    zoomBtn.addEventListener('mouseenter', () => {
        zoomCtrl.classList.add('visible');
    });

    zoomBtn.addEventListener('mouseleave', () => {
        zoomCtrl.classList.remove('visible');
    });

    zoomCtrl.addEventListener('mouseenter', () => {
        zoomCtrl.classList.add('visible');
    });
    
    zoomCtrl.addEventListener('mouseleave', () => {
        zoomCtrl.classList.remove('visible');
    });

    zoomPlusBtn?.addEventListener('click', (e) => {
        if (currentScale < 5) {
        currentScale += 0.5;
        updateMO();
        updateZP();
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetX = (e.clientX - cx) * currentMoveOffset;
        targetY = (e.clientY - cy) * currentMoveOffset;
        }
    });

    zoomMinusBtn?.addEventListener('click', (e) => {
        if (currentScale > 1) {
        currentScale -= 0.5;
        updateMO();
        updateZP();
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetX = (e.clientX - cx) * currentMoveOffset;
        targetY = (e.clientY - cy) * currentMoveOffset;
        }
    });

    function isMobileUserAgent() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }

    if (isMobileUserAgent()) {
        document.getElementById('not-mobile').style.display = "none";
    }

    window.updateEventIndiOnEvents = function (t) {
    if (!window.eventIndi || !window.eventIndiText) {
        window.eventIndi = document.getElementById('indi');
        window.eventIndiText = document.querySelector('.ui-e-indi');
    }
    if (window.eventIndiFadeOut) {
        clearTimeout(window.eventIndiFadeOut);
    }
    window.eventIndi.classList.add('visible');
    window.eventIndiText.textContent = t;
    window.eventIndiFadeOut = setTimeout(() => {
        window.eventIndi.classList.remove('visible');
    }, 2000);
    };

    document.addEventListener('DOMContentLoaded', () => {
    window.eventIndi = document.getElementById('indi');
    window.eventIndiText = document.querySelector('.ui-e-indi');
    });

    let isMobileMode = false;

    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
        if (isMobileMode) {
            if (
                event.code === "KeyZ" ||
                event.code === "KeyA" ||
                event.code === "KeyD" ||
                event.key === "ArrowLeft" ||
                event.key === "ArrowUp" ||
                event.key === "ArrowDown" ||
                event.key === "ArrowRight" ||
                event.code === "Equal" ||
                event.code === "Minus"
            ) {
                event.preventDefault();
            }
            return; 
        }

        if (obj.keybinds) {
            if (event.code === 'KeyA' || event.key === 'ArrowLeft') {
                if (currentPageIndex < 0) return;
                pages[currentPageIndex].click();
                updateEventIndiOnEvents(updatePageLabelFromEventIndiOnEvents(currentPageIndex));
            }

            if (event.code === 'KeyD' || event.key === 'ArrowRight') {
                if (currentPageIndex >= pages.length - 1) return;
                currentPageIndex++;
                pages[currentPageIndex].click();
                updateEventIndiOnEvents(updatePageLabelFromEventIndiOnEvents(currentPageIndex));
            }

            if (event.code === 'KeyP') {
                let isPlaying = false;
                
                players.forEach(p => {
                if (!p.paused) isPlaying = true;
                });

                if (isPlaying) {
                players.forEach(p => p.pause());
                playBtn.classList.add('play');
                playBtn.classList.remove('pause');
                window.userPaused = true;
                } else {
                players.forEach(p => p.play());
                playBtn.classList.add('pause');
                playBtn.classList.remove('play');
                window.userPaused = false;
                }
            }
                
            if (event.code === 'KeyM') {
                if (!isMuted) {
                    lastVolume = getAverageVolume();
                    players.forEach(p => p.volume = 0);
                    updateUIFromVolume(0);
                    isMuted = true;
                    updateEventIndiOnEvents("Muted");
                } else {
                    players.forEach(p => p.volume = lastVolume);
                    updateUIFromVolume(lastVolume);
                    isMuted = false;
                    updateEventIndiOnEvents("Unmuted");
                }
                saveVolume();
            }

            if (event.code === 'KeyZ') {
                if (!zoomBtn.classList.contains("pressed")) {
                    zoomBtn.classList.add("pressed");
                    eBook.classList.add("zoomed");
                    zoomCtrl.classList.remove('not-used');
                    currentScale = 1.5;
                    updateMO();
                    updateZPonZ();
                    updateMousePositionForKeyBindingOfZoom();
                    isZoomed = true;
                } else {
                    zoomBtn.classList.remove("pressed");
                    eBook.classList.remove("zoomed");
                    zoomCtrl.classList.add('not-used');
                    currentScale = 1;
                    updateZPonZ();
                    updateEventIndiOnEvents("Disabled Zoom");
                    isZoomed = false;
                }
            }

            if (event.code === 'Equal') {
                if (isZoomed && currentScale < 5) {
                    currentScale += 0.5;
                    updateMO();
                    updateZPonZ();
                    eBook.classList.add("zoomed");
                    const cx = window.innerWidth / 2;
                    const cy = window.innerHeight / 2;
                    targetX = (mouseX - cx) * currentMoveOffset;
                    targetY = (mouseY - cy) * currentMoveOffset;
                }
            }

            if (event.code === 'Minus') {
                if (isZoomed && currentScale > 1) {
                    currentScale -= 0.5;
                    updateMO();
                    updateZPonZ();
                    eBook.classList.add("zoomed");
                    const cx = window.innerWidth / 2;
                    const cy = window.innerHeight / 2;
                    targetX = (mouseX - cx) * currentMoveOffset;
                    targetY = (mouseY - cy) * currentMoveOffset;
                }
            }
        }
    }

    let hasResizedToSmall = false;

    function updater() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        let locallyFlipToPage = localStorage.getItem('pageIndex');
        let locallyScrollIndex = bookToWebtoonPage(Number(locallyFlipToPage));

        const mobileCondition =
            (w <= 1070 && h >= 860) ||
            (w <= 900 && h >= 750) ||
            (w <= 700);

        if (mobileCondition) {
            isMobileMode = true;
            document.getElementById('not-mobile').style.display = "none";
            if (!hasResizedToSmall) {
            if (locallyScrollIndex) {
                const singleWebtoonPage = Number(pagesWebtoon[0].offsetHeight);
                window.scrollTo({
                top: singleWebtoonPage * Number(locallyScrollIndex)
                });
            }
            }
            hasResizedToSmall = true;
        } else {
            isMobileMode = false;
            document.getElementById('not-mobile').style.display = "";
            hasResizedToSmall = false;
        }
    }

    updater();

    function bookToWebtoonPage(ind) {
    let check = ind + (ind - 1);
    if (check < 0) check = 0;
    return check;
    }

    function webtoonToBookPage(ind) {
    return (ind + 1) / 2 | 0;
    }

    window.addEventListener('resize', updater);

    window.addEventListener('load', async () => {
    pagesWebtoon[0].classList.add('onscreen');
    function flipRight() {
        if (currentPageIndex >= pages.length - 1) return;
        currentPageIndex++;
        pages[currentPageIndex].click();
        updateEventIndiOnEvents(updatePageLabelFromEventIndiOnEvents(currentPageIndex));
    }
    const flipToPage = localStorage.getItem('pageIndex');
    const scrollIndex = bookToWebtoonPage(Number(flipToPage));

    if (flipToPage) {
        for (let i = 0; i < flipToPage; i++) {
        flipRight();
        await new Promise(resolve => setTimeout(resolve, 120));
        }
    }

    if (scrollIndex) {
        const singleWebtoonPage = Number(pagesWebtoon[0].offsetHeight);
        window.scrollTo({
        top: singleWebtoonPage * Number(scrollIndex)
        });
    }
    });

    
    const plsHelp = document.getElementById("help");
    const plsHelpBox = document.getElementById("helpbox");
    const plsHelpBoxAlign = document.getElementById("helpbox-align");
    const secBox = document.getElementById("secbox");
    
    plsHelp.addEventListener('click', () => {
    if (!plsHelp.classList.contains('pressed')) {
        plsHelp.classList.add('pressed');
        plsHelpBox.classList.add('visible');
    } else {
        plsHelp.classList.remove('pressed');
        plsHelpBox.classList.remove('visible');
    }
    });
    
    plsHelp.addEventListener('mouseleave', () => {
        plsHelp.classList.remove('pressed');
        plsHelpBox.classList.remove('visible');
    });
    
    plsHelpBox.addEventListener('mouseenter', () => {
        plsHelpBox.classList.add('visible');
        plsHelp.classList.add('pressed');
    });
    
    plsHelpBox.addEventListener('mouseleave', () => {
        plsHelpBox.classList.remove('visible');
        plsHelp.classList.remove('pressed');
    });
    
    function isHelpBoxTouchingRight() {
    const rect = secBox.getBoundingClientRect();
    const touchingRight = rect.right >= window.innerWidth;
    return touchingRight;
    }
    
    setTimeout(function() {
        if (isHelpBoxTouchingRight()) {
            plsHelpBoxAlign.style.justifyContent = "right";  
        } else {
            plsHelpBoxAlign.style.justifyContent = ""; 
        }
    }, 1000);

    window.addEventListener('resize', ()=> {
        if (isHelpBoxTouchingRight()) {
            plsHelpBoxAlign.style.justifyContent = "right";  
        } else {
            plsHelpBoxAlign.style.justifyContent = ""; 
        }
    });
    
    setInterval(function() {
        if (isHelpBoxTouchingRight()) {
            plsHelpBoxAlign.style.justifyContent = "right";  
        } else {
            plsHelpBoxAlign.style.justifyContent = ""; 
        }
    }, 100);
}
