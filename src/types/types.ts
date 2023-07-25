import { NONE_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"

export type ToSupportedLanguage = keyof typeof SUPPORTED_LANGUAGES
export type NoneLanguage = typeof NONE_LANGUAGE
export type FromLanguage = ToSupportedLanguage | NoneLanguage

export type payloadType = null | ToSupportedLanguage

export interface Params {
  sourceText: string
  source: FromLanguage
  target: ToSupportedLanguage
}
export interface State {
  sourceText: string
  translation: string
  source: FromLanguage
  target: ToSupportedLanguage
}

export type Action =
  { type: 'INTERCHANGE_LANG' } |
  { type: 'SET_SOURCE_LANG', payload: FromLanguage } |
  { type: 'SET_TARGET_LANG', payload: ToSupportedLanguage } |
  { type: 'SET_SOURCE_TEXT', payload: string } |
  { type: 'SET_TRANSLATION', payload: string }


export enum SectionType {
  source = "from",
  target = 'to',
}

export type SelectorProps =
  { type: SectionType.source, value: FromLanguage, onChange: (lang: FromLanguage) => void } |
  { type: SectionType.target, value: ToSupportedLanguage | NoneLanguage, onChange: (lang: ToSupportedLanguage) => void }

export type TextAreaProps = {
  type: SectionType
  placeholder: string
  value: string
  onChange: (value: string) => void
}