import userState from '../state/user'

export function getUser () {
	setTimeout(() => {
		userState.name('Pete')
		userState.surname('Shaw')
	}, 1000)
}
