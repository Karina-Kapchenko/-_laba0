var weaterData;

const COORDS = {
  lat: 49.243518,
  lng: 28.479415
}

async function initMap() {

  let map = new google.maps.Map(document.getElementById('map'), {
    center: COORDS,
    zoom: 8
  });

  await getWeather();

  let marker = new google.maps.Marker({
    position: COORDS,
    map: map,
    title: "Home",
    label: {
      text: weaterData.weather[0].main,
      color: "blue",
    },
    title: weaterData.weather[0].description,
    icon: {
      url:`http://openweathermap.org/img/w/${weaterData.weather[0].icon}.png`,
      labelOrigin: new google.maps.Point(30, 40),
    },
  })
  console.log(weaterData);
  let temp = document.getElementById('temp')
  temp.textContent = `${(weaterData.main.temp-272).toFixed(2).toString()}°`
  let wet = document.getElementById('wet')
  wet.textContent = `${(weaterData.main.humidity)}`
  let image = document.getElementById('image')
  image.src = `http://openweathermap.org/img/w/${weaterData.weather[0].icon}.png`
}

async function getWeather() {
  await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${COORDS.lat}&lon=${COORDS.lng}&appid=1b5ee5a1a74d624a74750350327ea372`).then(async weaterResponse => {
    return weaterResponse.json()
  }).then(async weaterJson => {
    weaterData = weaterJson;
    console.log(weaterData)
  }) 
}
