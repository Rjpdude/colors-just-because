import { createContext } from 'react'
import type { Registry } from './registry.types'

export const RegistryContext = createContext<Registry>({
  documentHeight: -1,
  documentWidth: -1
})
