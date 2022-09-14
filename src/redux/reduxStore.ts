import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AsteroidsActionsType, asteroidsReducer} from './asteroidsReducer';
import {cartAsteroidReducer, cartAsteroidReducerType} from "./cartAsteroidReducer";

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>;
export type AppActionsType = AsteroidsActionsType | cartAsteroidReducerType;

const rootReducer = combineReducers({
    asteroids: asteroidsReducer,
    cart: cartAsteroidReducer
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk),
);
