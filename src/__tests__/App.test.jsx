import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from '../App'
import { SpaceXApi } from '../services/spacexApi'

// Mock the SpaceX API
vi.mock('../services/spacexApi')

const mockLaunches = [
  {
    id: 'test-1',
    name: 'Test Mission 1',
    date_utc: '2023-01-01T12:00:00.000Z',
    success: true,
    upcoming: false,
    rocket: { name: 'Falcon 9' },
    links: { webcast: 'https://youtube.com/watch?v=test1' }
  },
  {
    id: 'test-2',
    name: 'Test Mission 2',
    date_utc: '2022-01-01T12:00:00.000Z',
    success: false,
    upcoming: false,
    rocket: { name: 'Falcon Heavy' },
    links: { webcast: 'https://youtube.com/watch?v=test2' }
  }
]

describe('App', () => {
  beforeEach(() => {
    vi.mocked(SpaceXApi.fetchLaunches).mockResolvedValue(mockLaunches)
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app title and description', async () => {
    render(<App />)
    
    expect(screen.getByText('Atmosly • SpaceX Mission Explorer')).toBeInTheDocument()
    expect(screen.getByText('Fetch real data from the SpaceX public API. Filter, explore, and favorite launches.')).toBeInTheDocument()
  })

  it('displays loading skeleton while fetching data', () => {
    vi.mocked(SpaceXApi.fetchLaunches).mockImplementation(() => new Promise(() => {})) // Never resolves
    
    render(<App />)
    
    // Check for loading skeleton elements by looking for the specific skeleton structure
    const skeletonCards = document.querySelectorAll('.animate-pulse')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  it('displays launches after loading', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
      expect(screen.getByText('Test Mission 2')).toBeInTheDocument()
    })
  })

  it('filters launches by search term', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('e.g., Starlink, CRS, Demo...')
    await user.type(searchInput, 'Mission 1')

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Mission 2')).not.toBeInTheDocument()
    })
  })

  it('filters launches by year', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
    })

    const yearSelect = screen.getByLabelText('Year')
    await userEvent.selectOptions(yearSelect, '2023')

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Mission 2')).not.toBeInTheDocument()
    })
  })

  it('filters launches by success status', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
    })

    const successfulToggle = screen.getByLabelText('Successful only')
    await userEvent.click(successfulToggle)

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Mission 2')).not.toBeInTheDocument()
    })
  })

  it('toggles favorites and persists in localStorage', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
    })

    // Click favorite button for first mission
    const favoriteButton = screen.getAllByLabelText('Add to favorites')[0]
    await user.click(favoriteButton)

    // Toggle show favorites
    const showFavoritesToggle = screen.getByLabelText('Show favorites')
    await user.click(showFavoritesToggle)

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Mission 2')).not.toBeInTheDocument()
    })

    // Check localStorage
    const favorites = JSON.parse(localStorage.getItem('spacex-favorites') || '[]')
    expect(favorites).toContain('test-1')
  })

  it('opens modal when view details is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
    })

    const viewDetailsButton = screen.getAllByText('View details')[0]
    await user.click(viewDetailsButton)

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument() // Modal title
    })
  })

  it('handles API errors gracefully', async () => {
    vi.mocked(SpaceXApi.fetchLaunches).mockRejectedValue(new Error('API Error'))
    
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('API Error')).toBeInTheDocument()
    })
  })
})
