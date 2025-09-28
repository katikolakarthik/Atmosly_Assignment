import { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  launches: [],
  filteredLaunches: [],
  favorites: JSON.parse(localStorage.getItem('spacex-favorites') || '[]'),
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    year: 'all',
    successfulOnly: false,
    showFavorites: false
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload, loading: false, error: null }
    
    case 'SET_FILTERED_LAUNCHES':
      return { ...state, filteredLaunches: action.payload }
    
    case 'UPDATE_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 }
      }
    
    case 'TOGGLE_FAVORITE':
      const launchId = action.payload
      const isFavorite = state.favorites.includes(launchId)
      const newFavorites = isFavorite
        ? state.favorites.filter(id => id !== launchId)
        : [...state.favorites, launchId]
      
      localStorage.setItem('spacex-favorites', JSON.stringify(newFavorites))
      return { ...state, favorites: newFavorites }
    
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } }
    
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const applyFilters = (launches, filters) => {
    let filtered = [...launches]

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(launch =>
        launch.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Apply year filter
    if (filters.year !== 'all') {
      filtered = filtered.filter(launch => {
        const launchYear = new Date(launch.date_utc).getFullYear().toString()
        return launchYear === filters.year
      })
    }

    // Apply success filter
    if (filters.successfulOnly) {
      filtered = filtered.filter(launch => launch.success === true)
    }

    // Apply favorites filter
    if (filters.showFavorites) {
      filtered = filtered.filter(launch => state.favorites.includes(launch.id))
    }

    return filtered
  }

  useEffect(() => {
    const filtered = applyFilters(state.launches, state.filters)
    dispatch({ type: 'SET_FILTERED_LAUNCHES', payload: filtered })
    
    const totalPages = Math.ceil(filtered.length / state.pagination.itemsPerPage)
    dispatch({ 
      type: 'SET_PAGINATION', 
      payload: { totalPages, currentPage: 1 } 
    })
  }, [state.launches, state.filters, state.favorites])

  const value = {
    ...state,
    dispatch,
    toggleFavorite: (launchId) => dispatch({ type: 'TOGGLE_FAVORITE', payload: launchId }),
    updateFilters: (filters) => dispatch({ type: 'UPDATE_FILTERS', payload: filters }),
    setPage: (page) => dispatch({ type: 'SET_PAGINATION', payload: { currentPage: page } })
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
