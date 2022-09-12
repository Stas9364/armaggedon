import {AppThunk} from './reduxStore';
import {asteroidsDataAPI} from "../api/api";

enum ASTEROIDS {
    GET_DATA = 'GET_DATA',
}

export const initState = [];

export const asteroidsReducer = (state: any = initState, action: AsteroidsActionsType): any => {
    switch (action.type) {
        case ASTEROIDS.GET_DATA:
            return [...state, ...action.data];
        default:
            return state;
    }
};

export type AsteroidsActionsType = ReturnType<typeof getAsteroidsData>;

export const getAsteroidsData = (data: any) => ({
    type: ASTEROIDS.GET_DATA,
    data
} as const);

export const getAsteroidsDataTC = (): AppThunk => async (dispatch) => {
    const response = await asteroidsDataAPI.getData();
    dispatch(getAsteroidsData(response.data.near_earth_objects));
};
