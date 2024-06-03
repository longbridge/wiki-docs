export enum LocaleEnums {
  en = "en",
  "zh-CN" = "zh-CN",
  "zh-HK" = "zh-HK"
}

export type IWiki = {
  id: number
  title?: string,
  description?: string,
  body?: string,
  name_locales: LocaleEnums
  description_locales: LocaleEnums
  body_locales: LocaleEnums
  slug: string
  created_at: string
  updated_at: string
  content_updated_at: string
  alias: Array<any>
}
