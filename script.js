let lang = 'en'; 

function toggleLanguage() {
    lang = lang === 'en' ? 'ru' : 'en'; 
    updateLanguage(); 
}

function updateLanguage() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
    const findMeButton = document.querySelector("#find-me");
    const changeLangButton = document.querySelector("#change-lang");
    const title = document.querySelector("#title");

    if (lang === 'en') {
        title.textContent = "Find My Location";
        status.textContent = "Locating…";
        findMeButton.textContent = "Show my location";
        changeLangButton.textContent = "EN/RU";
    } else {
        title.textContent = "Найти мое местоположение";
        status.textContent = "Определение местоположения…";
        findMeButton.textContent = "Показать мое местоположение";
        changeLangButton.textContent = "EN/RU";
    }
}

function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");

    mapLink.href = "";
    mapLink.textContent = "";

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      const latLabel = lang === 'en' ? 'Latitude' : 'Широта';
      const lonLabel = lang === 'en' ? 'Longitude' : 'Долгота';
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `${latLabel}: ${latitude}°, ${lonLabel}: ${longitude}°`;
    }
  

    function error() {
        if (lang === 'en') {
            status.textContent = "Unable to retrieve your location";
        } else {
            status.textContent = "Невозможно получить ваше местоположение";
        }
    }

    if (!navigator.geolocation) {
        if (lang === 'en') {
            status.textContent = "Geolocation is not supported by your browser";
        } else {
            status.textContent = "Geolocation не поддерживается вашим браузером";
        }
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
document.querySelector("#change-lang").addEventListener("click", toggleLanguage);
updateLanguage(); 
