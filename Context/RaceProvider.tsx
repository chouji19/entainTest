import React,{ FC, useEffect, useReducer, useState } from 'react';
import backApi from '../api/backApi';
import { IRace, RaceResponse } from '../interfaces/race';
import { RaceContext, RaceReducer } from './';

export interface RaceState {
	races: IRace[];
	isLoading: boolean,
	error: string,
}

// initial state
export const Race_INITIAL_STATE: RaceState = {
	races: [],
	isLoading: false,
	error: '',
};

export const RaceProvider:FC<{children: React.ReactNode}> = ({ children }) => {

	const [state, dispatch] = useReducer( RaceReducer , Race_INITIAL_STATE );

	// Get races and convert to an array of IRace
	const getRaces = async () => {
		dispatch({type: '[Race] - change loading state', payload: { isLoading: true }});
		try {
			const racesResult = await backApi.get<RaceResponse>('/racing/?method=nextraces&count=10');
			const racesData: IRace[] = [];

			// convert the races response to an Array to make it easier to handle
			for (let index = 0; index < racesResult.data.data.next_to_go_ids.length; index++) {
				const raceId = racesResult.data.data.next_to_go_ids[index];
				const raceTemp = racesResult.data.data.race_summaries[raceId];
				if (raceTemp) {
					racesData.push({
						advertised_start_seconds: raceTemp.advertised_start.seconds,
						category: raceTemp.category_id,
						meeting_name: raceTemp.meeting_name,
						race_id: raceTemp.race_id,
						race_number: raceTemp.race_number,
					});
				}
			}
			// sort and get 5 races
			const races: IRace[] = racesData.sort((a, b) => {
				return a.advertised_start_seconds - b.advertised_start_seconds;
			}).slice(0,5);
			dispatch({type: '[Race] - InitRaces', payload: {races }});
		} catch (err) {
			dispatch({type: '[Race] - setError', payload: {error: err as string}});

			// Clean the error to avoid displaying multiple times
			setTimeout(() => {
				dispatch({type: '[Race] - clean error'});
			}, 3000);
		} finally {
			dispatch({type: '[Race] - change loading state', payload: { isLoading: false }});
		}
	};
	useEffect(() => {
		getRaces();
	}, []);

	const removeRace = async (race_id: string) => {
		dispatch({type:  '[Race] - RemoveRace', payload: { race_id }});
	};

	return (
		<RaceContext.Provider value={{
			...state,
			getRaces,
			removeRace,
		}}>
			{ children }
		</RaceContext.Provider>
	);
};
