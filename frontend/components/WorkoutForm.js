import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [name, setname] = useState('')
  const [count, setcount] = useState('')
  const [phone, setphone] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {name, count, phone}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setname('')
      setcount('')
      setphone('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', paycount: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Record</h3>

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setname(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Ice Pack Count:</label>
      <input 
        type="number"
        onChange={(e) => setcount(e.target.value)}
        value={count}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label>Phone:</label>
      <input 
        type="number"
        onChange={(e) => setphone(e.target.value)}
        value={phone}
        className={emptyFields.includes('count') ? 'error' : ''}
      />

      <button>Add Record</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm