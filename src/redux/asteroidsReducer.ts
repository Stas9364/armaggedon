import {AppThunk} from './reduxStore';
import {asteroidsDataAPI} from "../api/api";

enum ASTEROIDS {
    GET_DATA = 'GET_DATA',
    IS_DANGEROUS = 'IS_DANGEROUS',
    IS_FETCHING = 'IS_FETCHING'
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
        default:
            return state;
    }
};

export type AsteroidsActionsType =
    | ReturnType<typeof getAsteroidsData>
    | ReturnType<typeof isDangerousAsteroids>
    | ReturnType<typeof isFetching>


export const getAsteroidsData = (data: any) => ({
    type: ASTEROIDS.GET_DATA,
    data
} as const);

export const isDangerousAsteroids = (dangerous: boolean) => ({type: ASTEROIDS.IS_DANGEROUS, dangerous} as const);
export const isFetching = (fetching: boolean) => ({type: ASTEROIDS.IS_FETCHING, fetching} as const);

export const getAsteroidsDataTC = (size: number, page: number): AppThunk => async (dispatch) => {
    const response = await asteroidsDataAPI.getData(size, page);
    dispatch(getAsteroidsData(response.data.near_earth_objects));
};
