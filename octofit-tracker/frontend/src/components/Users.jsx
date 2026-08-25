import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    fetchCollection('users', 'users')
      .then((items) => {
        if (active) {
          setUsers(items)
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
    return <p className="status-text">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-text error">Users are unavailable.</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
            <span className="tag">{user.role}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users