import React, { memo } from 'react'
import { Badge } from './Badge'

export const MissionCard = memo(function MissionCard({ 
  launch, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetails 
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const getStatusBadge = (launch) => {
    if (launch.upcoming) return { variant: 'warning', text: 'Upcoming' }
    if (launch.success === true) return { variant: 'success', text: 'Success' }
    if (launch.success === false) return { variant: 'danger', text: 'Failed' }
    return { variant: 'default', text: 'TBD' }
  }

  const status = getStatusBadge(launch)
  const launchYear = new Date(launch.date_utc).getFullYear()

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {launch.name}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{formatDate(launch.date_utc)}, {formatTime(launch.date_utc)}</p>
            <p className="font-medium">{launch.rocket?.name || 'Unknown Rocket'}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(launch.id)}
          className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`h-5 w-5 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant={status.variant}>{status.text}</Badge>
        <Badge variant="year">{launchYear}</Badge>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onViewDetails(launch)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
        >
          View details
        </button>
        {launch.links?.webcast && (
          <a
            href={launch.links.webcast}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
          >
            Webcast
          </a>
        )}
      </div>
    </div>
  )
})
