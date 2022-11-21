import { useEffect, useState } from 'react'
import Beer from './components/Beer'
import NewBeer from './components/NewBeer'

function App() {
  const [beers, setBeers] = useState([{}, {}, {}])
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Function to fetch our beers from our API (backend)
   */
  const fetchBeers = async () => {
    const response = await fetch('http://localhost:5005/api/beers')
    const beers = await response.json()

    setBeers(beers)
  }

  /**
   * Fetch our beers at mounting time
   */
  useEffect(() => {
    fetchBeers()
    setIsLoading(false)
  }, [])

  /**
   * Delete one beer
   */
  const deleteBeer = async beerId => {
    // Delete a beer and await for the deletion (you SHOULD have a try/catch there)
    await fetch(`http://localhost:5005/api/beers/${beerId}`, {
      method: 'DELETE',
    })
    // Fetch the beers once the beer was properly deleted
    fetchBeers()
  }

  return (
    <div className='App'>
      <h1>My beers</h1>
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

export default App
