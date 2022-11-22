/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainColor } from '../../Constants';
import { IRace } from '../../interfaces/race';
import { RaceContext } from '../../Context';
import { getTimerFormat } from '../../util/utils';

interface Props {
	race: IRace
}

const RaceItem: React.FC<Props> = ({ race }) => {
	const [timer, setTimer] = useState(race ? race.advertised_start_seconds : 60);
	// const [timer, setTimer] = useState(Math.floor(Math.random() * 60) * 60 );

	const { removeRace } = useContext(RaceContext);

	const id = React.useRef<number | null>(null);
	const clear = () => {
		if (id.current) {
			clearInterval(id.current);
		}
	};

	useEffect(() => {
		id.current = setInterval(() => {
			setTimer((time) => time - 1);
		}, 1000);
		return () => clear();
	}, []);

	useEffect(() => {
		if (timer < -59) {
			removeRace(race.race_id);
			clear();
		}
	}, [race.race_id, removeRace, timer]);


	if (!race) {
		return <></>;
	}

	return (
		<View style={styles.item}>
			<View style={styles.iconContainer}>
				<Icon name="horse-variant-fast" size={15} color="black" />
			</View>
			<View style={styles.itemInfo}>
				<Text style={styles.meetingName}>{race.meeting_name}</Text>
				<Text style={styles.raceNumber}>Race #{race.race_number}</Text>
			</View>
			<View style={styles.itemCounter}>
				<Text
					style={[styles.countDown,
					{ color: timer <= 60 * 5 ? 'red' : 'black' }]}
				>
					{getTimerFormat(timer)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#e1e1e1',
		height: 40,
		width: '100%',
		marginVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 8,
		shadowColor: mainColor,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	iconContainer: {
		justifyContent: 'center',
		marginRight: 6,
	},
	itemInfo: {
		flex: 1,
		justifyContent: 'center',
	},
	itemCounter: {
		justifyContent: 'center',
		marginRight: 4,
	},
	meetingName: {
		fontSize: 15,
	},
	raceNumber: {
		fontSize: 12,
		fontWeight: '300',
	},
	countDown: {
		fontSize: 15,
	},
	countDownRed: {
		color: 'red',
	},
});

export default RaceItem;
