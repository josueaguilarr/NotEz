import { NOTE_FILTERS } from "../consts/consts"

export interface Note {
    uuid: string,
    content: string,
    id_group: number | null,
    completed: boolean,
    created_at: string,
}

export interface Group {
    id: number,
    uuid: string,
    group_name: string,
    created_at: string,
    has_pending: boolean
}

export type NoteUuid = string;
export type NoteCompleted = boolean;
export type NoteContent = string;
export type NoteGroup = number | null;
export type GroupName = string;

export type NoteIdPick = Pick<Note, 'uuid'>
export type NoteContentPick = Pick<Note, 'content'>
export type NoteCompletedPick = Pick<Note, 'completed'>

export type FilterValue= typeof NOTE_FILTERS[keyof typeof NOTE_FILTERS]