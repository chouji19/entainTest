import React from 'react';
import { act, create } from 'react-test-renderer';
import { IRace } from '../interfaces/race';
import RaceItem from '../components/race/RaceItem';
import { RaceContext } from '../Context';
import { RaceProvider } from '../Context/RaceProvider';

const race: IRace = {
	race_id: '1d1f9dbf-672d-40dc-bf88-878c486516cc',
	advertised_start_seconds: 1668732314,
	category: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
	meeting_name: 'Tristate',
	race_number: 4,
};

beforeEach(() => {
	jest.useFakeTimers();
});

const initialState = {
	error: '',
	races: [],
	isLoading: false,
	getRaces: jest.fn(),
	removeRace: jest.fn(),
};

describe('<RaceItem />', () => {
	test('renders correctly', () => {
		const component = create(
			<RaceContext.Provider value={initialState}>
				<RaceItem race={race} />
			</RaceContext.Provider>
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
