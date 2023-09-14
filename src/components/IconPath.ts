import { useAppStore } from '@/store/app';

export class IconPath {
  private static appStore = useAppStore();
  
  private static getIconName(point: any): string {
    if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[0]) {
      return 'health';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[1]) {
      return 'education';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[2]) {
      return 'employment';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[3]) {
      return 'environment';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[4]) {
      return 'sports';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[5]) {
      return 'youth';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[6]) {
      return 'innovation';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[7]) {
      return 'religion';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[8]) {
      return 'social';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[9]) {
      return 'political';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[10]) {
      return 'family';
    } else if (point.Field === IconPath.appStore.translations[IconPath.appStore.translations.lang].field.options[11]) {
      return 'art';
    } else {
      return 'other';
    }
  }

  private static getIconColor(point: any): string {
    if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[0]) {
      return 'red';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[1]) {
      return 'green';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[2]) {
      return 'black';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[3]) {
      return 'blue';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[4]) {
      return 'purple';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[5]) {
      return 'orange';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[6]) {
      return 'pink';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[7]) {
      return 'lime';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[8]) {
      return 'teal';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[9]) {
      return 'aqua';
    } else if (point.Category === IconPath.appStore.translations[IconPath.appStore.translations.lang].category.options[10]) {
      return 'dgrey';
    } else {
      return 'grey';
    }
  }

  static getIcon(point: any): string {
    const iconName = IconPath.getIconName(point);
    const iconColor = IconPath.getIconColor(point);

    return `./img/${iconName}/${iconColor}.png`;
  }
}