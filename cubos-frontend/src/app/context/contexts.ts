'use client'

import { createContext } from "react"

export type AppElements = {
    scramblebar_text?: string,
    scramble?: string,
}
export type AppTheme = 'light' | 'dark';

export const ThemeContext = createContext<AppTheme>('light');
export const AppContext = createContext<AppElements>({});