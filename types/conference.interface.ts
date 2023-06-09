import { RoleEnum } from 'api/services/conferenceService/types/createConferenceDto';

export interface MediaFile {
	id: string;
	conference_id: string;
	filename: string;
	media_type: 'image' | 'video';
}

export default interface IConference {
	id: string;
	name: string;
	datetime: string;
	visibility: 'public' | 'private';
	banner_filename: string;
	creator: string;
	user: {
		name: string;
	};
	media_file: MediaFile[];
	conference_member: {
		id: number;
		conference_id: string;
		user_id: string;
		role: RoleEnum;
		user: {
			email: string;
		};
	}[];
}
