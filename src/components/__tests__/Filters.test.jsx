import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Filters } from '../Filters'

const mockLaunches = [
  {
    id: '1',
    name: 'Mission 1',
    date_utc: '2023-01-01T12:00:00.000Z',
    success: true
  },
  {
    id: '2',
    name: 'Mission 2',
    date_utc: '2022-01-01T12:00:00.000Z',
    success: false
  },
  {
    id: '3',
    name: 'Mission 3',
    date_utc: '2024-01-01T12:00:00.000Z',
    success: true
  }
]

const mockFilters = {
  searchTerm: '',
  year: 'all',
  successfulOnly: false,
  showFavorites: false
}

describe('Filters', () => {
  const mockOnFiltersChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all filter controls', () => {
    render(
      <Filters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        launches={mockLaunches}
      />
    )

    expect(screen.getByPlaceholderText('e.g., Starlink, CRS, Demo...')).toBeInTheDocument()
    expect(screen.getByLabelText('Year')).toBeInTheDocument()
    expect(screen.getByLabelText('Successful only')).toBeInTheDocument()
    expect(screen.getByLabelText('Show favorites')).toBeInTheDocument()
  })

  it('updates search term with debouncing', async () => {
    const user = userEvent.setup()
    render(
      <Filters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        launches={mockLaunches}
      />
    )

    const searchInput = screen.getByPlaceholderText('e.g., Starlink, CRS, Demo...')
    await user.type(searchInput, 'Mission 1')

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350))

    expect(mockOnFiltersChange).toHaveBeenCalledWith({ searchTerm: 'Mission 1' })
  })

  it('updates year filter', () => {
    render(
      <Filters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        launches={mockLaunches}
      />
    )

    const yearSelect = screen.getByLabelText('Year')
    fireEvent.change(yearSelect, { target: { value: '2023' } })

    expect(mockOnFiltersChange).toHaveBeenCalledWith({ year: '2023' })
  })

  it('toggles successful only filter', () => {
    render(
      <Filters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        launches={mockLaunches}
      />
    )

    const successfulToggle = screen.getByLabelText('Successful only')
    fireEvent.click(successfulToggle)

    expect(mockOnFiltersChange).toHaveBeenCalledWith({ successfulOnly: true })
  })

  it('toggles show favorites filter', () => {
    render(
      <Filters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        launches={mockLaunches}
      />
    )

    const favoritesToggle = screen.getByLabelText('Show favorites')
    fireEvent.click(favoritesToggle)

    expect(mockOnFiltersChange).toHaveBeenCalledWith({ showFavorites: true })
  })

  it('generates year options from launches', () => {
    render(
      <Filters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        launches={mockLaunches}
      />
    )

    const yearSelect = screen.getByLabelText('Year')
    const options = Array.from(yearSelect.options).map(option => option.value)
    
    expect(options).toContain('all')
    expect(options).toContain('2022')
    expect(options).toContain('2023')
    expect(options).toContain('2024')
  })
})
