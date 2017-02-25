import trkl from 'trkl'

import userState from '../state/user'

export const userDetails = trkl.computed(() => ({
	loading: !userState.name().length,
	fullName: userState.name() + ' ' + userState.surname()
}))
