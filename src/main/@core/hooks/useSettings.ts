import { useContext } from 'react'
import { SettingsContext, SettingsContextValue } from 'src/main/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
