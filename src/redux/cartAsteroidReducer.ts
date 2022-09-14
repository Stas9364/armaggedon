import {AppThunk} from "./reduxStore";

enum CART {
    ADD_ASTEROID = 'ADD_ASTEROID'
}

const initState: any = [];

export const cartAsteroidReducer = (state: any = initState, action: cartAsteroidReducerType): any => {
    switch (action.type) {
        case CART.ADD_ASTEROID:
            return [...state, action.asteroid];
        default:
            return state;
    }
}

export type cartAsteroidReducerType = ReturnType<typeof addAsteroid>

export const addAsteroid = (asteroid: any) => ({type: CART.ADD_ASTEROID, asteroid}as const);

export const addAsteroidTC = (asteroid: any): AppThunk => (dispatch) => {

}
