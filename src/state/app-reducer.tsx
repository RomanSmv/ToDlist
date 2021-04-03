import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";


const initialState: RequestStatusType = {
    // происходит ли взаимодействие с сервером сейчас
    status: 'loading',
    //если ошибка какая-то глобальная произайдет - мы щапишем текст ошибки сюда
    error: " error message",
    // когда приложение проинициализировалось (проверили юзера, получили настройки и т.д.)
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: ValuesStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        dispatch(setAppInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        }
    })

}


//происходит ли сейчас взаимодействие с сервером
export type ValuesStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestStatusType = {
    status: ValuesStatusType,
    error: string | null,
    isInitialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppInitializedAC>
