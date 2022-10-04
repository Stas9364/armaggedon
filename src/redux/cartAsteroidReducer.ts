enum CART {
    ADD_ASTEROID = 'ADD_ASTEROID',
    DELETE_ASTEROID = 'DELETE_ASTEROID'
}

const initState: any = [];

export const cartAsteroidReducer = (state: any = initState, action: cartAsteroidReducerType): any => {
    switch (action.type) {

        case CART.ADD_ASTEROID:
            return [...state, ...action.asteroid];

        case CART.DELETE_ASTEROID:
            return state.filter((a: any) => a.id !== action.id);

        default:
            return state;
    }
}

export type cartAsteroidReducerType =
    | ReturnType<typeof addAsteroid>
    | ReturnType<typeof deleteAsteroid>

export const addAsteroid = (asteroid: any) => ({type: CART.ADD_ASTEROID, asteroid} as const);
export const deleteAsteroid = (id: string) => ({type: CART.DELETE_ASTEROID, id} as const);