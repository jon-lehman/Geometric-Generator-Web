// Make canvas pinch zoom and pannable if large viewport
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
var svg = document.getElementById('svg');

// If large viewport
if (viewportWidth > 600) {
    var panZoomInstance = panzoom(svg, {
        smoothScroll: false,
        pinchSpeed: 8,
        transformOrigin: {x: 0.5, y: 0.5}
    });
} 

// If small viewport
else {
    var panZoomInstance = panzoom(svg, {
        smoothScroll: false,
        pinchSpeed: 8,
        transformOrigin: {x: 0.5, y: 0.5}
    });

    panZoomInstance.pause();

    var canvas = document.getElementById('canvas');
    function zoomIn() {
        panZoomInstance.zoomTo(canvas.offsetWidth/3, canvas.offsetHeight/3, 1.1)
    }

    function zoomOut() {
        panZoomInstance.zoomTo(canvas.offsetWidth/3, canvas.offsetHeight/3, 0.9)
    }
}

// Make "Regenerate" button build new artwork
var regenerateLoading = document.getElementById('regenerateLoading');
document.getElementById('regenerateBtn').addEventListener('click', (event) => {
    regenerateLoading.setAttribute('style','display: block');
    document.getElementById('regenerateBtn').classList.remove('primary-btn');
    setTimeout(function(){
        var currentPattern = localStorage.getItem('pattern');
        if (currentPattern === "retro") {
            patternRetro();
        } else if (currentPattern === "collage") {
            patternCollage();
        } else if (currentPattern === "riseAndSet") {
            patternRiseAndSet();
        } else if (currentPattern === "hourGlass") {
            patternHourGlass();
        } else if (currentPattern === "circuits") {
            patternCircuits();
        } else if (currentPattern === "dotGrid") {
            patternDotGrid();
        } else if (currentPattern === "stigma") {
            patternStigma();
        } else if (currentPattern === "modgePodge") {
            patternModgePodge();
        } else if (currentPattern === "squareGrid") {
            patternSquareGrid();
        } else if (currentPattern === "chiseled") {
            patternChiseled();
        } else if (currentPattern === "stairs") {
            patternStairs();
        } else if (currentPattern === "islands") {
            patternIslands();
        } else if (currentPattern === "alienLanguage") {
            patternAlienLanguage();
        } else if (currentPattern === "crossGrid") {
            patternCrossGrid();
        } else if (currentPattern === "confetti") {
            patternConfetti();
        } else if (currentPattern === "wallArt") {
            patternWallArt();
        } else if (currentPattern === "terrazzo") {
            patternTerrazzo();
        } else if (currentPattern === "knickKnacks") {
            patternKnickKnacks();
        } else if (currentPattern === "streamers") {
            patternStreamers();
        } else if (currentPattern === "chips") {
            patternChips();
        } else if (currentPattern === "beacon") {
            patternBeacon();
        } else if (currentPattern === "bauhaus1") {
            patternBauhaus1();
        } else if (currentPattern === "bauhaus2") {
            patternBauhaus2();
        } else if (currentPattern === "deco") {
            patternDeco();
        } else if (currentPattern === "capsules") {
            patternCapsules();
        }else {
            patternRetro();
        }
        regenerateLoading.setAttribute('style','display: none');
    }, 20);
})

// Utility to get random integer with minimum and maximum
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility to get random float between 0 and 1
function getRandomFloat(min, max) {
    return min + Math.random() * (max - min);
}

// Utility to get random entry from array
function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Utility to get random array of numbers with min and max
function getRandomArray(min, max) {
    const randomNumbers = new Set()
    const range = max - min
    while (randomNumbers.size < range) {
        randomNumbers.add(~~(Math.random() * range))
    }
    return [...randomNumbers]
}

