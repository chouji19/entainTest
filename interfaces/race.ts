
//Interface for the race in the app
export interface IRace {
	race_id: string;
	meeting_name: string;
	race_number: number;
	advertised_start_seconds: number;
	category: string;
}

// Interfaces from de API
export interface RaceResponse {
	status: number;
	data: Data;
	message: string;
}

export interface Data {
	next_to_go_ids: string[];
	race_summaries: { [key: string]: RaceSummary };
}

export interface RaceSummary {
	race_id: string;
	race_name: string;
	race_number: number;
	meeting_id: string;
	meeting_name: string;
	category_id: string;
	advertised_start: AdvertisedStart;
	race_form: RaceForm;
	venue_id: string;
	venue_name: string;
	venue_state: string;
	venue_country: string;
}

export interface AdvertisedStart {
	seconds: number;
}

export interface RaceForm {
	distance: number;
	distance_type: DistanceType;
	distance_type_id: string;
	track_condition: DistanceType;
	track_condition_id: string;
	weather: DistanceType;
	weather_id: string;
	race_comment: string;
	additional_data: string;
	generated: number;
	silk_base_url: string;
	race_comment_alternative: string;
}

export interface DistanceType {
	id: string;
	name: string;
	short_name: string;
	icon_uri?: string;
}
