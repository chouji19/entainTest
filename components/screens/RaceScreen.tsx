import React, { useContext, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-simple-toast';

import { bgColor, mainColor } from '../../Constants';
import RaceItem from '../race/RaceItem';
import CategoryDropDown from '../race/CategoryDD';
import { IRace } from '../../interfaces/race';
import { RaceContext } from '../../Context';

const RaceScreen = () => {

	const { races, isLoading, error } = useContext(RaceContext);
	const [racesFiltered, setRacesFiltered] = useState<IRace[]>([]);
	const [categoryFilter, setCategoryFilter] = useState('');

	if (isLoading || !races) {
		return (<View style={styles.containerLoading}>
			<ActivityIndicator color={mainColor} size={80} />
		</View>
		);
	}

	if (error) {
		Toast.show(error);
	}

	const onCategoryFilter = (value: string) => {
		setCategoryFilter(value);
		if (value.length !== 0) {
			setRacesFiltered(races.filter(x => x.category === value));
		} else {
			setRacesFiltered([]);
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<View style={styles.content}>
					<Text style={styles.title}>Next to Go</Text>
					<CategoryDropDown onChangeHandler={onCategoryFilter} />
					{
						categoryFilter.length > 0
							? racesFiltered.map(race => <RaceItem race={race} key={race.race_id} />)
							: races.map(race => <RaceItem race={race} key={race.race_id} />)
					}
					{
						categoryFilter.length > 0 && racesFiltered.length === 0 && (
							<View style={styles.noRacesFound}>
								<Text style={styles.noRacesFoundText}>No races available for this category</Text>
							</View>
						)
					}
				</View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: bgColor,
	},
	containerLoading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
		marginVertical: 8,
		color: mainColor,
	},
	noRacesFound: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	noRacesFoundText: {
		fontSize: 20,
		textAlign: 'center',
		marginVertical: 8,
		color: mainColor,
	},
});

export default RaceScreen;
