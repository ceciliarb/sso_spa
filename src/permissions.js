import permissions from './permissions.json'
import store from './store'

const can = function (name) {
    let roles = store.getters.user_roles
    if(!roles) return false
    //iterando no array de roles do usuario logado
    for(var i = 0; i < roles.length; i++) {
        //se no array de permissoes existe o recurso 'name' para o role iterado
        if(permissions[roles[i]]) {
            if(permissions[roles[i]].includes(name)) {
                return true
            }
        }
    }
    return false
}

export { can }