// Color Palettes
// Color palettes must have a minimum of 4 colors, with 5 preferred
const palettes = [{
        'name': 'Bold & Bright',
        'value': 'boldAndBright',
        'colors': [
            '#FFFFFF', //white
            '#F0F2F3', //gray
            '#FFCAB3', //peach
            '#FF5263', //red
            '#FCBD01', //yellow
            '#14AAF5', //blue
            '#796EFF' //purple
        ]
    },
    {
        'name': 'Antique Electronics',
        'value': 'antiqueElectronics',
        'colors': [
            '#25252C', //black
            '#FFE4C8', //beige
            '#E8573F', //orange
            '#FD7D8D' //pink
        ]
    },
    {
        'name': 'Elegance',
        'value': 'elegance',
        'colors': [
            '#FFE0C2', //gold
            '#FFEEDD', //white gold
            '#1D1128', //black
            '#132053', //navy
            '#50C9CE' //turquoise
        ]
    },
    {
        'name': 'Chromatic',
        'value': 'chromatic',
        'colors': [
            '#1C1C1C', //Black
            '#4C4C4C', //Dark Gray
            '#A4A4A4', //Gray
            '#CBCBCB' //Light Gray
        ]
    },
    {
        'name': 'Winter',
        'value': 'winter',
        'colors': [
            '#FFFFFF', //white
            '#E4D8D4', //Tan Gray
            '#486451', //Dark Green
            '#CFE3C3', //Light Green
            '#F9BFBF' //Pink
        ]
    },
    {
        'name': 'Plum',
        'value': 'plum',
        'colors': [
            '#F1F0F2', //Gray
            '#3C4D66', //Dark Blue
            '#65578E', //Purple
            '#4F87CB', //Blue
            '#4CC6B2', //Kelly Green
            '#9BE3AB' //Light Green
        ]
    },
    {
        'name': 'Earthy 70s',
        'value': 'earthy70s',
        'colors': [
            '#482728', //Brown
            '#F45B45', //Red
            '#F2A495', //Pink
            '#F19A00', //Yellow
            '#6E9E80', //Green
            '#006EAB', //Blue
            '#D6CFB6' //Light Gray
        ]
    },
    {
        'name': 'Arcade',
        'value': 'arcade',
        'colors': [
            '#6DC6FF', //Light Blue
            '#284080', //Blue
            '#282828', //Dark
            '#FF3944' //Red
        ]
    },
    {
        'name': 'School Day',
        'value': 'schoolDay',
        'colors': [
            '#EDF9FE', //White
            '#383838', //Black
            '#FA9AD0', //Pink
            '#FFDB69', //Yellow
            '#56F3AE', //Green
            '#55C2FF' //Blue
        ]
    },
    {
        'name': 'Unicorn',
        'value': 'unicorn',
        'colors': [
            '#FFADAD', //Red
            '#FFD6A5', //Orange
            '#FDFFB6', //yellow
            '#CAFFBF', //green
            '#9BF6FF', //Light Blue
            '#A0C4FF', //Dark Blue
            '#BDB2FF', //Purple
            '#FFC6FF', //Pink
            '#FFFFFF' //white
        ]
    },
    {
        'name': 'Under the Sea',
        'value': 'underTheSea',
        'colors': [
            '#03045E', //Darkest Blue
            '#023E8A',
            '#0077B6',
            '#0096C7',
            '#00B4D8',
            '#48CAE4',
            '#90E0EF',
            '#ADE8F4',
            '#CAF0F8', //Lightest Blue
        ]
    },
    {
        'name': 'Spooks',
        'value': 'spooks',
        'colors': [
            '#E0C2A4', //Tan
            '#6D247F', //Purple
            '#E58A1F', //Orange
            '#4A7C2A', //Green
            '#111111' //Black
        ]
    },
    {
        'name': 'Loud',
        'value': 'loud',
        'colors': [
            '#F85612', //Orange
            '#F989B3', //Pink
            '#EBE0CD', //Off white
            '#000000' //Black
        ]
    },
    {
        'name': 'Popsickle',
        'value': 'popsickle',
        'colors': [
            '#227C9D', //Dark Blue
            '#17C3B2', //Bright Blue
            '#ffCB77', //Sand
            '#FEF9EF', //White
            '#FE6D73' //Red
        ]
    }
]

// Opening custom selects
document.querySelectorAll('.custom-select').forEach(customSelect => {
    customSelect.addEventListener('click', function() {
        this.classList.toggle('open');
    })
})

