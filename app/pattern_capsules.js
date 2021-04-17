function patternCapsules() {

  // Trigger artwork generation on page load
  document.addEventListener("DOMContentLoaded", initializeArtwork())

  function initializeArtwork() {

    // Clear Artwork
    document.getElementById('svg').innerHTML = ""

    // Setting basic variables
    var svg = document.getElementById('svg');
    var rowCount = localStorage.getItem('rowCount');
    var columnCount = localStorage.getItem('columnCount');
    var artworkWidth = columnCount * 60;
    var artworkHeight = rowCount * 60;
    var background = localStorage.getItem('canvasColor');
    var density = localStorage.getItem('density') / 100;
    var colorPalette = localStorage.getItem('colorPalette');

    // Choose single palette
    var palettesClone = JSON.parse(JSON.stringify(palettes))
    var chosenPalette = sample(palettesClone);
    for(var i = 0; i < palettes.length; i++) {
      if(palettes[i].value == colorPalette) {
        var chosenPalette = palettesClone[i];
      }
    }

    // Controlling padding
    var padding = localStorage.getItem('padding')
    if (padding === "none") {
      svg.setAttribute('width', artworkWidth + 2);
      svg.setAttribute('height', artworkHeight + 2);
      svg.innerHTML += '<rect id="rectBackground" width="' + artworkWidth + '" height="' + artworkHeight + '"/>'
    } else if (padding === "small") {
      svg.setAttribute('width', artworkWidth + 32);
      svg.setAttribute('height', artworkHeight + 32);
      svg.innerHTML += '<rect id="rectBackground" width="' + (artworkWidth + 32) + '" height="' + (artworkHeight + 32) + '"/>'
    } else if (padding === "large") {
      svg.setAttribute('width', artworkWidth + 64);
      svg.setAttribute('height', artworkHeight + 64);
      svg.innerHTML += '<rect id="rectBackground" width="' + (artworkWidth + 64) + '" height="' + (artworkHeight + 64) + '"/>'
    }

    // Collecting background as variable now that padding made it
    var rectBackground = document.getElementById('rectBackground');

    // Creating padding offset to center artwork based on padding control
    var paddingOffset = 0;
    if (padding === "small") {
      var paddingOffset = 16;
    } else if (padding === "large") {
      var paddingOffset = 32;
    }

    // Controlling background color
    var backgroundColor = '#FFFFFF';
    if (background === "white") {
      rectBackground.setAttribute('fill', 'white');
      rectBackground.style.backgroundColor = 'white';
      var backgroundColor = '#FFFFFF';
    } else if (background === "paletteColor") {
      var backgroundColor = sample(chosenPalette.colors)
      rectBackground.setAttribute('fill', backgroundColor);
      rectBackground.style.backgroundColor = backgroundColor;
    } else if (background === "transparent") {
      rectBackground.setAttribute('fill', 'none');
      rectBackground.style.backgroundColor = 'transparent';
      var backgroundColor = 'none';
    }

    // remove background color from circulation (array)
    if (chosenPalette.colors.includes(backgroundColor)) {
      var backgroundColorIndex = chosenPalette.colors.indexOf(backgroundColor);
      chosenPalette.colors.splice(backgroundColorIndex, 1);
    }

    // Setting consistent color
    var chosenColor = sample(chosenPalette.colors);
    var chosenColorIndex = chosenPalette.colors.indexOf(chosenColor);
    chosenPalette.colors.splice(chosenColorIndex, 1);

    // Initialization complete, now build actual artwork
    buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density, chosenColor);
  }

  // Build each grid item (artwork)
  function buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density, chosenColor) {

    // Create Mask
    document.getElementById('svg').innerHTML += mask(columnCount, rowCount, paddingOffset)

    // For each column
    for (let x = 0; x < columnCount; x++) {

      // For each row
      for (let y = 0; y < rowCount; y++) {

        // Check density
        if (Math.random() < density) {

          // If TOP Row
          if (y === 0) {

            // Randomly select artwork type
            var shapeSelection = getRandomInt(0, 8);

            if (shapeSelection === 0) {
              document.getElementById('svg').innerHTML += top1(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 1) {
              document.getElementById('svg').innerHTML += top2(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 2) {
              document.getElementById('svg').innerHTML += top3(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 3) {
              document.getElementById('svg').innerHTML += top4(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 4) {
              document.getElementById('svg').innerHTML += top5(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 5) {
              document.getElementById('svg').innerHTML += top6(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 6) {
              document.getElementById('svg').innerHTML += top7(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 7) {
              document.getElementById('svg').innerHTML += top8(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 8) {
              document.getElementById('svg').innerHTML += top9(x, y, paddingOffset, chosenColor);
            }

          }

          // If BOTTOM Row
          else if (y === rowCount - 1) {

            // Randomly select artwork type
            var shapeSelection = getRandomInt(0, 7);

            if (shapeSelection === 0) {
              document.getElementById('svg').innerHTML += bottom1(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 1) {
              document.getElementById('svg').innerHTML += bottom2(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 2) {
              document.getElementById('svg').innerHTML += bottom3(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 3) {
              document.getElementById('svg').innerHTML += bottom4(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 4) {
              document.getElementById('svg').innerHTML += bottom5(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 5) {
              document.getElementById('svg').innerHTML += bottom6(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 6) {
              document.getElementById('svg').innerHTML += bottom7(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 7) {
              document.getElementById('svg').innerHTML += bottom8(x, y, paddingOffset, chosenColor);
            }

          }

          // If MIDDLE Rows
          else {

            // Randomly select artwork type
            var shapeSelection = getRandomInt(0, 11);

            if (shapeSelection === 0) {
              document.getElementById('svg').innerHTML += middle1(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 1) {
              document.getElementById('svg').innerHTML += middle2(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 2) {
              document.getElementById('svg').innerHTML += middle3(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 3) {
              document.getElementById('svg').innerHTML += middle4(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 4) {
              document.getElementById('svg').innerHTML += middle5(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 5) {
              document.getElementById('svg').innerHTML += middle6(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 6) {
              document.getElementById('svg').innerHTML += middle7(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 7) {
              document.getElementById('svg').innerHTML += middle8(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 8) {
              document.getElementById('svg').innerHTML += middle9(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 9) {
              document.getElementById('svg').innerHTML += middle10(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 10) {
              document.getElementById('svg').innerHTML += middle11(x, y, paddingOffset, chosenColor);
            }

            if (shapeSelection === 11) {
              document.getElementById('svg').innerHTML += middle12(x, y, paddingOffset, chosenColor);
            }

          }

        }
        
        // If density doesn't clear
        else {
          // do nothing
        }
      }
    }
  }

  function mask(columnCount, rowCount, paddingOffset) {
    const transform = 'translate('+paddingOffset+', '+paddingOffset+')'
    const path = '<rect transform="'+transform+'" width="'+((columnCount*60)+2)+'" height="'+((rowCount*60)+2)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  // TOP

  function top1(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M25.353 15.068C29.379 17.974 32 22.707 32 28.051v13.093c2.73-4.919 7.976-8.248 14-8.248 1.967 0 3.85.355 5.591 1.004V19.55c0-7.456-6.044-13.5-13.5-13.5-5.883 0-10.89 3.764-12.738 9.017zm28.238 19.74C58.598 37.51 62 42.806 62 48.896V60h-2V48.896c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2V28.051c0-7.732-6.268-14-14-14s-14 6.268-14 14V60H0V28.051c0-8.836 7.163-16 16-16 2.76 0 5.357.699 7.623 1.93 2.237-5.808 7.87-9.93 14.468-9.93 8.56 0 15.5 6.94 15.5 15.5v15.257z" clip-rule="evenodd"/>'
    return path;
  }

  function top2(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M40.075 44.914A15.957 15.957 0 0146 43.781c8.837 0 16 7.164 16 16V60h-2v-.219c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2V19c0-7.732-6.268-14-14-14S2 11.268 2 19v40.961H0V19C0 10.367 6.838 3.33 15.393 3.011A15.435 15.435 0 0124.575 0c8.56 0 15.5 6.94 15.5 15.5v29.414zM18.876 3.258C26.34 4.613 32 11.145 32 19v33.03a16.077 16.077 0 016.075-6.151V15.5c0-7.456-6.044-13.5-13.5-13.5-2.037 0-3.968.45-5.699 1.258z" clip-rule="evenodd"/>'
    return path;
  }

  function top3(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M31.441 5.654c-8.836 0-16 7.163-16 16v9.604C6.864 31.552 0 38.6 0 47.248V60h2V47.249c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V31.544c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V31.544c0-8.758-7.037-15.873-15.766-15.998-2.4-5.805-8.118-9.892-14.793-9.892zm12.655 10.003c-2.247-4.733-7.07-8.003-12.655-8.003-7.732 0-14 6.268-14 14v9.659c5.413.483 10.05 3.662 12.559 8.184v-7.953c0-8.192 6.157-14.946 14.096-15.887z" clip-rule="evenodd"/>'
    return path;
  }

  function top4(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M35.534 9.467A15.938 15.938 0 0146 5.57c8.837 0 16 7.164 16 16V60h-2V21.57c0-7.733-6.268-14-14-14s-14 6.267-14 14V60h-2v-6.95c0-7.731-6.268-14-14-14s-14 6.269-14 14V60H0v-6.95c0-7.179 4.729-13.254 11.242-15.28V23.154c0-8.837 7.164-16 16-16 3.034 0 5.873.845 8.292 2.313zm-1.477 1.454a13.932 13.932 0 00-6.815-1.767c-7.732 0-14 6.268-14 14v14.134A16.097 16.097 0 0116 37.05c6.024 0 11.27 3.33 14 8.248v-23.73a15.94 15.94 0 014.057-10.648z" clip-rule="evenodd"/>'
    return path;
  }

  function top5(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M25.434 5.654c-8.837 0-16 7.163-16 16v24.342C3.905 48.242.007 53.666.007 60h2c0-7.24 5.87-13.109 13.109-13.109h1.783c7.24 0 13.108 5.87 13.108 13.109h2V27.31c0-7.733 6.268-14 14-14s14 6.267 14 14V60h2V27.31c0-8.837-7.163-16-16-16-2.56 0-4.98.6-7.126 1.67-2.848-4.407-7.806-7.326-13.447-7.326zm11.714 8.33a13.987 13.987 0 00-11.714-6.33c-7.732 0-14 6.268-14 14v23.69a15.14 15.14 0 013.682-.453h1.783c5.607 0 10.501 3.055 13.108 7.591V27.31c0-5.56 2.836-10.458 7.14-13.325z" clip-rule="evenodd"/>'
    return path;
  }

  function top6(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M31 0c-8.837 0-16 7.163-16 16v1.922c-4.662 2.796-7.782 7.9-7.782 13.731h.121C2.924 34.501 0 39.463 0 45.11v14.89h2V45.11c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V28.84c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V28.84c0-8.605-6.793-15.623-15.31-15.985C45.23 5.525 38.76 0 31 0zm13.655 12.896C43.243 6.658 37.665 2 31 2c-7.732 0-14 6.268-14 14v.906a15.95 15.95 0 016.218-1.253 15.932 15.932 0 0110.025 3.53 15.98 15.98 0 0111.412-6.287zm-14.637 6.516c.749.417 1.456.901 2.113 1.444A15.927 15.927 0 0030 28.84v8.517c-2.73-4.92-7.976-8.248-14-8.248a15.94 15.94 0 00-6.742 1.485c.54-7.237 6.584-12.94 13.96-12.94 2.47 0 4.787.638 6.8 1.758z" clip-rule="evenodd"/>'
    return path;
  }

  function top7(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M22.848 15.407C24.351 8.13 30.795 2.66 38.518 2.66c7.627 0 14.007 5.336 15.61 12.48 4.73 2.78 7.906 7.921 7.906 13.804V60h-2V28.944c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2v-5.038c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2v-5.038c0-5.479 2.754-10.315 6.953-13.199V31.407c0-8.79 7.088-15.925 15.861-16zm2.023.11a15.937 15.937 0 018.467 3.688 15.974 15.974 0 0112.696-6.26c2.001 0 3.917.367 5.683 1.038-1.924-5.432-7.108-9.323-13.2-9.323-6.65 0-12.22 4.638-13.646 10.856zm7.342 5.36a13.943 13.943 0 00-9.226-3.47c-7.732 0-14 6.267-14 14v9.186a15.935 15.935 0 017.047-1.631c6.024 0 11.27 3.33 14 8.248V28.944c0-2.942.794-5.699 2.18-8.067z" clip-rule="evenodd"/>'
    return path;
  }

  function top8(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M16 7.123c-8.837 0-16 7.163-16 16V60h2V23.123c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V37.783c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V37.783c0-8.836-7.163-16-16-16-6.024 0-11.27 3.33-14 8.248v-6.908c0-8.837-7.163-16-16-16z" clip-rule="evenodd"/>'
    return path;
  }

  function top9(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M38.583 5c-8.837 0-16 7.163-16 16v6.947A15.942 15.942 0 0016 26.534c-8.837 0-16 7.164-16 16v17.988h2V42.534c0-7.732 6.268-14 14-14s14 6.268 14 14V61.14h2V38.522c0-7.732 6.268-14 14-14s14 6.268 14 14v22.617h2V38.522c0-5.725-3.007-10.747-7.527-13.575h.11V21c0-8.837-7.164-16-16-16zm14 18.934V21c0-7.732-6.268-14-14-14s-14 6.268-14 14v8.029a16.072 16.072 0 015.727 6.341c1.464-7.327 7.932-12.848 15.69-12.848 2.346 0 4.575.505 6.583 1.412z" clip-rule="evenodd"/>'
    return path;
  }

  // MIDDLE

  function middle1(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 5.294a15.45 15.45 0 016.091-1.243c8.56 0 15.5 6.94 15.5 15.5v15.257A16.074 16.074 0 0160 41.144V0h2V60h-2V48.895v-.01c-.006-7.727-6.271-13.99-14-13.99-7.732 0-14 6.269-14 14V60h-2V28.051c0-7.732-6.268-14-14-14s-14 6.268-14 14V60H0V28.051c0-.73.049-1.447.143-2.15H0V0h2v20.3c2.73-4.92 7.976-8.249 14-8.249 2.76 0 5.357.699 7.623 1.93A15.554 15.554 0 0130 6.327V0h2v5.294zm0 22.757c0-5.344-2.62-10.077-6.647-12.983 1.849-5.253 6.855-9.017 12.738-9.017 7.456 0 13.5 6.044 13.5 13.5V33.9A15.966 15.966 0 0046 32.896c-6.024 0-11.27 3.329-14 8.248V28.05z" clip-rule="evenodd"/>'
    return path;
  }

  function middle2(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 19c0-7.855-5.66-14.387-13.124-15.742A13.446 13.446 0 0124.575 2c7.456 0 13.5 6.044 13.5 13.5v30.379A16.077 16.077 0 0032 52.029V19zm14 24.781c-2.093 0-4.093.402-5.925 1.133V15.5c0-5.87-3.264-10.978-8.075-13.61V0h-2v.976A15.467 15.467 0 0024.575 0a15.435 15.435 0 00-9.182 3.011C9.625 3.227 4.637 6.495 2 11.248V0H0v59.961h2V19C2 11.268 8.268 5 16 5s14 6.268 14 14v41h2v-.219c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V0h-2v52.03c-2.73-4.92-7.976-8.249-14-8.249z" clip-rule="evenodd"/>'
    return path;
  }

  function middle3(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 6.853a16.066 16.066 0 015.478 6.48A15.925 15.925 0 0146 10.877c6.024 0 11.27 3.33 14 8.248V0h2v60h-2V26.877c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2V37.063c0-7.732-6.268-14-14-14s-14 6.268-14 14V60H0V0h2v29.31a16.08 16.08 0 014.953-5.446v-3.813c0-8.836 7.164-16 16-16 2.53 0 4.921.587 7.047 1.632V0h2v6.853zm-2 20.024v2.434c-2.73-4.92-7.976-8.248-14-8.248-2.529 0-4.92.586-7.047 1.631v-2.643c0-7.732 6.268-14 14-14 5.77 0 10.727 3.491 12.87 8.48A15.968 15.968 0 0030 26.877z" clip-rule="evenodd"/>'
    return path;
  }

  function middle4(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 7.873c1.25.39 2.435.927 3.534 1.594A15.938 15.938 0 0146 5.57c6.024 0 11.27 3.33 14 8.248V0h2v60h-2V21.57c0-7.733-6.268-14-14-14s-14 6.267-14 14V60h-2v-6.95c0-7.731-6.268-14-14-14s-14 6.269-14 14V60H0V0h2v45.299a16.044 16.044 0 019.242-7.529V23.154c0-8.837 7.164-16 16-16 .94 0 1.862.08 2.758.237V0h2v7.873zm-4.758 1.28c2.476 0 4.799.642 6.815 1.768A15.94 15.94 0 0030 21.57V45.3c-2.73-4.919-7.976-8.248-14-8.248-.94 0-1.862.081-2.758.237V23.154c0-7.732 6.268-14 14-14z" clip-rule="evenodd"/>'
    return path;
  }

  function middle5(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 7.976a16.028 16.028 0 0110.413 11.489A16.05 16.05 0 0146 19.06c6.024 0 11.27 3.33 14 8.248V0h2v60h-2V35.061c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2v-6.95c0-7.731-6.268-14-14-14s-14 6.269-14 14V60H0V0h2v45.299a16.05 16.05 0 018.834-7.396v-14.78c0-8.837 7.163-16 16-16 1.083 0 2.142.108 3.166.313V0h2v7.976zm1.633 2.906a14.025 14.025 0 016.859 9.152C34.369 22.28 30 28.16 30 35.061v10.238c-2.73-4.919-7.976-8.248-14-8.248-1.084 0-2.143.108-3.166.313V23.123c0-7.732 6.268-14 14-14 2.47 0 4.787.638 6.799 1.759z" clip-rule="evenodd"/>'
    return path;
  }

  function middle6(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M31 0c-8.837 0-16 7.163-16 16v2.116c-4.662 2.796-7.782 7.899-7.782 13.73h.121A16.08 16.08 0 002 37.55V.193H0v60h2V45.303c0-7.733 6.268-14 14-14s14 6.267 14 14v14.89h2v-31.16c0-7.731 6.268-14 14-14s14 6.269 14 14v31.16h2v-60h-2v21.089c-2.619-4.72-7.555-7.976-13.272-8.232C45.344 5.622 38.83 0 31 0zm13.697 13.086C43.356 6.753 37.731 2 31 2c-7.732 0-14 6.268-14 14v1.1a15.95 15.95 0 016.218-1.253 15.932 15.932 0 0110.025 3.529 15.98 15.98 0 0111.453-6.29zm-14.68 6.52c.75.417 1.457.9 2.114 1.444A15.926 15.926 0 0030 29.034v8.516c-2.73-4.919-7.976-8.248-14-8.248a15.94 15.94 0 00-6.742 1.486c.54-7.238 6.584-12.941 13.96-12.941 2.47 0 4.787.638 6.8 1.759z" clip-rule="evenodd"/>'
    return path;
  }

  function middle7(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M30 37.784V60h2V37.784c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V0h-2v30.032c-2.73-4.92-7.976-8.248-14-8.248s-11.27 3.329-14 8.248V0h-2v15.37c-2.73-4.918-7.976-8.247-14-8.247S4.73 10.452 2 15.37V0H0V60h2V23.123c0-7.732 6.268-14 14-14 7.73 0 13.997 6.265 14 13.995V37.783z" clip-rule="evenodd"/>'
    return path;
  }

  function middle8(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 5.663c6.434.221 11.902 4.24 14.234 9.883 5.926.085 11.072 3.392 13.766 8.247V0h2V60h-2V31.545c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2v-3.522c0-7.732-6.268-14-14-14s-14 6.268-14 14V60H0V0h2v48.726c2.645-4.766 7.653-8.04 13.441-8.238V21.654c0-8.35 6.398-15.207 14.559-15.936V0h2v5.663zm-.559 1.99c5.585 0 10.408 3.271 12.655 8.004C36.156 16.598 30 23.352 30 31.545v17.181c-2.51-4.522-7.146-7.7-12.559-8.184V21.654c0-7.732 6.268-14 14-14z" clip-rule="evenodd"/>'
    return path;
  }

  function middle9(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 7.062a16.065 16.065 0 016.873 5.918A15.934 15.934 0 0146 11.31c6.024 0 11.27 3.328 14 8.247V0h2V60h-2V27.31c0-7.733-6.268-14-14-14s-14 6.267-14 14V60h-2c0-7.24-5.869-13.109-13.109-13.109H15.11C7.869 46.891 2 52.761 2 60H0V0h2v52.483a15.165 15.165 0 017.426-6.487V21.654c0-8.837 7.164-16 16-16 1.59 0 3.125.232 4.574.663V0h2v7.062zm-6.574.592c4.9 0 9.212 2.516 11.714 6.33C32.836 16.852 30 21.749 30 27.309v25.174c-2.607-4.537-7.501-7.592-13.109-7.592H15.11c-1.27 0-2.504.157-3.683.452v-23.69c0-7.731 6.268-14 14-14z" clip-rule="evenodd"/>'
    return path;
  }

  function middle10(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 7.062a16.065 16.065 0 016.873 5.918A15.934 15.934 0 0146 11.31c6.024 0 11.27 3.328 14 8.247V0h2V60h-2V27.31c0-7.733-6.268-14-14-14s-14 6.267-14 14V60h-2c0-7.24-5.869-13.109-13.109-13.109H15.11C7.869 46.891 2 52.761 2 60H0V0h2v52.483a15.165 15.165 0 017.426-6.487V21.654c0-8.837 7.164-16 16-16 1.59 0 3.125.232 4.574.663V0h2v7.062zm-6.574.592c4.9 0 9.212 2.516 11.714 6.33C32.836 16.852 30 21.749 30 27.309v25.174c-2.607-4.537-7.501-7.592-13.109-7.592H15.11c-1.27 0-2.504.157-3.683.452v-23.69c0-7.731 6.268-14 14-14z" clip-rule="evenodd"/>'
    return path;
  }

  function middle11(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M30 22.537V60h2V28.944c0-7.732 6.268-14 14-14s14 6.268 14 14V60h2V0h-2v21.192c-2.73-4.919-7.976-8.248-14-8.248s-11.27 3.33-14 8.248V0h-2v14.785c-2.73-4.92-7.976-8.248-14-8.248S4.73 9.866 2 14.785V0H0v60h2V22.537c0-7.732 6.268-14 14-14 7.73 0 13.996 6.264 14 13.993v.007z" clip-rule="evenodd"/>'
    return path;
  }

  function middle12(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M32 4.028a15.944 15.944 0 016.483-1.368c7.628 0 14.008 5.337 15.612 12.48A16.078 16.078 0 0160 21.192V0h2v60h-2V28.944c0-7.732-6.268-14-14-14s-14 6.268-14 14V60h-2v-5.038c0-7.732-6.268-14-14-14s-14 6.268-14 14V60H0V0h2v47.21a16.08 16.08 0 014.953-5.446V31.407c0-8.79 7.089-15.925 15.861-16A16.019 16.019 0 0130 5.091V0h2v4.028zm1.304 15.178a15.935 15.935 0 00-8.467-3.69C26.264 9.299 31.834 4.66 38.483 4.66c6.092 0 11.276 3.89 13.2 9.323A15.963 15.963 0 0046 12.944a15.974 15.974 0 00-12.696 6.262zm-10.35-1.8c3.534 0 6.761 1.31 9.226 3.47A15.926 15.926 0 0030 28.945V47.21c-2.73-4.919-7.976-8.248-14-8.248-2.529 0-4.92.587-7.047 1.632v-9.187c0-7.732 6.268-14 14-14z" clip-rule="evenodd"/>'
    return path;
  }

  // BOTTOM

  function bottom1(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M36.647 44.932C32.621 42.026 30 37.293 30 31.949V18.856c-2.73 4.919-7.976 8.248-14 8.248-1.967 0-3.85-.355-5.591-1.004V40.45c0 7.456 6.044 13.5 13.5 13.5 5.883 0 10.89-3.764 12.738-9.017zM8.409 25.192C3.402 22.49 0 17.194 0 11.104V0h2v11.104c0 7.732 6.268 14 14 14s14-6.268 14-14V0h2V31.949c0 7.732 6.268 14 14 14s14-6.268 14-14V0h2v31.949c0 8.836-7.163 16-16 16-2.76 0-5.356-.699-7.623-1.93-2.237 5.808-7.87 9.93-14.468 9.93-8.56 0-15.5-6.94-15.5-15.5V25.192z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom2(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M43.124 56.742C35.66 55.387 30 48.855 30 41V7.97a16.077 16.077 0 01-6.075 6.151V44.5c0 7.456 6.044 13.5 13.5 13.5 2.037 0 3.968-.45 5.699-1.258zM21.925 15.086A15.956 15.956 0 0116 16.219c-8.837 0-16-7.164-16-16V0h2v.219c0 7.732 6.268 14 14 14s14-6.268 14-14V0h2v41c0 7.732 6.268 14 14 14s14-6.268 14-14V.039h2V41c0 8.633-6.837 15.67-15.393 15.989A15.435 15.435 0 0137.425 60c-8.56 0-15.5-6.94-15.5-15.5V15.086z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom3(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M30.559 54.346c8.836 0 16-7.163 16-16v-9.604C55.137 28.448 62 21.4 62 12.752V0h-2v12.751c0 7.732-6.268 14-14 14s-14-6.268-14-14V0h-2v28.456c0 7.732-6.268 14-14 14s-14-6.268-14-14V0H0v28.456c0 8.758 7.037 15.873 15.766 15.998 2.4 5.805 8.118 9.892 14.793 9.892zM17.904 44.343c2.247 4.733 7.07 8.003 12.655 8.003 7.732 0 14-6.268 14-14v-9.659c-5.413-.483-10.05-3.662-12.559-8.184v7.953c0 8.192-6.157 14.946-14.096 15.887z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom4(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M26.466 50.533A15.938 15.938 0 0116 54.43c-8.837 0-16-7.164-16-16V0h2v38.43c0 7.733 6.268 14 14 14s14-6.267 14-14V0h2v6.95c0 7.731 6.268 14 14 14s14-6.269 14-14V0h2v6.95c0 7.179-4.729 13.254-11.242 15.28v14.616c0 8.837-7.164 16-16 16a15.93 15.93 0 01-8.292-2.313zm1.477-1.454a13.932 13.932 0 006.815 1.767c7.732 0 14-6.268 14-14V22.712c-.896.156-1.818.237-2.758.237-6.024 0-11.27-3.33-14-8.248v23.73a15.94 15.94 0 01-4.057 10.648z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom5(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M36.526 54.346c8.836 0 16-7.163 16-16V14.004c5.528-2.246 9.426-7.67 9.426-14.004h-2c0 7.24-5.869 13.109-13.108 13.109H45.06c-7.24 0-13.109-5.87-13.109-13.109h-2v32.69c0 7.733-6.268 14-14 14s-14-6.267-14-14V0h-2v32.69c0 8.838 7.164 16 16 16 2.56 0 4.98-.6 7.127-1.67 2.848 4.407 7.806 7.326 13.447 7.326zm-11.714-8.33a13.987 13.987 0 0011.714 6.33c7.732 0 14-6.268 14-14v-23.69a15.14 15.14 0 01-3.683.453h-1.782c-5.608 0-10.502-3.055-13.109-7.591V32.69c0 5.56-2.836 10.458-7.14 13.325z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom6(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M31 60.194c8.837 0 16-7.164 16-16v-2.116c4.662-2.796 7.782-7.9 7.782-13.731h-.121C59.076 25.499 62 20.537 62 14.89V.001h-2v14.89c0 7.732-6.268 14-14 14s-14-6.268-14-14V0h-2V31.16c0 7.732-6.268 14-14 14s-14-6.268-14-14V0H0v31.16c0 8.592 6.773 15.603 15.271 15.984 1.385 7.427 7.9 13.05 15.729 13.05zM17.303 47.107c1.34 6.334 6.964 11.087 13.697 11.087 7.732 0 14-6.268 14-14v-1.1a15.95 15.95 0 01-6.218 1.253 15.932 15.932 0 01-10.025-3.529 15.98 15.98 0 01-11.454 6.29zm14.68-6.519a14.031 14.031 0 01-2.114-1.444A15.926 15.926 0 0032 31.16v-8.517c2.73 4.92 7.976 8.248 14 8.248a15.94 15.94 0 006.742-1.485c-.54 7.237-6.584 12.94-13.96 12.94-2.47 0-4.787-.638-6.8-1.758z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom7(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M46 52.877c8.837 0 16-7.163 16-16V0h-2v36.877c0 7.732-6.268 14-14 14s-14-6.268-14-14V0h-2v22.216c0 7.732-6.268 14-14 14s-14-6.268-14-14V0H0v22.217c0 8.836 7.163 16 16 16 6.024 0 11.27-3.33 14-8.248v6.908c0 8.837 7.163 16 16 16z" clip-rule="evenodd"/>'
    return path;
  }

  function bottom8(x, y, paddingOffset, chosenColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+chosenColor+'" fill-rule="evenodd" d="M23.422 55.522c8.837 0 16-7.164 16-16v-6.947a15.943 15.943 0 006.583 1.412c8.836 0 16-7.163 16-16V0h-2v17.987c0 7.732-6.268 14-14 14s-14-6.268-14-14V0h-2V22.617c0 7.732-6.268 14-14 14s-14-6.268-14-14V0h-2v22.617c0 5.679 2.958 10.666 7.417 13.506v3.399c0 8.836 7.164 16 16 16zm-14-18.317v2.317c0 7.732 6.268 14 14 14s14-6.268 14-14v-8.029a16.074 16.074 0 01-5.644-6.177c-1.282 7.551-7.856 13.301-15.773 13.301-2.346 0-4.575-.505-6.583-1.412z" clip-rule="evenodd"/>'
    return path;
  }
}