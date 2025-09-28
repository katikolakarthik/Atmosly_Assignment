import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MissionCard } from '../MissionCard'

const mockLaunch = {
  id: 'test-launch-1',
  name: 'Test Mission',
  date_utc: '2023-01-01T12:00:00.000Z',
  success: true,
  upcoming: false,
  rocket: { name: 'Falcon 9' },
  links: {
    webcast: 'https://youtube.com/watch?v=test',
    patch: { small: 'https://example.com/patch.png' }
  }
}

describe('MissionCard', () => {
  const mockOnToggleFavorite = vi.fn()
  const mockOnViewDetails = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders mission information correctly', () => {
    render(
      <MissionCard
        launch={mockLaunch}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onViewDetails={mockOnViewDetails}
      />
    )

    expect(screen.getByText('Test Mission')).toBeInTheDocument()
    expect(screen.getByText('Falcon 9')).toBeInTheDocument()
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('calls onToggleFavorite when favorite button is clicked', () => {
    render(
      <MissionCard
        launch={mockLaunch}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onViewDetails={mockOnViewDetails}
      />
    )

    const favoriteButton = screen.getByLabelText('Add to favorites')
    fireEvent.click(favoriteButton)
    
    expect(mockOnToggleFavorite).toHaveBeenCalledWith('test-launch-1')
  })

  it('calls onViewDetails when view details button is clicked', () => {
    render(
      <MissionCard
        launch={mockLaunch}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onViewDetails={mockOnViewDetails}
      />
    )

    const viewDetailsButton = screen.getByText('View details')
    fireEvent.click(viewDetailsButton)
    
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockLaunch)
  })

  it('shows webcast link when available', () => {
    render(
      <MissionCard
        launch={mockLaunch}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onViewDetails={mockOnViewDetails}
      />
    )

    const webcastLink = screen.getByText('Webcast')
    expect(webcastLink).toBeInTheDocument()
    expect(webcastLink).toHaveAttribute('href', 'https://youtube.com/watch?v=test')
  })

  it('shows correct favorite state', () => {
    const { rerender } = render(
      <MissionCard
        launch={mockLaunch}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onViewDetails={mockOnViewDetails}
      />
    )

    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument()

    rerender(
      <MissionCard
        launch={mockLaunch}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
        onViewDetails={mockOnViewDetails}
      />
    )

    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument()
  })
})
