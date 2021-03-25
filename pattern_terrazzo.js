function patternTerrazzo() {

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
      svg.setAttribute('width', artworkWidth);
      svg.setAttribute('height', artworkHeight);
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

    // Initialization complete, now build actual artwork
    buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density);
  }

  // Build each grid item (artwork)
  function buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density) {

    // Create Mask
    document.getElementById('svg').innerHTML += mask(columnCount, rowCount, paddingOffset)

    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {

        // Randomly select artwork type
        var shapeSelection = getRandomInt(0, 7);

        // IF 0 draw a chipSet1
        if (shapeSelection === 0) {
          document.getElementById('svg').innerHTML += chipSet0(x, y, chosenPalette, paddingOffset);
        }

        // IF 1 draw a chipSet1
        else if (shapeSelection === 1) {
          document.getElementById('svg').innerHTML += chipSet1(x, y, chosenPalette, paddingOffset);
        }

        // IF 2 draw a chipSet2
        else if (shapeSelection === 2) {
          document.getElementById('svg').innerHTML += chipSet2(x, y, chosenPalette, paddingOffset);
        }

        // IF 3 draw a chipSet3
        else if (shapeSelection === 3) {
          document.getElementById('svg').innerHTML += chipSet3(x, y, chosenPalette, paddingOffset);
        }

        // IF 4 draw a chipSet4
        else if (shapeSelection === 4) {
          document.getElementById('svg').innerHTML += chipSet4(x, y, chosenPalette, paddingOffset);
        }

        // IF 5 draw a chipSet5
        else if (shapeSelection === 5) {
          document.getElementById('svg').innerHTML += chipSet5(x, y, chosenPalette, paddingOffset);
        }

        // IF 6 draw a chipSet6
        else if (shapeSelection === 6) {
          document.getElementById('svg').innerHTML += chipSet6(x, y, chosenPalette, paddingOffset);
        }

        // IF 7 draw a chipSet7
        else if (shapeSelection === 7) {
          document.getElementById('svg').innerHTML += chipSet7(x, y, chosenPalette, paddingOffset);
        }

      }
    }

    // Remove terrazzo chips based on density
    var numOfPaths = document.getElementById('svg').querySelectorAll('path').length;
    var numOfPathsToRemove = Math.round(numOfPaths - (numOfPaths * density));
    if (density === 0) {
      Array.prototype.forEach.call( document.getElementById('svg').querySelectorAll('path'), function( node ) {
        node.parentNode.removeChild( node );
      });
    }
    else {
      for (let i = 0; i < numOfPathsToRemove; i++) {
        var randomPath = getRandomInt(1, numOfPaths - 1)
        document.getElementById('svg').querySelectorAll('path')[randomPath].remove();
        var numOfPaths = numOfPaths - 1;
      }
    }
  }

  function mask(columnCount, rowCount, paddingOffset) {
    const transform = 'translate('+paddingOffset+', '+paddingOffset+')'
    const path = '<rect transform="'+transform+'" width="'+(columnCount*60)+'" height="'+(rowCount*60)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  function chipSet0(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M19.9745 58.9649L18.295 59.8284L14.3601 56.1335L16.9994 54.4541L18.9668 55.6537L18.295 57.5252L19.9745 58.9649Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M1.49976 37.2151L1.11597 34.384L3.08338 35.6796L1.49976 37.2151Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M32.8303 50.5569L29.9946 55.0942L35.9278 59.2388L40.2033 59.7187L42.4283 59.2388L32.8303 50.5569Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M54.4675 54.1372L53.1653 56.6851L54.7506 59.1763H56.6756V56.6851L54.4675 54.1372Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M54.1277 48.0225L53.335 49.155L51.2402 48.0225L52.0894 46.2674L54.6373 45.5312L56.6755 47.3431L54.1277 48.0225Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M28.2896 11.1352L24.7576 9.92113L20.3428 11.1352L19.4231 9.40596L21.1155 8.4494L20.122 6.60985L20.3428 3.1147L28.584 1.01758L28.2896 3.7402L30.0188 6.20513L28.2896 11.1352Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M48.7085 40.5312L47.5681 41.3774L48.7085 44.3206L49.7387 43.6216L48.7085 40.5312Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M38.8408 50.2307V47.9094H41.4452L44.2195 47.1167L46.8239 47.9094V49.0417L42.4077 49.4947L41.1055 50.2307H38.8408Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M54.1277 36.1328L53.1653 37.4351L53.8446 39.0769L57.0718 39.8129L54.1277 36.1328Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M49.202 55.6661L48.1263 57.025L43.3136 57.308L41.3886 59.1764L39.9731 58.3271L39.5769 57.025L43.3136 52.6653L45.5784 52.2124L49.202 55.6661Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M34.1393 5.61643L32.3732 7.05125L31.895 4.29199L34.1393 5.61643Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M53.3442 1.01758L50.585 3.55615L55.6621 3.15149L53.3442 1.01758Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M58.7224 24.835C58.2783 23.5026 57.3605 20.7885 57.2419 20.5911L59.5615 19.8015L58.7224 24.835Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M45.3981 40.1333L41.6476 39.7385L39.3281 44.328L43.5722 43.8346L45.3981 40.1333Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M46.3359 23.1079L45.0527 24.0454L52.998 35.1984L57.6862 33.9153V32.5829L55.6629 27.4012L53.7876 26.2662L51.9617 26.5623L46.3359 23.1079Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M47.5203 14.6692V22.1208L55.1694 18.5184L50.0371 14.0769L47.5203 14.6692Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M37.5024 13.4353L38.7854 12.0537L40.9074 15.0639L39.8711 16.9885L37.5024 13.4353Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M40.4138 18.6665L34.5908 25.2793H36.2686L35.331 27.0064H42.4866L40.4138 18.6665Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M37.6504 36.8762L34.0479 33.5205L37.2062 28.6843H39.6737L42.9307 32.7803V36.3334L39.6737 33.1257L37.6504 36.8762Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M28.9155 32.9778L24.8689 32.3855L23.043 34.5569L30.6921 36.3828L28.9155 32.9778Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M27.7806 43.9826C25.2802 47.141 20.2202 53.5168 19.9834 53.7536L16.3808 51.6811L14.9003 52.6681L12.729 51.2863L19.9834 42.6995L27.7806 43.9826Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M16.7325 16.4102L11.8382 15.6851L10.3879 10.2921L12.3819 9.02319L13.0617 4.35541L17.5482 3.26782L16.7325 16.4102Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M7.49648 16.28L8.92592 15.4099L10.7904 17.3987L10.4175 20.1953L7.49648 18.9523L6.06714 16.28H7.49648Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M16.0729 42.3815L12.2819 47.7885L9.1123 40.9523L11.0389 37.9071L16.0729 34.6133V42.3815Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M13.8978 23.1161V28.0878L11.2254 27.5908L7.74536 23.8619L9.98257 19.1387L13.8978 23.1161Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M1.54251 7.49283L0.843446 6.16846L0.438721 10.5465L2.64618 8.96447L1.54251 7.49283Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M37.4873 5.39572L36.678 1.9006L39.658 0.171387L40.6881 4.07123L43.2635 6.53623L42.0126 9.73705L37.4873 5.39572Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M5.44189 25.6301L0.741943 30.575L6.22532 32.6311L8.33052 34.7853V29.1551L5.44189 25.6301Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet1(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M31.9753 40.7906L28.7917 40.056L32.3836 35.9741L33.5264 37.8518L31.9753 40.7906Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M42.9961 42.5048L39.5674 41.362L42.2613 39.5659L44.8736 41.362L42.9961 42.5048Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M35.6489 21.28L34.8325 25.1167L31.8938 23.4841V22.5045L33.7713 19.5657L35.6489 21.28Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M22.0162 11.6471L19.8121 14.0145L17.1997 12.2186V9.60629L19.8121 7.97339L21.4447 8.54494L22.0162 11.6471Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M14.9137 16.5452L13.4442 17.2799L12.4647 15.484L10.832 13.688L12.4647 12.9534L14.9137 16.5452Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M14.9956 40.6273L13.4443 32.9537V30.6679L14.4241 29.5251L16.7914 30.015L17.2812 32.1374L16.7914 40.6273L16.0567 41.9335L14.9956 40.6273Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M45.5266 23.3208L42.8328 37.6067L46.4246 36.9537H51.8941L55.1595 33.9333L58.833 31.1577L59.6494 29.2801L58.833 27.8923L46.4246 22.4229L45.5266 23.3208Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M46.9146 44.7904V42.913L56.1391 42.1782C56.0303 43.9198 55.7799 47.5008 55.6493 47.8926C55.5187 48.2845 49.7717 45.9878 46.9146 44.7904Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M32.0571 59.3214L30.9141 53.7702L41.8531 45.5251L43.6491 51.6478L37.1183 57.2805L35.8938 56.7907L34.9142 58.0152L32.0571 59.3214Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M26.3425 59.1583L24.6284 59.648L15.7302 54.5051V53.1989L18.4241 52.6277L26.8324 56.6276L26.3425 59.1583Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M9.1994 46.3416L5.28094 47.5662L2.17896 43.8926L3.81155 38.3416L6.50548 38.7498L8.05653 43.1581L10.5872 44.7907L9.1994 46.3416Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M32.3414 12.3374H26.7061L22.458 5.57508L25.4057 2.71411L32.3414 12.3374Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M35.6357 10.1699L33.2949 7.74243H41.3576L43.9584 11.6437L35.6357 10.1699Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M1.65112 14.8516L0.95752 19.6197L3.12502 20.4867L5.98596 19.0995L6.93961 15.3716L5.98596 12.5974L1.65112 14.8516Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M53.9285 20.3998L51.6743 18.3192L52.9747 16.4119L54.4486 16.8453L55.0554 19.0127L53.9285 20.3998Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M44.3052 6.96206L41.3577 6.26845L44.8254 2.88745L45.6057 4.36125L44.3052 6.96206Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M33.7285 5.22827L33.1216 3.32104L38.3233 4.18796L37.0228 5.92186L33.7285 5.22827Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M18.8169 3.8411L15.9558 4.53471L17.0829 1.5871L20.9842 0.806885L18.8169 3.8411Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M56.616 56.8121L55.1421 59.4996L51.9344 60.193L46.906 54.7312V53.3441L48.0331 51.0901L56.616 56.8121Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M57.5696 52.1305V53.3444H56.3559L54.4487 52.1305V50.8301H55.4023L57.5696 52.1305Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M2.9516 5.315L1.99799 6.61553L0.350586 5.315L0.957577 4.10132L2.9516 5.315Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M19.9946 39.8228L19.3962 30.9824L24.7138 32.3119L26.7743 42.5481L19.9946 39.8228Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M27.7715 30.8497L24.7803 28.0579L33.5542 25.665L34.1524 30.1185L27.7715 30.8497Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M22.9193 24.8008L18.8646 28.2574L14.943 25.7979L16.6711 22.8733L14.5442 21.0122L14.943 19.4834L22.0551 21.0122L22.9193 24.8008Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M41.6634 22.2752L39.7359 23.6046V20.6798L38.7388 19.1511H41.6634V22.2752Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet2(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M4.63293 18.5894L5.7694 12.8035L3.59961 9.49712L4.63293 6.81079L11.9686 8.98048L13.5184 11.8735L11.9686 12.8035V16.7296C11.9686 17.3082 9.14448 20.4147 7.73244 21.8956L4.63293 18.5894Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M17.2156 16.0037L15.72 17.3198L18.5319 19.2941L20.0276 18.9352L21.0447 16.5421L17.2156 16.0037Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M24.2754 17.7384L23.1985 19.8922L21.583 19.2941L22.8993 16.7812L24.2754 17.7384Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M33.7282 16.3026L32.1127 16.7213L29.5999 15.1062V12.3541L30.4974 10.4396L36.8391 9.90112L38.1553 11.1574V12.9523L36.8391 14.0292H35.4032L33.7282 16.3026Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M35.942 17.1404L31.5745 21.0889H26.2498L26.6685 18.8753L30.7967 14.8669L35.942 17.1404Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M16.3184 31.798L16.0191 34.3107L12.0107 29.7637L13.4466 27.7896L16.3184 31.798Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M23.4976 30.0633L22.5403 30.781L19.549 29.7042L18.7114 27.5504L20.0874 25.9351L23.4976 30.0633Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M32.3521 28.4476L29.8394 24.0802L36.7195 20.1316L39.6511 31.439L36.7195 32.7553L32.3521 28.4476Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M43.3604 21.0888C42.9017 19.1144 41.9844 15.1061 41.9844 14.8668L42.5827 12.6532L48.2065 7.74731H51.0184L51.9158 10.6191L51.0184 14.448L45.0954 21.6871L43.3604 21.0888Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M49.2834 20.012L48.2065 21.4481L45.4543 20.012L46.4116 18.1575L49.2834 20.012Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M46.3518 7.98648L45.4543 9.24307L44.3774 6.96961L45.0954 5.71313L47.9073 7.98648H46.3518Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M45.3945 24.2598L44.3176 26.1145L45.8732 26.9521V28.4478L48.5654 27.2512L45.3945 24.2598Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M30.0786 29.9433L28.1641 29.6442L30.0786 26.7128L31.3949 26.0547L32.4718 27.7298L30.0786 29.9433Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M43.4202 27.9692L36.8989 38.4988L44.198 35.2681L43.4202 27.9692Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M51.6765 28.5674L49.3433 30.8408L54.0098 31.14L51.6765 28.5674Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M25.8308 41.6099L24.2156 37.063L34.8051 41.1313L37.617 43.7039L36.6597 45.8577L25.8308 41.6099Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M17.0959 39.5159L15.72 37.1229L17.0959 36.704V34.6101H19.3695V37.9605L17.0959 39.5159Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M26.5488 51.1224L25.5916 49.0284L26.5488 48.4303V46.6953L28.5231 46.396L29.0616 49.6267L26.5488 51.1224Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M18.6516 53.2763L17.9336 57.165L13.0876 53.6353L12.5491 51.9601L13.9252 50.5241L16.9764 48.9685L20.8054 49.4473L21.5233 50.5241L18.6516 53.2763Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M28.4037 52.379V53.2764L25.8311 53.6353L26.8481 51.9003L29.6001 51.0029L28.4037 52.379Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M42.0441 58.2419L40.2492 59.8574L37.8563 58.2419L36.4204 57.3446L32.5913 53.8745L38.3947 51.3619L41.0869 49.3875L43.8988 48.9688V51.3619L44.7962 53.8745L42.0441 58.2419Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M11.532 59.0539H9.13892L9.37825 56.7804L12.9081 55.4641L13.5064 56.7804L11.532 59.0539Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M4.35278 54.8318L1.2417 59.0198L3.93393 58.3617L4.35278 59.0198L7.1048 59.4386L4.35278 54.8318Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M3.81725 52.259V53.8745L0.52664 52.7975L0.167725 51.5411L1.24468 51.1223L3.81725 52.259Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M58.1978 16.4224C57.2605 17.6189 55.3499 20.0719 55.2063 20.3113L55.7448 22.2257H58.1978L59.8131 19.2343V16.4224H58.1978Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M52.1551 7.92683L55.0269 8.82429H58.9755L59.6934 6.55081L58.9755 4.09788L55.4456 3.43994H52.6936L51.5569 5.77312L52.1551 7.92683Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M54.249 2.24311L52.5142 1.64496H50.7791L51.5569 0.0893555H54.249L55.2064 1.64496L54.249 2.24311Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M38.5143 3.26033C37.3776 4.05804 35.0563 5.71332 34.8649 5.95271L33.6084 3.26033L34.2067 0.74752L37.0784 0.0297852L39.0527 1.46553L38.5143 3.26033Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M14.9648 21.7921V24.8917L9.79878 23.1354L8.55884 19.9324L9.79878 16.0061H12.795L16.8245 19.9324L14.9648 21.7921Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M26.0199 10.2205L15.5846 10.8403L13.8054 9.42255V7.14909H16.0789L16.6178 5.67426L15.5846 3.29778L17.4444 1.85132L23.8503 3.29778L26.9499 8.15395L26.0199 10.2205Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M15.8994 5.59343L15.3013 6.43108H13.2073L14.7029 3.4397L15.8994 5.59343Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M31.0957 4.21763C32.2125 4.23758 34.6256 4.2655 35.3435 4.21763L34.9247 1.40563L31.0957 0.448486V4.21763Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M29.7197 1.64495L26.9675 5.0551L24.6941 2.06373V0.14917H29.0615L29.7197 1.64495Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M49.3425 44.5783L48.001 41.5465L51.9985 40.7686L53.2326 44.3636L49.3425 44.5783Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M55.0837 37.2541L54.3862 40.0173L57.391 45.6783H58.9202L59.8324 42.8344L58.9202 38.7565L57.6324 35.4834L55.0837 37.2541Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M52.0835 57.7643C52.1951 57.8984 50.9757 59.2908 50.352 59.9703L46.4983 58.6577L49.4306 56.0327C50.2684 56.554 51.9719 57.6301 52.0835 57.7643Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M57.9762 58.2109L55.6861 59.4116L52.8936 56.8425L56.6357 54.6084L57.9762 58.2109Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet3(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M5.42677 21.0948H2.37331L1.30688 19.4468L2.37331 7.42628L8.33502 4.42114L10.1769 2.53082L12.5034 1.60986L13.279 7.62034L11.9218 9.84979V12.9033L9.83759 17.8474V21.0948L8.33502 22.9852L5.42677 21.0948Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M13.3523 22.1165L12.3491 16.8853L13.7107 16.0254L16.7204 16.8853L18.8702 16.0254H23.743L29.2607 28.9957L28.7591 30.5005L30.4073 33.9402L28.4008 35.1584L23.313 29.7123L20.375 28.9957L16.7204 25.6994V24.1945L13.3523 22.1165Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M30.479 19.895L28.8308 17.4585L32.3421 15.9536L33.0587 16.6703L30.479 19.895Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M27.8992 15.2371L27.3977 6.85303L32.8437 8.28617L34.8502 18.6768L27.8992 15.2371Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M34.062 7.56977L32.1987 6.49482L33.5603 3.19849H34.7068L35.8534 3.91516L34.062 7.56977Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M40.4397 19.8952L37.5732 15.4523L38.1465 13.6609L42.446 11.3677L45.0974 12.0126L52.335 22.9765L49.9703 25.1979L46.3873 22.9765L40.4397 19.8952Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M51.0451 16.2403L52.0483 14.3773L48.5371 12.9441L45.0256 15.8105L45.599 17.0287L51.0451 16.2403Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M45.9573 28.2076H41.9443L45.0258 25.1978L47.3189 26.9893L45.9573 28.2076Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M46.459 35.0867L43.0193 30.7156L46.029 29.0674L47.5338 30.7156L48.1071 34.3702L46.459 35.0867Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M30.1924 37.5232L30.6938 35.1584L36.355 39.6729H34.7068L33.7036 40.8195L30.1924 37.5232Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M36.6416 36.8782L38.5764 33.0803L43.9509 36.8782V38.5264L50.4719 45.1907L49.3253 46.8388H47.9638L46.8889 47.4121L45.4557 46.8388L44.3808 47.4121L42.9477 46.8388L39.3647 40.6761L37.0716 38.9563L36.6416 36.8782Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M51.3318 36.5201L49.397 35.0867L49.8269 30.8589H52.8366L51.3318 36.5201Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M27.1111 38.7417L25.1763 39.6731L22.8831 38.0966L24.2446 36.3767L27.1111 36.9501V38.7417Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M58.6411 21.3283L56.9211 21.83V16.5271L59.3576 18.1036L58.6411 21.3283Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M20.5184 34.0119L22.0233 33.2238L17.5086 28.2078L16.1472 31.9339L20.5184 34.0119Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M13.7663 35.6328L10.9223 35.9539L9.68384 33.844L11.3351 33.0183L12.0691 34.1651H13.4452L13.7663 35.6328Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M11.1519 39.9905L8.7207 45.3113L11.5187 46.2288L13.3535 40.4951L11.1519 39.9905Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M16.5186 42.7427L11.4729 48.5681V52.4671L13.8122 52.2377L17.4818 48.2012H20.0505L21.7477 47.1462V45.3114L18.4451 42.3757L16.5186 42.7427Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M11.4729 42.7427L9.40873 40.4033L7.16113 42.3299L9.82158 44.8527L11.4729 42.7427Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M3.89209 43.7219L0.0390625 49.0886L9.30468 54.6847L10.5432 52.8499L8.93773 50.8316L8.43316 49.0886L3.89209 43.7219Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M18.7661 53.0635V51.0911L22.6192 54.3019L21.7018 57.0082L18.7661 53.0635Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M25.1763 58.8996L25.8418 49.3599L26.6183 47.659L28.7629 46.3279L38.0438 43.6655L38.8203 44.3312L25.8418 59.6392L25.1763 58.8996Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M37.5632 52.7615L37.7849 55.7196L33.5697 54.7951L30.1309 50.0992L35.5294 46.6235L39.3749 50.7279L37.5632 52.7615Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M31.3142 59.1953L32.0537 55.2019L36.6387 59.1953H31.3142Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M42.8328 55.5526L40.3555 53.5929L45.2733 51.4485L45.68 52.8535L42.8328 55.5526Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M30.0014 1.7576L28.769 4.83865L26.5095 1.7576L28.4404 0.36084L30.0014 1.7576Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M54.0466 24.0693L51.6213 32.0378L54.267 31.5339L56.4403 25.1717L54.0466 24.0693Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M54.3965 44.9666V41.5105L57.5698 41.7714L59.9607 44.2492L58.3958 46.9226L56.6787 47.1835L54.3965 44.9666Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '<path transform="' + transform + '" d="M47.5217 55.1329L46.6609 51.9635L49.8498 49.0681H55.2494L59.1816 52.7461L58.6339 55.1329L53.4886 54.9959L50.1237 55.7198L47.5217 55.1329Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet4(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M11.0806 20.5102L6.91724 15.5304L9.20305 12.0202H11.7337L14.2644 10.1426L15.0807 7.44873H17.4481L19.8971 10.1426L18.3461 11.3672L18.9175 13.4896V17.2447L11.0806 20.5102Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M20.8767 18.7959C20.6046 17.2176 20.0604 13.9794 20.0603 13.6528L29.4483 20.6734L30.8361 23.1225H29.4483L28.5503 25L20.0603 20.6734L20.8767 18.7959Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M40.1423 28.0204L33.8564 29.3266L33.1218 27.6123V20.2653L35.5709 17.8977H37.1219L40.7954 25.9796L40.1423 28.0204Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M42.918 24.5918L45.2036 22.4695L46.3466 25.0817L47.6527 25.5715L46.3466 26.9593L44.2241 27.4491L42.918 24.5918Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M45.2854 21.2449V17.5713L48.3874 18.0611L50.9181 20.5102L47.5711 23.449L45.2854 21.2449Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M49.7751 12.9997L46.2649 14.5508L50.7548 4.1833L52.061 2.71387L52.5508 4.1833L49.7751 12.9997Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M51.0813 26.3876L55.5713 31.3673L56.959 27.2855L59.8162 23.5304L55.5713 22.8774L51.6528 24.9999L51.0813 26.3876Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M51.3262 36.1023L52.7957 35.041H55.0814L47.8977 29.8164V32.3471L51.3262 36.1023Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M45.122 40.1839L41.0402 45.4901H38.7545L36.1423 39.6939L31.979 38.8776L32.5503 37.3265L38.7545 36.2654L45.122 38.0614V40.1839Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M32.0605 33.2451L34.6729 31.2859L37.2852 33.2451L32.877 34.0614L32.0605 33.2451Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M20.8767 29.0818L26.1013 26.2246L30.1014 33.7349V38.0615L28.7136 38.6329L26.1013 38.0615L20.8767 31.2042V29.0818Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M25.4482 35.939L18.4277 38.2249L23.3258 44.429L23.7339 42.2248L26.0197 43.9392L25.4482 35.939Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M14.3458 39.6125L9.61121 41.1635L6.75391 37.9799L12.3867 33.0818L16.3051 35.6941L14.3458 39.6125Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M7.40698 34.1429L3.97852 35.8573V25.1631L7.40698 22.3059L12.3051 31.6939L11.7337 35.1225L7.40698 34.1429Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M9.69287 53.1638L10.6724 47.2046L14.8358 53.9802L9.69287 53.1638Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M12.1418 48.6737L5.77441 47.0411V44.837L8.63161 43.4492L9.85612 44.837H12.6317L12.1418 48.6737Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M17.448 45.4901L15.897 45.8983L14.7542 43.2043L16.3868 41.8167L18.2644 43.2043L17.448 45.4901Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M20.387 49.2454L21.4482 47.2861L25.285 50.225H22.9992L21.4482 51.6944L20.387 49.2454Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M19.9788 55.4495L23.5706 52.4292L25.0401 55.4495L22.1829 59.7762L19.9788 55.4495Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M32.5464 49.2174L31.7227 48.5482L32.5464 46.489L33.9877 46.9009L32.5464 49.2174Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M52.3252 57.1117L41.7366 59.5002L44.2047 52.5738L53.1214 51.8572L52.3252 57.1117Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M31.0348 50.4949L27.0492 51.9219L25.6716 54.5296L29.4112 56.8422L32.4618 56.3501L35.9553 59.45L39.6457 58.4167L38.9076 54.0867L31.0348 50.4949Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M57.0149 58.0723L51.9468 53.2502L46.6819 56.4978L47.912 59.0072L53.4721 59.2532L57.0149 58.0723Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M14.2156 4.32983L10.2292 6.8811L11.1462 9.15328L12.7009 7.59862L15.2122 6.28313L14.2156 4.32983Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M27.2112 10.2695V7.63844L28.3272 6.60205L29.7623 10.2695L29.284 12.3025L27.2112 10.2695Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M25.2579 1.6191L26.4938 9.23287L13.5779 1.10091L15.5313 0.223877L25.2579 1.6191Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M5.76467 9.47207L6.04373 12.3024L2.05738 11.6248L0.183838 6.08381L3.33303 3.09399L7.87744 7.47893L5.76467 9.47207Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M3.18799 23.8446L0.211914 25.4235L1.5003 18.4915L3.33311 20.0158L3.18799 23.8446Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet5(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M1.31494 15.7547C1.11251 16.7669 0.680719 18.8992 0.572754 19.3311L6.03831 21.6252L10.6941 18.1839L9.74949 15.7547V14.2704L7.59026 12.0437L6.03831 14.2704L1.31494 15.7547Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M12.5835 12.2461L11.4363 10.1543H14.6078L18.2515 11.4363L16.4296 12.8533L12.5835 12.2461Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M20.8154 17.0368L20.0059 14.1352L22.3 11.8411L23.0422 14.1352L24.3243 15.0799L23.0422 16.6319L20.8154 17.0368Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M8.33252 26.4834L7.25293 24.6616L8.8723 23.447L9.61453 24.6616H11.1665V26.0786L8.33252 26.4834Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M18.1841 34.513L12.7859 27.4954L24.3918 23.2444L29.385 25.4036L21.6253 31.6114L20.6806 33.8381L18.1841 34.513Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M37.6169 24.054L30.8694 17.6438L39.5739 13.5278L41.7331 20.073L37.6169 24.054Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M24.5942 11.5711L23.7844 12.9881L21.0178 12.0433L22.0975 9.81665L24.5942 11.5711Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M23.3796 4.95834L23.0422 4.35116L24.999 2.8667L25.8762 4.35116L23.3796 4.95834Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M16.8344 48.1432L2.52951 40.9906L1.65234 39.7087L3.27177 39.1688L6.57809 31.814L17.7116 35.5251L18.3189 39.1688L16.8344 41.2606L18.3189 43.5547L16.8344 44.6344V48.1432Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M21.8953 49.9648L22.7725 47.9404L27.0233 50.3697L24.3918 51.1119L23.4471 52.6639L21.8953 49.9648Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M22.5698 42.205L20.6807 43.2846L20.2083 41.6653L22.5698 37.5491L23.6495 38.4263L22.5698 42.205Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M31.4092 42.2726L25.5388 37.0096L27.4282 35.5925L29.3175 37.0096L30.667 36.3348L34.5132 37.6843L35.5928 39.8436L31.4092 42.2726Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M36.8748 37.6841L35.7278 38.4939L36.2001 42.6774L39.3714 44.7017L40.8559 41.6653L36.8748 37.6841Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M36.2676 35.3224L34.0408 33.433L34.8505 29.6546L36.8748 28.6423L36.2676 35.3224Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M34.1758 27.7653L33.366 28.9799L30.802 27.7653L31.8816 26.5508L34.1758 27.7653Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M42.2729 25.2686L40.2485 24.7964L43.6899 21.49H46.0515L42.2729 25.2686Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M54.7558 36.4021L55.2282 43.0148L45.7815 41.058L50.235 32.1511L54.7558 36.4021Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M51.7195 45.9836L53.0015 44.2969L54.0812 45.309L53.7438 45.9836L54.0812 48.5478L53.0015 49.9648L51.7195 45.9836Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M55.5657 29.7896L53.2041 30.8692L52.1919 26.0784L54.3511 26.9556L55.5657 29.7896Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M43.4875 57.0499L40.0461 57.5223L39.1689 55.9027L43.4875 54.3508L45.1068 55.0931L43.4875 57.0499Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M42.2054 53.6084L33.5011 56.9824L33.0287 55.4304L33.5011 52.5964L31.9492 50.3697L30.5996 49.425L29.79 48.2104L31.9492 47.5356L42.2054 53.6084Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M25.6738 56.0376L27.2258 54.2832L27.6981 60.0187L25.6738 58.3993V56.0376Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M17.7117 55.5654L20.6807 54.3508L13.1233 52.124L17.7117 55.5654Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M21.0855 56.2493L18.9264 54.9673L16.3623 59.6906L18.9264 59.2858L21.0855 56.2493Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M13.1907 50.8569L10.1544 49.5747L7.25293 50.2496V53.9607L9.41216 55.0404L11.9088 59.4938L17.8467 59.0889L16.2947 56.6598L15.485 53.9607L13.1907 50.8569Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M46.7937 52.9021L50.3701 49.7307L55.2283 54.8589L52.1244 57.2206L53.4739 60.0546L48.6831 58.3002L46.7937 52.9021Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M56.9292 34.5248L55.9006 32.3205L56.9292 31.6593V29.9693L59.0601 29.5283L59.4275 32.9083L56.9292 34.5248Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M49.5815 8.29309L48.9202 7.33801L53.3288 5.94189L55.1658 7.33801L49.5815 8.29309Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M48.8467 6.16214L42.2337 11.4527L34.3716 7.9994L35.9881 6.82375L35.1797 6.16214L37.7517 0.945312L41.7929 2.19465L48.3324 0.945312L48.8467 6.16214Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M54.3574 14.8328L57.7375 10.4976L59.4275 11.6733L58.9131 17.4046L56.6353 17.8454L54.3574 14.8328Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M59.4274 24.385V19.9763L56.8557 22.2541V23.5767L59.4274 24.385Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet6(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M19.8789 36.6683H16.5979L17.6915 42.8096L22.9074 47.9413L26.6089 49.035L33.0026 55.1762L35.3581 53.9143L27.955 35.9112L24.5899 35.4905L21.7296 37.6778L19.8789 36.6683Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M34.8533 40.0334L33.4231 37.8461L36.4517 35.6587L37.3771 36.6683L34.8533 40.0334Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M36.4517 27.4146L31.7407 26.6572V35.6588L39.5644 38.7715L36.4517 27.4146Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M39.9009 23.9653L38.3868 23.208L36.3677 26.3208L38.3868 27.2462L39.9009 23.9653Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M36.5359 17.3193L35.2739 20.0954L32.8342 17.3193L34.7692 15.8049L36.5359 17.3193Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M45.3692 19.4224L45.8741 22.7034L37.0408 20.1795L38.3026 16.9827L42.3407 15.1321L52.52 16.1415L45.3692 19.4224Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M47.3883 10.0003L44.2757 12.6082L43.4343 9.07483L44.2757 7.81299L47.3883 10.0003Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M24.4216 6.46682L23.4963 8.48587L19.0374 6.46682L17.1868 1.58765H19.0374L21.4771 4.70028H24.4216L26.1041 7.05582L24.4216 6.46682Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M41.4153 35.3223L47.8931 31.2842L51.0056 32.8827L56.8104 42.9779L55.2961 44.3239L49.912 42.9779L41.4153 35.3223Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M55.4644 36.3319L56.5581 34.1446L52.5199 33.2192L48.8184 35.6589L50.2485 36.9208L55.4644 36.3319Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M50.0804 27.7509L51.1739 22.9557L49.0708 20.2637L56.1374 17.0667L59.3342 18.7493V25.6477L56.1374 28.3397L54.539 26.9937L50.0804 27.7509Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M40.7422 8.40175L36.2834 11.0097V0.325439L40.2374 1.41921L40.7422 8.40175Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M57.0628 51.1382H54.2867L53.6978 55.008L55.5485 56.6064L57.0628 51.1382Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M59.4183 50.1287L56.8104 52.6524L55.9692 48.2778L59.4183 44.4922V50.1287Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M52.6039 54.3349L51.0055 55.092L47.4722 50.7176L50.0802 49.1191L51.7627 50.7176V53.2413L52.6039 54.3349Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M49.9121 48.0254H46.2104L49.3231 45.1653L51.5945 47.1842L49.9121 48.0254Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M27.282 58.2047L29.385 59.8871L31.6565 59.046V57.027L28.4597 56.2698L27.282 58.2047Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M26.1042 53.2412L24.8423 54.0825L20.3835 52.3159L21.3931 47.8572L26.1042 53.2412Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M18.112 56.1015H15.5041L13.9058 54.1666L15.5041 52.8206L16.3454 54.1666H18.112V56.1015Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M0.705566 49.3928L2.90796 55.5713L8.84159 53.8585V50.3105H6.76172L6.27234 49.3928H0.705566Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M34.8086 57.1318L35.6035 55.3828L40.1351 59.3977L37.8295 59.0399L37.3128 59.8349L34.8086 57.1318Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M56.782 7.36292L54.22 6.38172V3.11106L56.4549 1.20312L58.2537 1.74825L58.7989 4.96433L56.782 7.36292Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M52.0939 6.27263L54.6015 5.56389L55.4191 4.58287L54.2199 0.112793H48.6597L49.2048 3.27452L52.0939 6.27263Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M5.81519 41.1083L6.37866 27.3939L13.4238 23.9184V22.9791L17.1812 21.3821L18.0266 27.9575L16.1479 29.9301V33.03L12.5784 43.1749L9.38461 41.1083H5.81519Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M6.02197 24.4202L2.37891 21.2629L9.66522 15.0938H12.9684L6.02197 24.4202Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M5.09915 28.4522L2.62186 29.8123L3.15608 27.9663L2.33032 25.6832L4.71053 25.2947L5.09915 28.4522Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M3.25317 13.1507L0.581543 11.2078L7.52789 0.8125L13.8913 5.33008L3.25317 13.1507Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M40.7866 57.7114L43.304 53.1184L47.941 55.5032L48.5593 58.6829H43.304L40.7866 57.7114Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet7(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M38.925 20.7248L25.4395 13.9253L29.6325 4.51953L40.8515 8.48583L40.0582 13.9253L41.5314 15.8518L38.925 17.665V20.7248Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M45.8376 20.6113L44.8179 22.8779L46.7443 25.1443L47.4242 23.8978L49.5773 22.8779L45.8376 20.6113Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M45.3843 15.0587L43.2312 16.0784L45.3843 10.5256L46.5176 11.5456L45.3843 15.0587Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M30.4258 28.0908V26.1643L33.182 22.5889L36.7183 26.1643V28.0908L40.6707 32.5737L34.8453 33.1902L32.3522 28.0908H30.4258Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M40.6872 28.1626L36.6997 25.2451L44.0411 26.9612L40.6872 28.1626Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M41.2878 28.4629L38.0842 32.0671L39.5358 32.3675L43.2902 30.7156L41.2878 28.4629Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M50.1482 28.8135L48.6965 30.165V33.8192L51.3497 34.5201L50.1482 28.8135Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M54.103 33.7693L51.6001 35.6714L52.6512 36.8728L56.3055 36.0218L54.103 33.7693Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M48.0459 41.0277L45.6931 40.3268L48.0459 37.2231L50.6989 37.974L48.0459 41.0277Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M45.5429 48.0859L45.1422 49.4375L41.8385 47.3852L34.9304 39.2757L36.9827 38.725L38.6847 37.073L45.5429 42.3293L44.6417 46.7845L45.5429 48.0859Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M37.6836 46.4842L29.0234 52.8917L27.3215 50.0383L28.0223 48.086L34.9304 44.7822H37.6836V46.4842Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M26.2201 47.2852L22.6159 51.9404L20.6636 51.0395L23.8673 47.7356L26.2201 47.2852Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M18.411 47.2851L17.7103 48.6867L15.9583 45.7833L16.9093 44.1313L20.5135 46.6343L18.411 47.2851Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M13.1047 43.0299L9.05005 49.037V43.2804L10.5017 42.0288L13.1047 43.0299Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M25.5693 36.973L21.2144 32.9183L24.2679 31.0161L26.3203 32.0172L25.8197 34.37L27.4716 35.8718L25.5693 36.973Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M22.0652 34.8203V39.0754L16.4087 37.9741L13.5051 29.0136L18.5612 26.6609L24.1678 32.2674L22.0652 34.8203Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M10.9521 33.0184L7.54834 33.619L8.19901 30.7156L9.85095 29.4641L10.9521 26.4606L19.9128 25.8098L18.411 32.0173L13.7555 32.4177L12.3038 33.619L10.9521 33.0184Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M11.5029 37.5737L11.8032 34.9707L14.8568 38.1744L11.5029 37.5737Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M11.2026 58.4983L10.802 57.397L15.6077 57.7474L14.4564 59.4494L11.2026 58.4983Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M27.8721 54.7939L26.2703 55.7952L26.6707 58.5483L28.3226 59.3993L29.4239 56.7462L27.8721 54.7939Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M40.2866 56.2956L39.3857 54.944L42.239 53.4421L44.6418 54.6937L40.2866 56.2956Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M46.8945 51.3399L45.7432 51.6902L47.1948 47.8857L49.2973 48.7368L46.8945 51.3399Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M58.3078 60L49.7478 59.4995L47.5452 54.5936L46.2437 53.3922L46.6942 51.8404L46.2437 50.3386V49.0872L53.3019 50.3386L58.3078 50.7893L57.4568 52.5413L58.8084 55.4947L58.3078 60Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M56.6061 47.8356L55.4547 49.1371L54.0028 47.8356L52.4512 42.5795L55.4547 41.8286L54.954 43.03L56.6061 47.8356Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M7.94874 56.6459L7.09766 58.8486L2.94283 55.5447L1.79148 54.4435L2.24201 51.8404L0.339844 48.5866L1.29084 45.9333L4.04414 48.1361L7.94874 51.44L7.09766 55.5447L7.94874 56.6459Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M29.6243 44.0313L28.7733 45.9837L27.2715 44.8322L26.4204 41.7786L27.2715 41.228L29.6243 44.0313Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M36.1318 36.6727C36.916 37.3569 38.5246 38.7552 38.6847 38.8754L40.5871 38.0242L37.8338 36.2221L37.1831 33.3188L35.3809 34.6203L36.1318 36.6727Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M59.5093 37.3735L57.4568 38.675V35.321L59.8597 33.2686L59.5093 37.3735Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M59.9097 26.5608L56.5559 29.9146L55.8049 24.1079L53.0017 21.0543L54.8538 20.4036L57.2567 21.4046L59.9097 24.1079V26.5608Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M58.508 12.7443L54.5034 15.2473L48.7966 9.64085L50.3486 8.4895L52.4009 9.64085L53.6023 9.14014L57.2566 10.5919L58.508 12.7443Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M59.9598 1.4812L59.3592 7.28809L57.2065 6.13673L57.7072 2.13203L59.9598 1.4812Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M55.905 2.08194L55.054 3.4335L52.2507 2.83285L53.2019 0.429932L55.905 2.08194Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M49.5135 0.680474L42.8558 7.28814H40.0524L36.9487 3.18339L42.5053 0.280029L49.5135 0.680474Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M19.312 8.23935L18.1607 8.99008L14.4563 5.43591L14.957 3.18335L21.3645 8.23935H19.312Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M11.8031 13.0949L7.74844 18.301L5.99642 18.8517L4.34448 16.0484L2.04178 12.5443L1.34082 10.4919L3.54333 9.19019L7.44803 9.49059L8.89973 10.4919L11.3526 11.2927L10.852 12.1938L11.8031 13.0949Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M1.37256 4.13647L0.402832 6.11304L3.6849 6.61661L1.37256 4.13647Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M11.4467 5.64731L6.29534 6.73715L5.86597 0.628009L10.4229 0.429932L12.4042 3.53399L11.4467 5.64731Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                '<path transform="' + transform + '" d="M5.77684 37.4373L2.57445 39.0526L0.179534 35.6551L0.0402832 27.9971L2.825 25.7693L5.77684 27.3567V37.4373Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }
}