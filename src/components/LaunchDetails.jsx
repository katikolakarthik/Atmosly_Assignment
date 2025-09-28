import React, { useState, useEffect } from 'react'
import { SpaceXApi } from '../services/spacexApi'
import { Badge } from './Badge'

export function LaunchDetails({ launch, onClose }) {
  const [rocket, setRocket] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (launch.rocket) {
      setLoading(true)
      const rocketId = typeof launch.rocket === 'string' ? launch.rocket : launch.rocket.id
      SpaceXApi.fetchRocket(rocketId)
        .then(setRocket)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [launch.rocket])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusInfo = (launch) => {
    if (launch.upcoming) return { variant: 'warning', text: 'Upcoming', description: 'This launch is scheduled for the future' }
    if (launch.success === true) return { variant: 'success', text: 'Successful', description: 'This mission completed successfully' }
    if (launch.success === false) return { variant: 'danger', text: 'Failed', description: 'This mission did not complete successfully' }
    return { variant: 'default', text: 'TBD', description: 'Mission status to be determined' }
  }

  const status = getStatusInfo(launch)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start space-x-4">
        {launch.links?.patch?.small && (
          <img
            src={launch.links.patch.small}
            alt={`${launch.name} mission patch`}
            className="w-16 h-16 object-contain"
          />
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{launch.name}</h3>
          <div className="flex items-center space-x-4 mb-2">
            <Badge variant={status.variant}>{status.text}</Badge>
            <span className="text-sm text-gray-600">
              {new Date(launch.date_utc).getFullYear()}
            </span>
          </div>
          <p className="text-sm text-gray-600">{status.description}</p>
        </div>
      </div>

      {/* Mission Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Launch Information</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">Date & Time:</span>
              <span className="ml-2 text-gray-600">{formatDate(launch.date_utc)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Launchpad:</span>
              <span className="ml-2 text-gray-600">{launch.launchpad?.name || 'Unknown'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Flight Number:</span>
              <span className="ml-2 text-gray-600">{launch.flight_number || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Rocket Information</h4>
          {loading ? (
            <div className="text-sm text-gray-500">Loading rocket details...</div>
          ) : rocket ? (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Rocket:</span>
                <span className="ml-2 text-gray-600">{rocket.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <span className="ml-2 text-gray-600">{rocket.type}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Company:</span>
                <span className="ml-2 text-gray-600">{rocket.company}</span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Rocket information not available</div>
          )}
        </div>
      </div>

      {/* Mission Description */}
      {launch.details && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Mission Details</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{launch.details}</p>
        </div>
      )}

      {/* Links */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Links</h4>
        <div className="flex flex-wrap gap-4">
          {launch.links?.wikipedia && (
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 00-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Wikipedia
            </a>
          )}
          {launch.links?.webcast && (
            <a
              href={launch.links.webcast}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Webcast
            </a>
          )}
          {launch.links?.article && (
            <a
              href={launch.links.article}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Article
            </a>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  )
}
