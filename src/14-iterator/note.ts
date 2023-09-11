export interface Note {
	id: number;
	date: string;
	title: string;
}

export type NoteDraft = Omit<Note, 'id'>;
