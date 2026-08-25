import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    fetchCollection('teams', 'teams')
      .then((items) => {
        if (active) {
          setTeams(items)
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
    return <p className="status-text">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-text error">Teams are unavailable.</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Team management</p>
        <h1>Teams</h1>
      </div>
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.city}</p>
            <p className="muted">Mascot: {team.mascot}</p>
            <div className="tag-row">
              {(team.memberUsernames ?? []).map((member) => (
                <span className="tag" key={member}>{member}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams