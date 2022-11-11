import { createContext, PropsWithChildren } from 'react'

export type ListProviderProps = {
  type: 'ul' | 'ol' | 'tl'
}

export type ListContext = {
  type: ListProviderProps['type']
}

export const ListContext = createContext({} as ListContext)

const ListProvider = (props: PropsWithChildren<ListProviderProps>) => {
  const { children, type } = props

  return (
    <ListContext.Provider value={{ type }}>{children}</ListContext.Provider>
  )
}

export default ListProvider
