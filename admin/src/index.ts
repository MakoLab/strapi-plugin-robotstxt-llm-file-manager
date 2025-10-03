import pluginPkg from '../../package.json';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';

const name = pluginPkg.strapi.name;

const getTrad = (id: string): string => `${PLUGIN_ID}.${id}`;

type Translations = {
  [key: string]: string | Translations; // może być zagnieżdżony obiekt tłumaczeń
};

/**
 * Dodaje prefix do każdego klucza w obiekcie tłumaczeń.
 * Rekurencyjnie przechodzi przez zagnieżdżone obiekty.
 *
 * @param translations - obiekt tłumaczeń
 * @param prefix - prefix do dodania przed każdy klucz (np. pluginId)
 * @returns nowy obiekt tłumaczeń z prefiksem w kluczach
 */
export function prefixPluginTranslations(translations: Translations, prefix: string): Translations {
  const prefixedTranslations: Translations = {};

  for (const key in translations) {
    if (typeof translations[key] === 'object') {
      // jeśli wartość jest obiektem, rekurencyjnie dodaj prefix do kluczy wewnątrz
      prefixedTranslations[`${prefix}.${key}`] = prefixPluginTranslations(
        translations[key] as Translations,
        prefix
      );
    } else {
      // jeśli wartość jest stringiem, dodaj prefix do klucza
      prefixedTranslations[`${prefix}.${key}`] = translations[key];
    }
  }

  return prefixedTranslations;
}

export default {
  register(app: any) {
    app.createSettingSection(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: `${PLUGIN_ID}.plugin.name`,
          defaultMessage: 'Links',
        },
      },
      [
        {
          intlLabel: {
            id: getTrad('settings'),
            defaultMessage: 'Configuration',
          },
          id: 'settings',
          to: `/settings/${PLUGIN_ID}`,
          Component: async () => {
            const { default: HomePage } = await import('./pages/HomePage');
            return HomePage;
          },
          permissions: [
            {
              action: 'plugin::links.manage',
              subject: null,
            },
          ],
        },
      ]
    );

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app: any) {},

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
          );
          return {
            data: prefixPluginTranslations(data, PLUGIN_ID),
            locale,
          };
        } catch {
          return {
            data: {},
            locale,
          };
        }
      })
    );

    return importedTrads;
  },
};
