import { createContext } from 'react'
import type { Registry } from './registry.types'

export const registryContext = createContext<Registry>({
  documentHeight: -1,
  documentWidth: -1
})
