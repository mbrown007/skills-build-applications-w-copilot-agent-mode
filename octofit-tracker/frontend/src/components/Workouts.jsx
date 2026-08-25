import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    fetchCollection(workoutsEndpoint, 'workouts')
      .then((items) => {
        if (active) {
          setWorkouts(items)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (active) {
          setStatus('error')
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-text">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-text error">Workouts are unavailable.</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Personalized suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea} · {workout.difficulty}</p>
            <p className="muted">{workout.durationMinutes} minutes</p>
            <div className="tag-row">
              {(workout.exercises ?? []).map((exercise) => (
                <span className="tag" key={exercise}>{exercise}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts