import "./styles.css";
import "leaflet/dist/leaflet.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet";
import "leaflet-toolbar";
import "leaflet-distortableimage";

// THESE TWO IMPORTS SOLVED THE PROBLEM 🎉
import "leaflet-distortableimage/dist/leaflet.distortableimage.css";
import "leaflet-distortableimage/dist/vendor.js";

/*eslint no-undef: "off"*/
const map = L.map("app", {
  center: [50.0, 10.0],
  zoom: 3
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const onFileLoad = (event, callback) => {
  const input = event.target;

  const reader = new FileReader();
  reader.onload = function () {
    const dataURL = reader.result;
    callback(dataURL);
  };
  reader.readAsDataURL(input.files[0]);
};

document
  .getElementById("input-img-upload")
  .addEventListener("change", (event) => {
    onFileLoad(event, (url) => {
      L.distortableImageOverlay(url).addTo(map);
    });
  });
