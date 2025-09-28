import React, { useState, useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { SpaceXApi } from './services/spacexApi'
import { MissionCard } from './components/MissionCard'
import { Filters } from './components/Filters'
import { Pagination } from './components/Pagination'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { Modal } from './components/Modal'
import { LaunchDetails } from './components/LaunchDetails'

function AppContent() {
  const { 
    launches, 
    filteredLaunches, 
    favorites, 
    loading, 
    error, 
    filters, 
    pagination,
    dispatch,
    toggleFavorite,
    updateFilters,
    setPage
  } = useApp()

  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchLaunches = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const data = await SpaceXApi.fetchLaunches()
        dispatch({ type: 'SET_LAUNCHES', payload: data })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }

    fetchLaunches()
  }, [dispatch])

  const handleViewDetails = (launch) => {
    setSelectedLaunch(launch)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLaunch(null)
  }

  const getCurrentPageLaunches = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    return filteredLaunches.slice(startIndex, endIndex)
  }

  const currentPageLaunches = getCurrentPageLaunches()

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Atmosly • SpaceX Mission Explorer
          </h1>
          <p className="text-lg text-gray-600">
            Fetch real data from the SpaceX public API. Filter, explore, and favorite launches.
          </p>
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          onFiltersChange={updateFilters}
          launches={launches}
        />

        {/* Results */}
        {loading ? (
          <LoadingSkeleton />
        ) : currentPageLaunches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filters.showFavorites ? 'No favorite missions' : 'No missions found'}
            </h3>
            <p className="text-gray-600">
              {filters.showFavorites 
                ? 'Start by favoriting some missions to see them here.'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPageLaunches.map((launch) => (
                <MissionCard
                  key={launch.id}
                  launch={launch}
                  isFavorite={favorites.includes(launch.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedLaunch?.name}
        >
          {selectedLaunch && (
            <LaunchDetails
              launch={selectedLaunch}
              onClose={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
