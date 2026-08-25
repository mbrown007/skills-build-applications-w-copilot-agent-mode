import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    fetchCollection(activitiesEndpoint, 'activities')
      .then((items) => {
        if (active) {
          setActivities(items)
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
    return <p className="status-text">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-text error">Activities are unavailable.</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Activity logging</p>
        <h1>Recent Activities</h1>
      </div>
      <div className="data-grid">
        {activities.map((activity) => (
          <article className="data-card" key={activity._id ?? `${activity.username}-${activity.type}`}>
            <h2>{activity.type}</h2>
            <p>{activity.username}</p>
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>{activity.durationMinutes} min</dd>
              </div>
              <div>
                <dt>Calories</dt>
                <dd>{activity.caloriesBurned}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities