import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    fetchCollection(leaderboardEndpoint, 'leaderboard')
      .then((items) => {
        if (active) {
          setLeaderboard(items)
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
    return <p className="status-text">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-text error">Leaderboard is unavailable.</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="table-wrap">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Athlete</th>
              <th scope="col">Team</th>
              <th scope="col">Points</th>
              <th scope="col">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry._id ?? entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.teamName}</td>
                <td>{entry.points}</td>
                <td>{entry.weeklyStreak} weeks</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard