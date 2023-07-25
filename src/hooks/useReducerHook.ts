import { useReducer } from 'react'
import type { State, Action, FromLanguage, ToSupportedLanguage } from '../types/types'

const initialState: State = {
  source: 'none',
  target: 'en',
  sourceText: '',
  translation: '',
}

function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANG') {
    return {
      ...state,
      source: state.target,
      target: state.source,
      sourceText: state.translation,
      translation: state.sourceText
    }
  }

  if (type === 'SET_SOURCE_LANG') {
    return {
      ...state,
      source: action.payload,
      translation: ''
    }
  }

  if (type === 'SET_TARGET_LANG') {
    return {
      ...state,
      target: action.payload,
      translation: ''
    }
  }

  if (type === 'SET_SOURCE_TEXT') {
    return {
      ...state,
      sourceText: action.payload
    }
  }

  if (type === 'SET_TRANSLATION') {
    return {
      ...state,
      translation: action.payload
    }
  }
  return state
}

export function useReducerHook() {
  const [{ source, target, sourceText, translation }, dispatch] = useReducer(reducer, initialState)
  const INTERCHANGE_LANG = () => {
    dispatch({ type: 'INTERCHANGE_LANG' })
  }

  const SET_SOURCE_LANG = (payload: FromLanguage) => {
    if (payload !== null) {
      dispatch({ type: 'SET_SOURCE_LANG', payload })
    }
  }

  const SET_TARGET_LANG = (payload: ToSupportedLanguage) => {
    dispatch({ type: 'SET_TARGET_LANG', payload })
  }

  const SET_SOURCE_TEXT = (payload: string) => {
    dispatch({ type: 'SET_SOURCE_TEXT', payload })
  }

  const SET_TRANSLATION = (payload: string) => {
    dispatch({ type: 'SET_TRANSLATION', payload })
  }

  return {
    source,
    target,
    sourceText,
    translation,
    INTERCHANGE_LANG,
    SET_SOURCE_LANG,
    SET_TARGET_LANG,
    SET_SOURCE_TEXT,
    SET_TRANSLATION
  }
}