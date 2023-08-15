// Utilities
import alasql from 'alasql';
import { get } from 'http';
import papa from 'papaparse';
import { defineStore } from 'pinia'

/* #region Initialization functions. */
async function fetchFile(fileName: string): Promise<string | undefined> {
  const target = `csv/${fileName}.csv`;

  const res = await fetch(target, {
    method: 'get',
    headers: { 'content-type': 'text/csv;charset=UTF-8' }
  });
  const data = await res.text();

  if (res.status === 200) {
    return data;
  } else {
    console.log(`Error code in fetch. File: ${fileName}. Code: ${res.status}.`);
  }
}

function parseCSV(csv?: string) {
  if (!csv) { return; }

  return papa.parse(csv, {
    header: true,
    dynamicTyping: true
  }).data;
}

async function getData(lang: string = 'EN') {
  const DBName = `${lang}DB`;
  let DB = (<any>alasql).databases[DBName];
  if (DB) { return getJoinData(DB);  }

  DB = new (<any>alasql).Database(DBName);
  // console.log((<any>alasql).databases);

  DB.exec(`
    CREATE TABLE IF NOT EXISTS Stakeholders(
      ID TEXT, Organization TEXT, Influence TEXT, Activity TEXT,
      Description TEXT, Youth TEXT, Field TEXT, Category TEXT,
      Level TEXT, Site TEXT);
  `);

  DB.exec(`
    CREATE TABLE IF NOT EXISTS Locations(
      ID TEXT, OrgID TEXT, Organization TEXT, Telephone TEXT,
      Address TEXT, Latitude DOUBLE, Longitude DOUBLE);
  `);

  DB.tables.Stakeholders.data = parseCSV(await fetchFile('Stakeholders'));
  DB.tables.Locations.data = parseCSV(await fetchFile('Locations'));

  return getJoinData(DB);
}

function getJoinData(DB: any) {
  return DB.exec(`
    SELECT 
      Locations.ID as ID,
      Stakeholders.Organization as Org,
      Stakeholders.Description as Description,
      Stakeholders.Field as Field,
      Stakeholders.Category as Category,
      Stakeholders.Influence as Influence,
      Stakeholders.Activity as Activity,
      Stakeholders.Youth as Youth,
      Stakeholders.Level as Level,
      
      Stakeholders.Site as Site,
      Locations.Telephone as Telephone,
      Locations.Address as Address,
      Locations.Latitude as Latitude,
      Locations.Longitude as Longitude
    FROM Locations LEFT JOIN Stakeholders
      ON Locations.OrgID = Stakeholders.ID
    ORDER BY Stakeholders.Organization;
  `);
}
/* #endregion */

export const useAppStore = defineStore('app', {
  state: () => ({
    // 
    drawer: {
      visible: false,
      // Field, Category, Influence, Activity, Youth
      value: [null, null, null, null, null]
    },
    list: {
      init: false,
      points: [],
      filter: [],
      // mapFilter: [],
    },
    listToMap: {
      point: 0,
      page: 1
    },
    map: {
      bounds: [
        [42.15731506855392, 19.819335937500004],
        [49.34840531310837, 30.432128906250004]
      ],
    },
    mapToList: {
      point: null
    }
  }),
  getters: {
    mapFilter: (state) => state.list.filter.filter((point: any) => 
      point.Latitude > state.map.bounds[0][0] &&
      point.Latitude < state.map.bounds[1][0] &&
        
      point.Longitude > state.map.bounds[0][1] &&
      point.Longitude < state.map.bounds[1][1]
    )
  },
  actions: {
    async initList() {
      if (this.list.init) { return; }

      // console.log(await getData());
      this.list.points = await getData();
      this.list.filter = this.list.points;

      this.list.init = true;
    },
    filterList() {
      const { value } = this.drawer;

      this.list.filter = this.list.points.filter((point: any) => {
        if (value[0] && point.Field !== value[0]) { return false; }
        if (value[1] && point.Category !== value[1]) { return false; }
        if (value[2] && point.Influence !== value[2]) { return false; }
        if (value[3] && point.Activity !== value[3]) { return false; }
        if (value[4] && point.Youth !== value[4]) { return false; }

        return true;
      });
    }
  }
})
