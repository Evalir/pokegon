import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Box from '3box'
import { ERROR_BOX, LOADING_BOX, READY_BOX } from '../lib/constants'
import environment from '../lib/environment'

export const BoxContext = createContext(null)

export const RETRY_TIME = 2000

export function useBoxContext() {
  const boxContext = useContext(BoxContext)
  if (!boxContext) {
    throw new Error('useBoxContext must be used within a BoxProvider')
  }
}

// We have this retry id to set a max number of retries;
// we don't want to spam the browser tab and make it slow with
// nextwork requests.
let retryId = 0
let retryTimer = null

export default function BoxProvider({ children }) {
  const [address, setAddress] = useState('')
  const [box, setBox] = useState(null)
  const [boxState, setBoxState] = useState(null)

  const init3Box = useCallback(async () => {
    // If there's no ethereum provider, we can't load 3box.
    // This means profile addresses and threads won't work.
    if (!window.ethereum || !window.web3) {
      retryId++
      retryTimer = setTimeout(init3Box, RETRY_TIME)
      return
    }
    try {
      setBoxState(LOADING_BOX)
      const [currentAddress] = await window.web3.eth.accounts
      if (!currentAddress) {
        throw new Error('No current address.')
      }
      setAddress(currentAddress)
      const box = await Box.openBox(currentAddress, window.ethereum)
      // This feels a bit slow ,but we gotta wait for the box to sync to avoid any errors when
      // reading data (even though it's fine by 3box docs)
      await box.syncDone
      setBox(box)

      await box.openSpace(environment('SPACE_NAME_3BOX'))
      // At this point 3Box should be properly initialized and ready to be used.
      setBoxState(READY_BOX)
    } catch (err) {
      setBoxState(ERROR_BOX)
      console.error(err)
      if (retryId < 3) {
        retryId++
        retryTimer = setTimeout(init3Box, RETRY_TIME)
      }
    }
  }, [])

  useEffect(() => {
    init3Box()
    // Everytime this component gets unmounted we should reset the
    // retryId to 0
    return () => {
      retryId = 0
      clearTimeout(retryTimer)
    }
  }, [init3Box])

  return (
    <BoxContext.Provider value={{ address, box, boxState }}>
      {children}
    </BoxContext.Provider>
  )
}
