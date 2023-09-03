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

  const updateMarkers = (points: any[]) => {
    if (mapMarkers.layer) {
      map.removeLayer(mapMarkers.layer);
    }

    mapMarkers.markers = points
      .map((point: any) => {
        const lat = point.Latitude;
        const lng = point.Longitude;

        const result = L
          .marker([lat, lng])
          .bindPopup(point.Org)
          .on('click', function () {
            map.setView([lat, lng]);
            appStore.mapToList.point = point;
          });

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

    marker.openPopup();
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
