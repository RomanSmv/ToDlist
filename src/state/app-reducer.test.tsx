import {removeToDoListAC, todolistsReducer} from "./todolists-reducer";
import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";


let startState: RequestStatusType

beforeEach(() => {


    startState = {
        status: 'idle',
        error: null
    }
})


test('correct error should be set', () => {

    const endState = appReducer(startState,  setAppErrorAC('errorrr'))

    expect(endState.error).toBe('errorrr');
});
test('correct status should be set', () => {

    const endState = appReducer(startState,  setAppStatusAC('loading'))

    expect(endState.status).toBe('loading');
});