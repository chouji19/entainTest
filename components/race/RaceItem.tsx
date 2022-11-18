import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import { mainColor } from '../../Constants';
import { IRace } from '../../interfaces/race';
import { RaceContext } from '../../Context';

interface Props {
	race: IRace
}

const RaceItem: React.FC<Props> = ({ race }) => {
	const [timer, setTimer] = useState(race ? race.advertised_start_seconds : 60);

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
		if (timer === 0) {
			removeRace(race.race_id);
			clear();
		}
	}, [race.race_id, removeRace, timer]);


	if (!race) {
		return <></>;
	}

	return (
		<View style={styles.item}>
			<View style={styles.itemInfo}>
				<Text style={styles.meetingName}>{race.meeting_name}</Text>
				<Text style={styles.raceNumber}>Race #{race.race_number}</Text>
			</View>
			<View style={styles.itemCounter}>
				<Text style={styles.countDown}>{moment.utc(timer * 1000).format('HH:mm:ss')}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#e1e1e1',
		height: 60,
		width: '100%',
		marginVertical: 8,
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
		fontSize: 35,
	},
});

export default RaceItem;
