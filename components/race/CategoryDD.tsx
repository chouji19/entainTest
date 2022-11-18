import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { bgColor, mainColor } from '../../Constants';

const data = [
	{ label: 'All categories', value: '' },
	{ label: 'Greyhound racing', value: '9daef0d7-bf3c-4f50-921d-8e818c60fe61' },
	{ label: 'Harness racing', value: '161d9be2-e909-4326-8c2c-35ed71fb460b' },
	{ label: 'Horse racing', value: '4a2788f8-e825-4d36-9894-efd4baf1cfae' },
];

interface Props {
	onChangeHandler: (item: string) => void;
}

const CategoryDropDown: React.FC<Props> = ({ onChangeHandler }) => {
	const [value, setValue] = useState('');
	const [isFocus, setIsFocus] = useState(false);

	const renderLabel = () => {
		return (
			<Text style={[styles.label, isFocus && { color: mainColor }]}>
				Filter by category
			</Text>
		);
	};

	// item: any based on the library definition
	const onChange = (item: any) => {
		setValue(item.value);
		setIsFocus(false);
		onChangeHandler(item.value as string);
	};


	return (
		<View style={styles.container}>
			{renderLabel()}
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: mainColor }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? 'Select item' : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={onChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: 16,
	},
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: bgColor,
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
});

export default CategoryDropDown;
