<template>
  <div id="map" class="h-50 w-auto" style="max-height: 35em;">
  </div>
</template>

<script lang="ts" setup>
import L from 'leaflet';
import "leaflet.markercluster";
import { onMounted, watch } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const MEDIUM_ZOOM = 14; 

// This function returns the icon for a point, based on its translated field.
function getIcon(point: any): L.Icon {
  if (point.Field === appStore.translations[appStore.translations.lang].field.options[0]) {
    return L.icon({
      iconUrl: './img/icons8-pharmacy-64.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[1]) {
    return L.icon({
      iconUrl: './img/icons8-library-64.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[2]) {
    return L.icon({
      iconUrl: './img/icons8-labor-64.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[3]) {
    return L.icon({
      iconUrl: './img/icons8-environment-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[4]) {
    return L.icon({
      iconUrl: './img/icons8-gym-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[5]) {
    return L.icon({
      iconUrl: './img/icons8-youth-40.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[6]) {
    return L.icon({
      iconUrl: './img/icons8-recycle-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[7]) {
    return L.icon({
      iconUrl: './img/icons8-prayer-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[8]) {
    return L.icon({
      iconUrl: './img/icons8-social-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[9]) {
    return L.icon({
      iconUrl: './img/icons8-political-64.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[10]) {
    return L.icon({
      iconUrl: './img/icons8-family-40.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[11]) {
    return L.icon({
      iconUrl: './img/icons8-art-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[12]) {
    return L.icon({
      iconUrl: './img/icons8-other-48.png',
      iconSize: [41, 41],
      iconAnchor: [30, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });
  } else {
    return L.icon({
      iconUrl: './css/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [25, 41],
      shadowUrl: './css/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [25, 41]
    });
  }
}

onMounted(() => {
  /* #region Map initialization. */
  var map = L
    .map('map')
    .setView([45.916908312944116, 25.015869140625004], 6)
    .setMaxBounds([
      [42.15731506855392, 19.819335937500004],
      [49.34840531310837, 30.432128906250004]
    ]);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 6,
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  /* #endregion */

  /* #region Map events. */
  map.on('zoomend', function () {
    // console.log(map.getZoom());
    const bounds = map.getBounds();
    appStore.map.bounds = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
    ];

    if (map.getZoom() >= MEDIUM_ZOOM) {
      mapMarkers.markers?.forEach((marker: L.Marker) => {
        marker.openTooltip();
      });
    } else {
      mapMarkers.markers?.forEach((marker: L.Marker) => {
        marker.closeTooltip();
      });
    }
  });

  map.on('moveend', function () {
    const bounds = map.getBounds();
    //console.log(bounds);
    appStore.map.bounds = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]         
    ];
  });

  map.on('click', function () {
    if (map.getZoom() >= MEDIUM_ZOOM) {
      mapMarkers.markers?.forEach((marker: L.Marker) => {
        marker.openTooltip();
      });
    } else {
      mapMarkers.markers?.forEach((marker: L.Marker) => {
        marker.closeTooltip();
      });
    }
  });
  /* #endregion */

  /* #region Update map markers. */
  const mapMarkers: {
    map: L.Map,
    markers?: L.Marker[],
    layer?: any
  } = {
    map: map
  };

  const updateMarkers = (points: any[]) => {
    if (mapMarkers.layer) {
      map.removeLayer(mapMarkers.layer);
    }

    mapMarkers.markers = points
      .map((point: any) => {
        const lat = point.Latitude;
        const lng = point.Longitude;

        const result = L
          .marker([lat, lng], {
            icon: getIcon(point),
          })
          .bindTooltip(point.Org, { direction: 'bottom', offset: [-12, 0] })
          .on('click', function () {
            map.setView([lat, lng]);
            appStore.mapToList.point = point;
          })
          .on('mouseout', function (this: L.Marker) {
            if (map.getZoom() >= MEDIUM_ZOOM) {
              this.openTooltip();
            } else {
              this.closeTooltip();
            }
          })
        result.closeTooltip();
        (<any>result).ID = point.ID;
        return result;
      });

    mapMarkers.layer = window.L.markerClusterGroup({
      maxClusterRadius: 30
    });
    mapMarkers.layer.addLayers(mapMarkers.markers);
    map.addLayer(mapMarkers.layer);
  };

  watch(appStore.list, (mutation, _state) => {
    updateMarkers(mutation.filter);
  });
  /* #endregion */

  /* #region Select map markers. */
  const selectMarker = (pointID: number) => {
    if (!mapMarkers.markers) { return; }

    const marker = mapMarkers.markers
      .find((marker: any) => marker.ID === pointID);

    if (!marker) { return; }

    // TODO: Change the marker?
    marker.openTooltip();
    map.setView(marker.getLatLng(), Math.max(map.getZoom(), MEDIUM_ZOOM));
  };

  watch(appStore.listToMap, (mutation, _state) => {
    selectMarker(mutation.point);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
  /* #endregion */  
});
</script>
