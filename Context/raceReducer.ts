import { IRace } from '../interfaces/race';
import { RaceState } from './';


type RaceActionType =
	| { type: '[Race] - InitRaces', payload: { races: IRace[] } }
	| { type: '[Race] - RemoveRace', payload: { race_id: string } }
	| { type: '[Race] - change loading state', payload: { isLoading: boolean } }
	| { type: '[Race] - setError', payload: { error: string } }
	| { type: '[Race] - clean error' }


export const RaceReducer = (state: RaceState, action: RaceActionType): RaceState => {

	switch (action.type) {
		case '[Race] - InitRaces':
			return {
				...state,
				races: action.payload.races,
			};
		// to remove, just filter races excluding the current one
		case '[Race] - RemoveRace':
			return {
				...state,
				races: state.races.filter(x=> x.race_id !== action.payload.race_id),
			};
		case '[Race] - change loading state':
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		case '[Race] - clean error':
			return {
				...state,
				error: '',
			};
		case '[Race] - setError':
			return {
				...state,
				error: action.payload.error,
			};

		default:
			return state;
	}

};
