// Utilities
import alasql from 'alasql';
import papa from 'papaparse';
import { defineStore } from 'pinia'
import { Langs } from './langs';
import { Environment } from '@/env';

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

async function getData(lang = Langs.EN) {
  const DBName = `DB_${lang}`;
  let DB = (<any>alasql).databases[DBName];
  if (DB) { return getJoinData(DB); }

  DB = new (<any>alasql).Database(DBName);
  // console.log((<any>alasql).databases);

  DB.exec(`
    CREATE TABLE IF NOT EXISTS Stakeholders(
      ID TEXT, Organization TEXT, Influence TEXT, Activity TEXT,
      Expertise TEXT, Youth TEXT, Field TEXT, Category TEXT,
      Level TEXT, Site TEXT);
  `);

  DB.exec(`
    CREATE TABLE IF NOT EXISTS Locations(
      ID TEXT, OrgID TEXT, Name TEXT, IsNetwork TEXT, Organization TEXT,
      Telephone TEXT, Address TEXT, Latitude DOUBLE, Longitude DOUBLE);
  `);

  DB.tables.Stakeholders.data =
    parseCSV(await fetchFile(`Stakeholders${lang}`));
  DB.tables.Locations.data = parseCSV(await fetchFile(`Locations${lang}`));

  return getJoinData(DB);
}

function getJoinData(DB: any) {
  return DB.exec(`
    SELECT 
      Locations.ID as ID,
      Locations.Name as Name,
      Locations.IsNetwork as IsNetwork,
      Stakeholders.Organization as Org,
      Stakeholders.Expertise as Expertise,
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
      points: [],
      filter: [],
      // mapFilter: [],
    },
    list1: {
      page: 1
    },
    listToMap: {
      point: 0
    },
    map: {
      bounds: [
        Environment.mapBoundSouthWest,
        Environment.mapBoundNorthEast
      ],
    },
    mapToList: {
      point: null,
    },

    /* #region Translations */
    translations: {
      lang: Langs.RO,
      EN: {
        field: {
          name: 'Field',
          options: [
            'Health', 'Education', 'Employment',
            'Environment', 'Sports', 'Youth',
            'Sustainability', 'Religion', 'Social',
            'Political', 'Family', 'Art', 'Other'
          ]
        },
        category: {
          name: 'Category',
          options: [
            'Governmental', 'Research & Academia', 'Private',
            'Non-governmental organisations', 'Education',
            'Self-organised communities', 'Philantropies',
            'Parents & family communities', 'Media', 'Other'
          ]
        },
        influence: {
          name: 'Influence',
          options: ['Low', 'Medium', 'High']
        },
        activity: {
          name: 'Activity',
          options: ['Low', 'Medium', 'High']
        },
        youth: {
          name: 'Youth',
          options: ['Youth', 'Youth and Adults']
        },
        other: {
          title: 'Locator',
          legendFields: 'Legend for Fields',
          legendCategories: 'Legend for Categories',
          filter: 'Filter',
          network: 'Network',
          field: 'Field',
          category: 'Category',
          site: 'Site',
          tel: 'Tel',
          address: 'Address',
          map: 'Map'
        }
      },
      RO: {
        field: {
          name: 'Domeniu',
          options: [
            'Sănătate', 'Educație', 'Muncă',
            'Mediu', 'Sport', 'Tineri',
            'Sustainabilitate', 'Religie', 'Social',
            'Politic', 'Familie', 'Artă', 'Altul'
          ]
        },
        category: {
          name: 'Categorie',
          options: [
            'Guvernamentală', 'Cercetare și Academică', 'Private',
            'Organizații Non-Guvernamentale', 'Educație',
            'Comunități Organizate', 'Filantropii',
            'Comunități Părinți și Familii', 'Media', 'Alta'
          ]
        },
        influence: {
          name: 'Influență',
          options: ['Mică', 'Medie', 'Mare']
        },
        activity: {
          name: 'Activitate',
          options: ['Mică', 'Medie', 'Mare']
        },
        youth: {
          name: 'Tineri',
          options: ['Tineri', 'Tineri și Adulți']
        },
        other: {
          title: 'Hartă',
          legendFields: 'Legendă Domenii',
          legendCategories: 'Legendă Categorii',
          filter: 'Filtrează',
          network: 'Rețea',
          field: 'Domeniu',
          category: 'Categorie',
          site: 'Pagina',
          tel: 'Tel',
          address: 'Adresă',
          map: 'Hartă'
        }
      }
    }
    /* #endregion */
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
      // console.log(await getData());
      this.list.points = await getData(this.translations.lang);
      this.list.filter = this.list.points;
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
    },
    switchLang() {
      // Set the UI language.
      this.translations.lang =
        this.translations.lang === Langs.RO ? Langs.EN : Langs.RO;

      // Get the translated data.
      this.initList();

      // Reset the drawer.
      this.drawer.value = [null, null, null, null, null];

      // Reset the current point.
      this.mapToList.point = null;

      // Reset the page.
      this.list1.page = 1;
    }
  }
})
