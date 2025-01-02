import { FILTERS_BUTTONS } from "../consts/consts";
import { FilterValue } from "../types/types";

interface Props {
    filterSelected: FilterValue
    completedCount: number
    onFilterChange: (filter: FilterValue) => void,
}

export const Filters: React.FC<Props> = ({ filterSelected, completedCount, onFilterChange }) => {
    return (
        <div className="flex gap-1">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
                    const isSelected = key === filterSelected
                    const className = isSelected ? 'bg-green-900 text-green-300' : ''

                    if (literal === 'Completados' && completedCount === 0) return

                    return (
                        <a
                            key={key} className={`${className} list-none px-2.5 sm:py-0.5 rounded-full transition-all duration-150 font-medium text-sm`}
                            href={href}
                            onClick={(e) => {
                                e.preventDefault()
                                onFilterChange(key as FilterValue)
                            }}
                        >
                            {literal}
                        </a>
                    )
                })
            }
        </div>

    )
}