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

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWRyaWFuLWJ1cmxhY3UiLCJhIjoiY2xvMzNzem9uMjhxazJubXh6anV1eHo0eSJ9.Vc3KIBTB2bXXtFlW5GB26Q';

const appStore = useAppStore();
const heightStyle = `height: ${Environment.mapHeightPx}px;}`;

// This function returns the icon for a point, based on its translated field.
function getIcon(point: any): L.Icon {
  return L.icon({
    iconUrl: IconPath.getIcon(point),
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    shadowUrl: './css/images/marker-shadow.png',
    shadowSize: [50, 50],
    shadowAnchor: [15, 50]
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

  L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, {
    minZoom: Environment.minZoom,
    maxZoom: Environment.maxZoom,
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
    appStore.list1.page = 1;
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
    appStore.list1.page = 1;
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
          .bindTooltip(point.Name, { permanent: isPermanentTooltip, direction: 'bottom', offset: [0, -6] })
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
        return (zoomLevel < Environment.mediumZoom - 1) ? 30 : 10;
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
