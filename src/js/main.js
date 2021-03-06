window.addEventListener('load', function() {
  // SERVICE WORKER 
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
  
  // THEME SWITCH 
  const STORAGE_KEY = 'user-color-scheme';
  const COLOR_MODE_KEY = '--color-mode';
  const modeToggleButton = document.querySelector('.js-mode-toggle');
  const modeToggleText = document.querySelector('.js-mode-toggle-text');
  const modeStatusElement = document.querySelector('.js-mode-status');

  /**
   * Pass in a custom prop key and this function will return its
   * computed value. 
   * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/
   */
  const getCSSCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

    // Tidy up the string if there’s something to work with
    if (response.length) {
      response = response.replace(/\'|"/g, '').trim();
    }

    // Return the string response by default
    return response;
  };

  /**
   * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.
   * If it can’t find the setting in either, it tries to load the CSS color mode,
   * controlled by the media query
   */
  const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
    
    if(currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
      setButtonLabelAndStatus(currentSetting);
    }
    else {
      setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
    }
  }

  /**
   * Get’s the current setting > reverses it > stores it
   */
  const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);
    
    switch(currentSetting) {
      case null:
        currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
        break;
      case 'light':
        currentSetting = 'dark';
        break;
      case 'dark':
        currentSetting = 'light';
        break;
    }


    localStorage.setItem(STORAGE_KEY, currentSetting);
    
    return currentSetting;
  }

  /**
   * A shared method for setting the button text label and visually hidden status element 
   */
  const setButtonLabelAndStatus = currentSetting => { 
    modeToggleText.innerText = `${currentSetting === 'dark' ? 'light' : 'dark'} mode`;
    modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
  }

  /**
   * Clicking the button runs the apply setting method which grabs its parameter
   * from the toggle setting method.
   */
  modeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    
    applySetting(toggleSetting());
  });

  applySetting();

  // RETAIN SCROLL HISTORY 
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // add lazyload attribute to single post images
  const singlePostImgs = document.querySelectorAll('.single-post .post img');
  if (singlePostImgs) {
    for (var i = 0; i < singlePostImgs.length; i++) {
      singlePostImgs[i].setAttribute('loading', 'lazy');
    }
  }
});