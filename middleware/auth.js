import firebase from '~/services/firebase'

// TODO: Pseudo-camada de autenticação das páginas
const protect = (name) => {
  const protects = [
    'index'
  ]
  return protects.includes(name)
}

export default function ({ store, route, redirect }) {
  if (protect(route.name)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return redirect(401, '/login')
      }
      store.dispatch('users/auth', user.uid)
    })
  }
}
