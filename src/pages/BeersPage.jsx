import { useContext, useEffect, useState } from 'react'
import Beer from '../components/Beer'
import NewBeer from '../components/NewBeer'
import { SessionContext } from '../contexts/SessionContext'

const BeersPage = () => {
  const { token, fetchWithToken } = useContext(SessionContext)

  const [beers, setBeers] = useState([{}, {}, {}])
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Function to fetch our beers from our API (backend)
   */
  const fetchBeers = fetchWithToken('GET', 'api/beers', setBeers)

  /**
   * Fetch our beers at mounting time
   */
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
    fetchBeers()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Delete one beer
   */
  const deleteBeer = async beerId => {
    // Delete a beer and await for the deletion (you SHOULD have a try/catch there)
    await fetch(`${process.env.REACT_APP_API_URL}api/beers/${beerId}`, {
      method: 'DELETE',
    })
    // Fetch the beers once the beer was properly deleted
    fetchBeers()
  }

  return (
    <div>
      <h1>My beers</h1>
      {token}
      <NewBeer fetchBeers={fetchBeers} />
      {beers.map(beer => (
        <Beer
          key={beer._id}
          beer={beer}
          deleteBeer={deleteBeer}
          fetchBeers={fetchBeers}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}

export default BeersPage
