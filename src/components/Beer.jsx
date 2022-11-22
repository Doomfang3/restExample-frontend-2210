import {
  ActionIcon,
  Autocomplete,
  Button,
  Card,
  createStyles,
  Modal,
  Skeleton,
  Text,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

const useStyles = createStyles(theme => ({
  container: {
    margin: '2rem',
    padding: '20px',
    '&:hover': {
      //  background: 'red',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      '&:hover': {
        // background: 'blue',
      },
    },
  },
}))

const Beer = ({ beer, deleteBeer, fetchBeers, isLoading }) => {
  const { classes } = useStyles()

  const { count, handleCount } = useContext(AppContext)

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(beer.name)
  const [alcohol, setAlcohol] = useState(beer.alcohol)

  const handleSubmit = async event => {
    event.preventDefault()

    await fetch(`http://localhost:5005/api/beers/${beer._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, alcohol }),
    })
    fetchBeers()
    setIsEditing(false)
  }

  return (
    <>
      <Skeleton visible={isLoading}>
        <Card shadow='sm' p='lg' radius='md' withBorder className={classes.container}>
          <Text fz='lg'>{beer.name}</Text>
          <Text>{beer.alcohol}</Text>
          <Button
            color='grape'
            radius='xl'
            size='xs'
            compact
            uppercase
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <ActionIcon
            color='red'
            size='lg'
            radius='xs'
            variant='light'
            onClick={() => deleteBeer(beer._id)}
          >
            <IconTrash size={26} />
          </ActionIcon>
        </Card>
      </Skeleton>
      <Autocomplete
        label='Your favorite framework/library'
        placeholder='Pick one'
        data={['React', 'Angular', 'Svelte', 'Vue']}
      />
      <Modal opened={isEditing} onClose={() => setIsEditing(false)} title='Change this beer'>
        <h2>{count}</h2>
        <button type='button' onClick={() => handleCount(count + 1)}>
          +
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Name :
            <input value={name} onChange={event => setName(event.target.value)} />
          </label>
          <label>
            Alcohol :
            <input
              value={alcohol}
              onChange={event => setAlcohol(event.target.value)}
              type='number'
            />
          </label>
          <button type='submit'>Update</button>
        </form>
      </Modal>
    </>
  )
}

export default Beer
