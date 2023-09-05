<template>
  <div id="map" class="h-50 w-auto" style="max-height: 35em;">
  </div>
</template>

<script lang="ts" setup>
import L from 'leaflet';
import "leaflet.markercluster";
import { computed, onMounted, ref, watch } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const MEDIUM_ZOOM = 14; 

function getIconName(point: any): string {
  if (point.Field === appStore.translations[appStore.translations.lang].field.options[0]) {
    return 'health';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[1]) {
    return 'education';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[2]) {
    return 'employment';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[3]) {
    return 'environment';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[4]) {
    return 'sports';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[5]) {
    return 'youth';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[6]) {
    return 'sustainability';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[7]) {
    return 'religion';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[8]) {
    return 'social';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[9]) {
    return 'political';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[10]) {
    return 'family';
  } else if (point.Field === appStore.translations[appStore.translations.lang].field.options[11]) {
    return 'art';
  } else {
    return 'other';
  }
}

function getIconColor(point: any): string {
  if (point.Category === appStore.translations[appStore.translations.lang].category.options[0]) {
    return 'red';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[1]) {
    return 'green';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[2]) {
    return 'black';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[3]) {
    return 'blue';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[4]) {
    return 'purple';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[5]) {
    return 'orange';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[6]) {
    return 'pink';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[7]) {
    return 'lime';
  } else if (point.Category === appStore.translations[appStore.translations.lang].category.options[8]) {
    return 'dgray';
  } else {
    return 'gray';
  }
}

// This function returns the icon for a point, based on its translated field.
function getIcon(point: any): L.Icon {
  const iconName = getIconName(point);
  const iconColor = getIconColor(point);

  return L.icon({
    iconUrl: `./img/${iconName}/${iconColor}.png`,
    iconSize: [41, 41],
    iconAnchor: [30, 41],
    shadowUrl: './css/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [15, 41]
  });
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
  let currentIsMediumZoom = ref(map.getZoom() > MEDIUM_ZOOM);
  map.on('zoomend', function () {
    // console.log(map.getZoom());
    const bounds = map.getBounds();
    appStore.map.bounds = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
    ];

    currentIsMediumZoom.value = map.getZoom() > MEDIUM_ZOOM;
  });
  watch(currentIsMediumZoom, (mutation, _state) => {
    updateMarkers(appStore.list.filter, mutation);
  });

  map.on('moveend', function () {
    const bounds = map.getBounds();
    //console.log(bounds);
    appStore.map.bounds = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]         
    ];
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

  const updateMarkers = (points: any[], isPermanentTooltip = false) => {
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
          .bindTooltip(point.Org, { permanent: isPermanentTooltip, direction: 'bottom', offset: [-12, -12] })
          .on('click', function () {
            map.setView([lat, lng]);
            appStore.mapToList.point = point;
          });

        (<any>result).ID = point.ID;
        return result;
      });

    mapMarkers.layer = window.L.markerClusterGroup({
      spiderfyDistanceMultiplier: 2,
      maxClusterRadius: (zoomLevel: number) => {
        return (zoomLevel < MEDIUM_ZOOM) ? 30 : 10;
      }
    });
    mapMarkers.layer.addLayers(mapMarkers.markers);
    map.addLayer(mapMarkers.layer);
  };

  watch(appStore.list, (mutation, _state) => {
    updateMarkers(mutation.filter, map.getZoom() >= MEDIUM_ZOOM);
  });
  /* #endregion */

  /* #region Select map markers. */
  const selectMarker = (pointID: number) => {
    if (!mapMarkers.markers) { return; }

    const marker = mapMarkers.markers
      .find((marker: any) => marker.ID === pointID);

    if (!marker) { return; }

    map.setView(marker.getLatLng(), Math.max(map.getZoom(), MEDIUM_ZOOM));
    marker.openTooltip();

    // TODO: Change the marker?
  };

  watch(appStore.listToMap, (mutation, _state) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    selectMarker(mutation.point);
  });
  /* #endregion */  
});
</script>
