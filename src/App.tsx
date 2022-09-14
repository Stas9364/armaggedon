import React, {useEffect, useState} from 'react';
import './App.css';
import { AppRouter, Navbar } from './components';
import {asteroidsDataAPI} from "./api/api";
import {getAsteroidsData, isFetching} from "./redux/asteroidsReducer";
import {useAppDispatch, useAppSelector} from "./utils/hooks";
import {isFetchingSelector} from "./features";

function App() {
    const dispatch = useAppDispatch();

    const fetching = useAppSelector(isFetchingSelector);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (fetching) {
            asteroidsDataAPI.getData(20, currentPage)
                .then(response => {
                    dispatch(getAsteroidsData(response.data.near_earth_objects));
                    setCurrentPage(currentPage + 1);
                })
                .finally(() => {
                    dispatch(isFetching(false));
                })
        }
    }, [fetching]);

    return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
