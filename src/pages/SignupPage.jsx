import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useState } from 'react'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const parsed = await response.json()
    console.log(parsed)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='Username'
        variant='filled'
        size='md'
        withAsterisk
        value={username}
        onChange={event => setUsername(event.target.value)}
        required
      />
      <PasswordInput
        label='Password'
        variant='filled'
        size='md'
        withAsterisk
        value={password}
        onChange={event => setPassword(event.target.value)}
        required
      />
      <Button type='submit' variant='light' color='cyan' size='md' uppercase>
        Register
      </Button>
    </form>
  )
}

export default SignupPage
