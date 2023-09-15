<template>
  <div id="map" class="w-auto" :style="heightStyle">
  </div>
</template>

<script lang="ts" setup>
import L from 'leaflet';
import "leaflet.markercluster";
import { onMounted, ref, watch } from 'vue';
import { useAppStore } from '@/store/app';
import { IconPath } from './IconPath';
import { Environment } from '@/env';

const appStore = useAppStore();
const heightStyle = `height: ${Environment.mapHeightPx}px;}`;

// This function returns the icon for a point, based on its translated field.
function getIcon(point: any): L.Icon {
  return L.icon({
    iconUrl: IconPath.getIcon(point),
    iconSize: [41, 41],
    iconAnchor: [20, 41],
    shadowUrl: './css/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [15, 41]
  });
}

onMounted(() => {
  /* #region Map initialization. */
  var map = L
    .map('map')
    // @ts-ignore
    .setView(Environment.mapCenter, Environment.minZoom)
    .setMaxBounds([
      // @ts-ignore
      Environment.mapBoundSouthWest,
      // @ts-ignore
      Environment.mapBoundNorthEast
    ]);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: Environment.minZoom,
    maxZoom: Environment.maxZoom,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  /* #endregion */

  /* #region Map events. */
  let currentIsMediumZoom = ref(map.getZoom() > Environment.mediumZoom);
  map.on('zoomend', function () {
    // console.log(map.getZoom());
    const bounds = map.getBounds();
    appStore.map.bounds = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
    ];

    currentIsMediumZoom.value = map.getZoom() > Environment.mediumZoom;
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
          .bindTooltip(point.Name, { permanent: isPermanentTooltip, direction: 'bottom', offset: [-12, -12] })
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
        return (zoomLevel < Environment.mediumZoom - 1) ? 40 : 20;
      }
    });
    mapMarkers.layer.addLayers(mapMarkers.markers);
    map.addLayer(mapMarkers.layer);
  };

  watch(appStore.list, (mutation, _state) => {
    updateMarkers(mutation.filter, map.getZoom() > Environment.mediumZoom);
  });
  /* #endregion */

  /* #region Select map markers. */
  const selectMarker = (pointID: number) => {
    if (!mapMarkers.markers) { return; }

    const marker = mapMarkers.markers
      .find((marker: any) => marker.ID === pointID);

    if (!marker) { return; }

    map.setView(
      marker.getLatLng(),
      Math.max(map.getZoom(), Environment.mediumZoom),
      { animate: false }
    );
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
