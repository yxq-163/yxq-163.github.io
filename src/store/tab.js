import Cookie from 'js-cookie'

function generateRoute(menuArry, father)
{   
    // menuArry.forEach(item => {
    //     if (!item.children)
    //     {
    //         item.compoent = () => import(`../views/${item.url}`)
    //         menuArry.push(item)    
    //     }
    //     else 
    //     {
    //         generateRoute(item.children, item.name)
    //     }
    // })
   // menuArry.forEach(item => {
    //     if (item.children)
    // })
    // router.addRoute(father, 

    //     const search = url.split('?')[1]
    //     if (!search) {
    //       return {}
    //     }
    //     return JSON.parse(
    //       '{"' +
    //       decodeURIComponent(search)
    //         .replace(/"/g, '\\"')
    //         .replace(/&/g, '","')
    //         .replace(/=/g, '":"') +
    //       '"}'
    //     )
    return  menuArry
}   

export default {
    state: {
        isCollaling: false,
        menuList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
        ],
        menu: [],
        route: [],
    },

    mutations: {
        collapseMenu(state) {
            state.isCollaling = !state.isCollaling;
        },
        addMenu(state, val) {
            if (val.name !== 'home')
                var index = state.menuList.indexOf(val)
                if (index == -1) 
                {
                    state.menuList.push(val)             
                }
        },
        deleteMenu(state, val) {
            var index = state.menuList.indexOf(val)
            if ( index != -1)
                state.menuList.splice(index,1)
        },
        addMenu(state, val) {   

            state.menu = val
            Cookie.set('menu',JSON.stringify(val))

        },
        addRouter(state, router) {
            const menuArry = []
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            menu.forEach(item => {
                item.compoent = () => import(`../views/${item.url}`)

            })


            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(child => {
                        child.compoent = () => import(`../views/${child.url}`)
                        return child
                    })       
                    menuArry.push(...item.children)             
                }
                else{
                    item.compoent = () => import(`../views/${item.url}`)
                    menuArry.push(item)    
                }
                
            })
            console.log(menuArry,'menuArry')
            menuArry.forEach(item => {
                router.addRoute('main', item)
            })
        }
    }
}