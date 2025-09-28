const API_BASE_URL = 'https://api.spacexdata.com/v4'

export class SpaceXApi {
  static async fetchLaunches() {
    try {
      const response = await fetch(`${API_BASE_URL}/launches`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching launches:', error)
      throw new Error('Failed to fetch launches. Please try again later.')
    }
  }

  static async fetchLaunchById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/launches/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching launch:', error)
      throw new Error('Failed to fetch launch details. Please try again later.')
    }
  }

  static async fetchRocket(rocketId) {
    try {
      const response = await fetch(`${API_BASE_URL}/rockets/${rocketId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching rocket:', error)
      throw new Error('Failed to fetch rocket details.')
    }
  }
}
