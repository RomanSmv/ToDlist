

const initialState:RequestStatusType = {
    status: 'loading' ,
    error: " error mesage"
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR' , error } as const)
export const setAppStatusAC = (status:ValuesStatusType) => ({type:'APP/SET-STATUS', status} as const)

//происходит ли сейчас взаимодействие с сервером
export type ValuesStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestStatusType = {
    status: ValuesStatusType,
    error: string | null
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
