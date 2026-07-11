import { useEffect, useState } from 'react'
import './App.css'

type Activity = 'Wandering' | 'Eating' | 'Playing'

const clamp = (value: number) => Math.max(0, Math.min(100, value))

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <div className="stat-label"><span>{label}</span><b>{value}</b></div>
      <div className="meter" aria-label={`${label}: ${value} out of 100`}>
        <i style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function App() {
  const [hunger, setHunger] = useState(68)
  const [joy, setJoy] = useState(83)
  const [activity, setActivity] = useState<Activity>('Wandering')
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => current + 1)
      setHunger((current) => clamp(current - 1))
      setJoy((current) => clamp(current - (Math.random() > 0.7 ? 1 : 0)))
    }, 3500)
    return () => window.clearInterval(timer)
  }, [])

  const careFor = (next: Exclude<Activity, 'Wandering'>) => {
    setActivity(next)
    if (next === 'Eating') setHunger((current) => clamp(current + 20))
    if (next === 'Playing') setJoy((current) => clamp(current + 16))
    window.setTimeout(() => setActivity('Wandering'), 1300)
  }

  const isPig = hunger + joy > 145

  return (
    <main className="game-shell">
      <header>
        <p className="brand">TAMA<span>COCHI</span></p>
        <p className="day">DAY 03 · 10:24 AM</p>
      </header>

      <section className="screen" aria-label="Pet play area">
        <div className="screen-top">
          <span className="name">PIP</span>
          <span className="activity">{activity}</span>
        </div>
        <div className={`meadow step-${step % 4}`}>
          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
          <div className="sun" />
          <div className="grass grass-one" />
          <div className="grass grass-two" />
          <div className="grass grass-three" />
          <div className={`pig ${isPig ? 'grown' : ''}`} role="img" aria-label={isPig ? 'A happy pig named Pip' : 'A happy piglet named Pip'}>
            <span className="ear left" /><span className="ear right" />
            <span className="face"><i className="eye left" /><i className="eye right" /><i className="snout" /></span>
            <span className="body"><i className="spot" /><i className="leg left" /><i className="leg right" /></span>
            <span className="tail" />
          </div>
          {activity === 'Eating' && <span className="food" aria-hidden="true">♥</span>}
          {activity === 'Playing' && <span className="ball" aria-hidden="true" />}
        </div>
        <div className="screen-bottom"><span>♥ {joy}</span><span>● {hunger}</span></div>
      </section>

      <section className="status" aria-label="Pip's status">
        <Stat label="FULLNESS" value={hunger} />
        <Stat label="HAPPINESS" value={joy} />
      </section>

      <nav className="controls" aria-label="Care controls">
        <button type="button" onClick={() => careFor('Eating')}><span className="button-icon">♣</span>FEED</button>
        <button type="button" onClick={() => careFor('Playing')}><span className="button-icon">★</span>PLAY</button>
      </nav>
      <p className="hint">Pip wanders around when left alone.</p>
    </main>
  )
}

export default App
