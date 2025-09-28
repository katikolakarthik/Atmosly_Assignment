import React, { useMemo } from 'react'
import { SearchInput } from './SearchInput'
import { Select } from './Select'
import { Toggle } from './Toggle'

export function Filters({ filters, onFiltersChange, launches }) {
  const yearOptions = useMemo(() => {
    const years = [...new Set(launches.map(launch => 
      new Date(launch.date_utc).getFullYear()
    ))].sort((a, b) => b - a)
    
    return [
      { value: 'all', label: 'All years' },
      ...years.map(year => ({ value: year.toString(), label: year.toString() }))
    ]
  }, [launches])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by mission name
          </label>
          <SearchInput
            id="search"
            value={filters.searchTerm}
            onChange={(value) => onFiltersChange({ searchTerm: value })}
            placeholder="e.g., Starlink, CRS, Demo..."
            className="w-full"
          />
        </div>

        <Select
          id="year"
          label="Year"
          value={filters.year}
          onChange={(value) => onFiltersChange({ year: value })}
          options={yearOptions}
          placeholder="All years"
        />

        <div className="flex items-center">
          <Toggle
            id="successful-only"
            checked={filters.successfulOnly}
            onChange={(checked) => onFiltersChange({ successfulOnly: checked })}
            label="Successful only"
          />
        </div>

        <div className="flex items-center">
          <Toggle
            id="show-favorites"
            checked={filters.showFavorites}
            onChange={(checked) => onFiltersChange({ showFavorites: checked })}
            label="Show favorites"
          />
        </div>
      </div>
    </div>
  )
}
