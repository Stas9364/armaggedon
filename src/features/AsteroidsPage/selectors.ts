import {AppStateType} from "../../redux/reduxStore";

export const asteroidsListSelector = (state: AppStateType) => state.asteroids.asteroids;

export const filteredAsteroidsListSelector = (state: AppStateType) => {
    return state.asteroids.asteroids.filter((a: any) => a.is_potentially_hazardous_asteroid);
};

export const isDangerousSelector = (state: AppStateType) => state.asteroids.isDangerous;

export const isFetchingSelector = (state: AppStateType) => state.asteroids.isFetching;
