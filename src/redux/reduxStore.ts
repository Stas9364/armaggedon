import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AsteroidsActionsType, asteroidsReducer} from './asteroidsReducer';

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>;
export type AppActionsType = AsteroidsActionsType;

const rootReducer = combineReducers({
    asteroids: asteroidsReducer
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk),
);
