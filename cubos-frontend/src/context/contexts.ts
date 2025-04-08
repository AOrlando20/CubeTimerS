'use client'

import { createContext, SetStateAction, Dispatch } from "react"

export type AppElements = {
    scramblebar_text?: string,
    scramble?: string,
}
export type AppTheme = 'light' | 'dark';

export type AppElementsState = {
    appElements: AppElements
    setAppElements: Dispatch<SetStateAction<AppElements>>
} | null

export type AppThemeState = {
    appTheme: AppTheme,
    setAppTheme: Dispatch<SetStateAction<AppTheme>>
} | null


interface CubeType {
    type: string
}


export const ThemeContext = createContext<AppThemeState>(null);
export const AppContext = createContext<AppElementsState>(null);