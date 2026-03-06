import Hero from '../components/Hero'
import Description from '../components/Descrition'

function Home({ darkMode = true }) {
  return (
    <div>
      <Hero darkMode={darkMode} />
      <Description darkMode={darkMode} />
    </div>
  )
}

export default Home