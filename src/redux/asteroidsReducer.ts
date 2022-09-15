import {AppThunk} from './reduxStore';
import {asteroidsDataAPI} from "../api/api";

enum ASTEROIDS {
    GET_DATA = 'GET_DATA',
    IS_DANGEROUS = 'IS_DANGEROUS',
    IS_FETCHING = 'IS_FETCHING',
    DESTROY_ASTEROID = 'DESTROY_ASTEROID',
    CANCEL_DESTRUCTION = 'CANCEL_DESTRUCTION'
}

export const initState = {
    asteroids: [],
    isDangerous: false,
    isFetching: true
};

export const asteroidsReducer = (state: any = initState, action: AsteroidsActionsType): any => {
    switch (action.type) {
        case ASTEROIDS.GET_DATA:
            return {...state, asteroids: [...state.asteroids,  ...action.data]};

        case ASTEROIDS.IS_DANGEROUS:
            return {...state, isDangerous: action.dangerous};

        case ASTEROIDS.IS_FETCHING:
            return {...state, isFetching: action.fetching};

        case ASTEROIDS.DESTROY_ASTEROID:
            return {...state, asteroids: state.asteroids.filter((a: any) => a.id !== action.id)};

        case ASTEROIDS.CANCEL_DESTRUCTION:
            return {...state, asteroids: [...action.asteroid, ...state.asteroids]};

        default:
            return state;
    }
};

export type AsteroidsActionsType =
    | ReturnType<typeof getAsteroidsData>
    | ReturnType<typeof isDangerousAsteroids>
    | ReturnType<typeof isFetching>
    | ReturnType<typeof destroyAsteroid>
    | ReturnType<typeof cancelDestruction>


export const getAsteroidsData = (data: any) => ({type: ASTEROIDS.GET_DATA, data} as const);
export const isDangerousAsteroids = (dangerous: boolean) => ({type: ASTEROIDS.IS_DANGEROUS, dangerous} as const);
export const isFetching = (fetching: boolean) => ({type: ASTEROIDS.IS_FETCHING, fetching} as const);
export const destroyAsteroid = (id: string) => ({type: ASTEROIDS.DESTROY_ASTEROID, id} as const);
export const cancelDestruction = (asteroid: any) => ({type: ASTEROIDS.CANCEL_DESTRUCTION, asteroid} as const);

export const getAsteroidsDataTC = (size: number, page: number): AppThunk => async (dispatch) => {
    const response = await asteroidsDataAPI.getData(size, page);
    dispatch(getAsteroidsData(response.data.near_earth_objects));
};
