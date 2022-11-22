import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [count, setCount] = useState(0)

  const handleCount = number => {
    setCount(number * 2)
  }

  return <AppContext.Provider value={{ count, handleCount }}>{children}</AppContext.Provider>
}

export default AppContextProvider