window.onload = function() {

    // Populating color palettes
    var colorOptions = document.getElementById('colorOptions');
    // For each color palette
    for (i = 0; i < palettes.length; i++) {
        // Add Color Option
        var colorOptionId = 'colorOption' + i;
        colorOptions.innerHTML += '<div class="custom-select-option" id="'+colorOptionId+'"></div>';
        var colorOption = document.getElementById(colorOptionId);

        //colorOption.onclick = changeColor(i);
        colorOption.setAttribute('value', palettes[i].value)

        // Add Name
        colorOption.innerHTML += '<span class="color-name">'+palettes[i].name+'</span>'
        // Add Colors
        var colorsId = 'colors'+i
        colorOption.innerHTML += '<div class="colors" id="'+colorsId+'"></div>'
        for (y = 0; y < palettes[i].colors.length; y++) {
            document.getElementById(colorsId).innerHTML += '<div class="color-thumbnails" style="background-color:'+palettes[i].colors[y]+';"></div>'
        }
        if (i === palettes.length - 1) {
            setCustomSelects();
        }
    };

    // Setting custom select active selections and localstorage
    document.querySelectorAll('.custom-select-option').forEach(customOption => {
        customOption.addEventListener('click', event => {
            turnRegenBtnBlue();
            var customOptionValue = customOption.getAttribute('value');
            customOption.closest(".custom-select").setAttribute('value', customOptionValue)
            customOption.closest(".custom-select").querySelector(".custom-select-trigger .custom-select-selection").innerHTML = customOption.innerHTML;
            var storageKey = customOption.closest(".custom-select").id;
            localStorage.setItem(storageKey, customOptionValue);
        })
    });

    // Number input local storage
    document.querySelectorAll('input[type="number"]').forEach(numberInput => {
        numberInput.addEventListener('change', event => {
            turnRegenBtnBlue();
            var storageKey = numberInput.name;
            localStorage.setItem(storageKey, numberInput.value)
        })
    })

    // Range input local storage
    document.querySelectorAll('input[type="range"]').forEach(rangeInput => {
        rangeInput.addEventListener('input', event => {
            turnRegenBtnBlue()
            var storageKey = rangeInput.name;
            localStorage.setItem(storageKey, rangeInput.value)
        })
    })
}

//Setting certain defaults each time and checking URL for pattern
var url_string = document.URL;
var url = new URL(url_string);
var urlPattern = url.searchParams.get("pattern");
if (urlPattern) {
    localStorage.setItem('pattern', urlPattern);
} else if (localStorage.getItem('pattern') == (null || '' || undefined)) {
    localStorage.setItem('pattern', 'retro')
} 
localStorage.setItem('columnCount', 4);
localStorage.setItem('rowCount', 6);
if (localStorage.getItem('colorPalette') == (null || '' || undefined)) {localStorage.setItem('colorPalette', 'randomize')};
if (localStorage.getItem('density') == (null || '' || undefined)) {localStorage.setItem('density', 100)};
if (localStorage.getItem('canvasColor') == (null || '' || undefined)) {localStorage.setItem('canvasColor', 'white')};
if (localStorage.getItem('padding') == (null || '' || undefined)) {localStorage.setItem('padding', 'large')};
if (localStorage.getItem('format') == (null || '' || undefined)) {localStorage.setItem('format', 'svg')};
if (localStorage.getItem('artspaceColor') == (null || '' || undefined)) {localStorage.setItem('artspaceColor', '#1E1E24')};

// Setting input defaults
document.getElementById('pattern').value = localStorage.getItem('pattern');
document.getElementById('colorPalette').value = localStorage.getItem('colorPalette');
document.getElementById('columnCountInput').value = localStorage.getItem('columnCount');
document.getElementById('rowCountInput').value = localStorage.getItem('rowCount');
document.getElementById('densityRange').value = localStorage.getItem('density');
document.getElementById('densityInput').value = localStorage.getItem('density');
document.getElementById('canvasColor').value = localStorage.getItem('canvasColor');
document.getElementById('padding').value = localStorage.getItem('padding');
document.getElementById('format').value = localStorage.getItem('format');
document.getElementById('artspaceColor').value = localStorage.getItem('artspaceColor');

// set/update artspacecolor on input change
document.getElementById('artspaceColor').addEventListener('input', event => {
    localStorage.setItem('artspaceColor', document.getElementById('artspaceColor').value);
    document.getElementById('canvas').style.backgroundColor = document.getElementById('artspaceColor').value;
    document.getElementById('artspaceColorBtn').querySelector('span').innerHTML = document.getElementById('artspaceColor').value;
});

