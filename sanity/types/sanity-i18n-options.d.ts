import 'sanity';

type I18nMap = Partial<Record<'ar' | 'en' | 'it', string>>;

declare module 'sanity' {
  interface StringOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface TextOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface BooleanOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface NumberOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface UrlOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface ArrayOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface ObjectOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface ReferenceOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface ImageOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface FileOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface SlugOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface DatetimeOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface DateOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }

  interface DocumentOptions {
    i18nTitle?: I18nMap;
    i18nDescription?: I18nMap;
  }
}
