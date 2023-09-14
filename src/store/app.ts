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
      ID TEXT, Organization TEXT, Interest TEXT, Influence TEXT, Activity TEXT,
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
      Stakeholders.Interest as Interest,
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
      value: [[], [], [], [], [], []]
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
            'Innovation', 'Religion', 'Social', 
            'Political', 'Parenting', 'Art', 'Other'
          ]
        },
        category: {
          name: 'Category',
          options: [
            'Public', 'Research & academia', 'Private',
            'Non-governmental', 'Education',
            'Self-organised', 'Philantropic',
            'Parents', 'Support group', 'Media', 'International', 'Other'
          ]
        },
        interest: {
          name: 'Interest',
          options: ['Low', 'High']
        },
        influence: {
          name: 'Influence',
          options: ['Low', 'High']
        },
        activity: {
          name: 'Activity',
          options: ['Low', 'High']
        },
        youth: {
          name: 'Youth',
          options: ['Youth-led', 'Youth-focused', 'Indirect impact']
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
            'Inovare', 'Religie', 'Social',
            'Politic', 'Părinți', 'Artă', 'Altul'
          ]
        },
        category: {
          name: 'Categorie',
          options: [
            'Publică', 'Cercetare & academică', 'Privată',
            'Non-guvernamentală', 'Educație',
            'Auto-organizată', 'Filantropică',
            'Părinți', 'Grup suport', 'Media', 'Internațională', 'Alta'
          ]
        },
        interest: {
          name: 'Interes',
          options: ['Mic', 'Mare']
        },
        influence: {
          name: 'Influență',
          options: ['Mică', 'Mare']
        },
        activity: {
          name: 'Activitate',
          options: ['Mică', 'Mare']
        },
        youth: {
          name: 'Tineri',
          options: ['Lideri tineri', 'Pentru tineri', 'Impact indirect']
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
        if (value[0].length && !(<any[]>value[0]).includes(point.Field)) { return false; }
        if (value[1].length && !(<any[]>value[1]).includes(point.Category)) { return false; }
        if (value[2].length && !(<any[]>value[2]).includes(point.Interest)) { return false; }
        if (value[3].length && !(<any[]>value[3]).includes(point.Influence)) { return false; }
        if (value[4].length && !(<any[]>value[4]).includes(point.Activity)) { return false; }
        if (value[5].length && !(<any[]>value[5]).includes(point.Youth)) { return false; }

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
      this.drawer.value = [[], [], [], [], [], []];

      // Reset the current point.
      this.mapToList.point = null;

      // Reset the page.
      this.list1.page = 1;
    }
  }
})
