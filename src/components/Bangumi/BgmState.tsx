import {atom} from 'jotai'

export type BgmStateType = {
  type: string
}

export const BgmStateAtom = atom<BgmStateType>({
  type: 'watched'
})
