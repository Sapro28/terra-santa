import 'sanity';

type I18nMap = Partial<Record<'ar' | 'en' | 'it', string>>;

type I18nOptions = {
  i18nTitle?: I18nMap;
  i18nDescription?: I18nMap;
};

declare module 'sanity' {
  interface StringOptions extends I18nOptions {}
  interface TextOptions extends I18nOptions {}
  interface BooleanOptions extends I18nOptions {}
  interface NumberOptions extends I18nOptions {}
  interface UrlOptions extends I18nOptions {}
  interface ArrayOptions extends I18nOptions {}
  interface ObjectOptions extends I18nOptions {}
  interface ReferenceOptions extends I18nOptions {}
  interface ImageOptions extends I18nOptions {}
  interface FileOptions extends I18nOptions {}
  interface SlugOptions extends I18nOptions {}
  interface DatetimeOptions extends I18nOptions {}
  interface DateOptions extends I18nOptions {}
  interface DocumentOptions extends I18nOptions {}
}

declare module '@sanity/types' {
  interface StringOptions extends I18nOptions {}
  interface TextOptions extends I18nOptions {}
  interface BooleanOptions extends I18nOptions {}
  interface NumberOptions extends I18nOptions {}
  interface UrlOptions extends I18nOptions {}
  interface ArrayOptions extends I18nOptions {}
  interface ObjectOptions extends I18nOptions {}
  interface ReferenceOptions extends I18nOptions {}
  interface ImageOptions extends I18nOptions {}
  interface FileOptions extends I18nOptions {}
  interface SlugOptions extends I18nOptions {}
  interface DatetimeOptions extends I18nOptions {}
  interface DateOptions extends I18nOptions {}
  interface DocumentOptions extends I18nOptions {}
}