// Set initial artspace color
document.getElementById('canvas').style.backgroundColor = localStorage.getItem('artspaceColor');
document.getElementById('artspaceColorBtn').querySelector('span').innerHTML = localStorage.getItem('artspaceColor');

// Recenter button behavior
document.getElementById('recenterBtn').addEventListener('click', event => {
    panZoomInstance.moveTo(0, 0);
    panZoomInstance.zoomAbs(0, 0, 1);
})

// set custom select values after color palettes populated
function setCustomSelects() {
    document.querySelectorAll('.custom-select').forEach(customSelect => {
        turnRegenBtnBlue()
        var selectedValue = customSelect.value;
        var selectedHTML = customSelect.querySelector('.custom-select-option[value="'+selectedValue+'"]');
        customSelect.querySelector('.custom-select-selection').innerHTML = selectedHTML.innerHTML;
    })
}

// Make range inputs have progress styling
document.querySelectorAll('input[type=range]').forEach(rangeInput => {
    var valuePercent = rangeInput.value;
    rangeInput.addEventListener('input', event => {
        var valuePercent = rangeInput.value;
        rangeInput.nextElementSibling.setAttribute('style', 'background-image: linear-gradient(90deg, var(--blue) '+valuePercent+'%, var(--light-black) '+valuePercent+'%);');
    })
    rangeInput.nextElementSibling.setAttribute('style', 'background-image: linear-gradient(90deg, var(--blue) '+valuePercent+'%, var(--light-black) '+valuePercent+'%);');
});


// Density input and range to reflect one another
var densityRange = document.getElementById('densityRange');
var densityInput = document.getElementById('densityInput');
densityRange.addEventListener('input', (event) => {
    densityInput.value = densityRange.value;
})
densityInput.addEventListener('input', (event) => {
    densityRange.value = densityInput.value;
    densityRange.nextElementSibling.setAttribute('style', 'background-image: linear-gradient(90deg, var(--blue) '+densityInput.value+'%, var(--light-black) '+densityInput.value+'%);');
    if (densityInput.value > 100) {
        densityInput.value = 100;
    }
})

// Trigger download on button click
var link = document.getElementById('downloadBtn');
link.addEventListener('click', (event) => {
    var format = localStorage.getItem('format');
    if (format == 'svg') {downloadSVG()}
    else if (format == 'png1x') {downloadPNG()}
    else if (format == 'png2x') {downloadPNG2x()}
    else if (format == 'png4x') {downloadPNG4x()}
    else if (format == 'png8x') {downloadPNG8x()};
})

// Creating and writing SVG file
function downloadSVG() {
    var svg_root = document.getElementById('svg').outerHTML;
    var svgBlob = new Blob([svg_root], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "GeometricIllustration.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

// Creating and writing 1x PNG file
function downloadPNG() {
    document.getElementById('svg').removeAttribute('style');
    panZoomInstance.moveTo(0, 0);
    panZoomInstance.zoomAbs(0, 0, 1);
    saveSvgAsPng(document.getElementById("svg"), "GeometricIllustration.png");
};

// Creating and writing 2x PNG file
function downloadPNG2x() {
    document.getElementById('svg').removeAttribute('style');
    panZoomInstance.moveTo(0, 0);
    panZoomInstance.zoomAbs(0, 0, 1);
    saveSvgAsPng(document.getElementById("svg"), "GeometricIllustration.png", {scale: 2});
};

// Creating and writing 4x PNG file
function downloadPNG4x() {
    document.getElementById('svg').removeAttribute('style');
    panZoomInstance.moveTo(0, 0);
    panZoomInstance.zoomAbs(0, 0, 1);
    saveSvgAsPng(document.getElementById("svg"), "GeometricIllustration.png", {scale: 4});
};

// Creating and writing 8x PNG file
function downloadPNG8x() {
    document.getElementById('svg').removeAttribute('style');
    panZoomInstance.moveTo(0, 0);
    panZoomInstance.zoomAbs(0, 0, 1);
    saveSvgAsPng(document.getElementById("svg"), "GeometricIllustration.png", {scale: 8});
};

// triggering artwork build on initial load
regenerateLoading.click();

// Turn regenerate button blue on input change
function turnRegenBtnBlue() {
    document.getElementById('regenerateBtn').classList.add('primary-btn');
}