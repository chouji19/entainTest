import { createContext } from 'react';
import { IRace } from '../interfaces/race';


interface ContextProps {
	races: IRace[];
	isLoading: boolean;
	error: string;
	removeRace: (race_id: string) => Promise<void>;
	getRaces: () => Promise<void>;
}


export const RaceContext = createContext({} as ContextProps );
