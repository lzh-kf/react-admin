import Store from '../utils/store'
import { setSession } from '../utils/cache'

const store = new Store({
    state: {
        permissions: [],
        menus: [],
        routes: [],
        user: setSession.user || {}
    },
    mutations: {
        setPermissions (state, data) {
            state.permissions = data
        },
        setMenus (state, data) {
            state.menus = data
        },
        setRoute (state, data) {
            state.routes = data
        },
        setUser (state, data) {
            state.user = data
        }
    }
})

export default store
