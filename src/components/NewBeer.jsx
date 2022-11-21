import { useState } from 'react'

const NewBeer = ({ fetchBeers }) => {
  const [name, setName] = useState('')
  const [alcohol, setAlcohol] = useState(5)

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await fetch('http://localhost:5005/api/beers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, alcohol }),
    })
    setName('')
    setAlcohol(5)
    fetchBeers()
  }

  return (
    <>
      <h2>Add a new beer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name :
          <input value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label>
          Alcohol :
          <input value={alcohol} onChange={event => setAlcohol(event.target.value)} type='number' />
        </label>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default NewBeer
