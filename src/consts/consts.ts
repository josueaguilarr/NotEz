export const NOTE_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const

export const FILTERS_BUTTONS = {
    [NOTE_FILTERS.ALL]: {
        literal: 'Todas',
        href: `/?filter=${NOTE_FILTERS.ALL}`
    },
    [NOTE_FILTERS.ACTIVE]: {
        literal: 'Activos',
        href: `/?filter=${NOTE_FILTERS.ACTIVE}`
    },
    [NOTE_FILTERS.COMPLETED]: {
        literal: 'Completados',
        href: `/?filter=${NOTE_FILTERS.COMPLETED}`
    }
} as const