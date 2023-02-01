
let timezone = document.getElementById("timezone");
let latitude = document.getElementById("lat");
let longitude = document.getElementById("long");
let offsetstd = document.getElementById("std");
let offsetstdSeconds = document.getElementById("std-sec");
let offsetdst = document.getElementById("dst");
let offsetdstSeconds = document.getElementById("dst-sec");
let country = document.getElementById("country");
let postcode = document.getElementById("pst-code");
let city = document.getElementById("city");
document.getElementById("getaddress").style.display='None'
document.getElementById("search").style.display = 'none'
document.getElementById("s2").style.display = 'none'
function getlocation() {
  navigator.geolocation.getCurrentPosition((location) => {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    const url =`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=d00d76ac15b249cdb06d3034579f6924`;
    async function getData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        showdata(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  });
}
function showdata(data) {
  timezone.innerHTML += `${data.results[0].timezone.name}`;
  latitude.innerHTML += `${data.results[0].lat}`;
  longitude.innerHTML += `${data.results[0].lon}`;
  offsetstd.innerHTML += `${data.results[0].timezone.offset_STD}`;
  offsetstdSeconds.innerHTML += `${data.results[0].timezone.offset_STD_seconds}`;
  offsetdst.innerHTML += `${data.results[0].timezone.offset_DST}`;
  offsetdstSeconds.innerHTML += `${data.results[0].timezone.offset_DST_seconds}`;
  country.innerHTML += `${data.results[0].country}`;
  postcode.innerHTML += `${data.results[0].postcode}`;
  city.innerHTML += `${data.results[0].city}`;
}
getlocation();

async function getAddress() {
    let address = document.getElementById("address");
    if(address.value==""){
      document.getElementById("getaddress").style.display = 'none'
    }
    const url = `https://api.geoapify.com/v1/geocode/search?text=${address.value}&apiKey=d00d76ac15b249cdb06d3034579f6924`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
    if (result.features.length === 0) {
      document.getElementById("getaddress").style.display = 'none'
      document.getElementById("search").style.display = 'block'
      document.getElementById("s2").style.display = 'none'
      console.log("The address is not found");
    } else {
      console.log("Matched address:");
      resetDetails()
      document.getElementById("getaddress").style.display = 'block'
      document.getElementById("search").style.display = 'none'
      document.getElementById("s2").style.display = 'block'
      showdata2(result);
    }
    } catch (error) {
    console.log("error", error);
    } }
let timezone1 = document.getElementById("timezone1");
let latitude1 = document.getElementById("lat1");
let longitude1 = document.getElementById("long1");
let offsetstd1 = document.getElementById("std1");
let offsetstdSeconds1 = document.getElementById("std-sec1");
let offsetdst1 = document.getElementById("dst1");
let offsetdstSeconds1 = document.getElementById("dst-sec1");
let country1 = document.getElementById("country1");
let postcode1 = document.getElementById("pst-code1");
let city1 = document.getElementById("city1");

function showdata2(result) {
   timezone1.innerHTML += `${result.features[0].properties.timezone.name}`;
   latitude1.innerHTML += `${result.features[0].properties.lat}`;
   longitude1.innerHTML += `${result.features[0].properties.lon}`;
   offsetstd1.innerHTML += ` ${result.features[0].properties.timezone.offset_STD}`;
   offsetdstSeconds1.innerHTML += `${ result.features[0].properties.timezone.offset_STD_Seconds}`;
   offsetdst1.innerHTML += `${result.features[0].properties.timezone.offset_DST}`;
  offsetdstSeconds1.innerHTML += `${result.features[0].properties.timezone.offset_DST_seconds}`;
   country1.innerHTML += `${result.features[0].properties.country}`;
   postcode1.innerHTML += `${result.features[1].properties.postCode}`;
   city1.innerHTML += `${ result.features[1].properties.city}`;
}
function resetDetails() {
  timezone1.innerHTML = "";
  latitude1.innerHTML = "";
  longitude1.innerHTML = "";
  offsetstd1.innerHTML = "";
  offsetstdSeconds1.innerHTML = "";
  offsetdst1.innerHTML = "";
  offsetdstSeconds1.innerHTML = "";
  country1.innerHTML = "";
  postcode1.innerHTML = "";
  city1.innerHTML = "";
  document.getElementById("getaddress").style.display = 'none';
}
