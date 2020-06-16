import { useSelector, shallowEqual, DefaultRootState } from 'react-redux'


type IUseShallowEqualSelector = <TState = DefaultRootState, TSelected = unknown>(selector: (state: TState) => TSelected) => TSelected

export const useShallowEqualSelector: IUseShallowEqualSelector = (selector) =>
    useSelector(selector, shallowEqual);