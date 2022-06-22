import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";

const initialState = {
    items: [],
    allItems: 0,
}

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        allitems: (state) => {
            state.allItems = state.items.length
        },

        increment: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity = item.quantity + 1
                    return item
                } else {
                    return item
                }
            })
        },
        decrement: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    if (item.quantity > 1) item.quantity = item.quantity - 1
                    return item
                } else {
                    return item
                }
            })

        },
        addiIem: (state, action) => {
            const isExist = state.items.find(item => item.id === action.payload.id)
            if (!isExist) {
                state.items.push(action.payload)
                state.allItems = state.items.length
            }
        },
        deletteItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
            state.allItems = state.items.length
        },
        reset: (state) => {
            state.items = []
            state.allItems = state.items.length
        },
    },
})



const initialuserState = {
    user: {
        id: null,
        username: null,
        email: null,
        phone_number: null,
    },
    refresh: null,
    isAuth: false,
    isSuperUser: false,
    access: null
}

const user = createSlice({
    name: "user",
    initialState: initialuserState,
    reducers: {
        login: (state, action) => {
            const { refresh, access } = action.payload
            const { id, username, email, phone_number, is_superuser } = jwt_decode(access)
            state.user = { id, username, email, phone_number }
            state.refresh = refresh
            state.access = access
            state.isAuth = true
            state.isSuperUser = is_superuser
        },
        logout: (state) => {
            state.user = {
                id: null,
                username: null,
                email: null,
                phone_number: null,
            }
            state.refresh = null
            state.isAuth = false
            state.isSuperUser = false

        }
    }
})


export const { decrement, increment, addiIem, deletteItem, reset, allitems } = cart.actions
export const { login, logout } = user.actions

const Reducers = {
    cart: cart.reducer,
    user: user.reducer
}
export default Reducers