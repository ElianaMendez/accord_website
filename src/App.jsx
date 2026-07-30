import './App.css'
import Hero from './components/Hero'
import HiddenProblem from './components/HiddenProblem'
import HiddenCost from './components/HiddenCost'
import TheShift from './components/TheShift'
import AccordSystem from './components/AccordSystem'
import Transformation from './components/Transformation'
import WhyAccord from './components/WhyAccord'
import ExecutiveInsights from './components/ExecutiveInsights'
import AssessmentCTA from './components/AssessmentCTA'

function App() {
  return (
    <div className="app-layout">
      {/* V1.0 Pure Structure - No lighting effects, no glow */}
      <div className="blueprint-layer"></div>

      <main>
        <Hero />
        <HiddenProblem />
        <HiddenCost />
        <TheShift />
        <AccordSystem />
        <Transformation />
        <WhyAccord />
        <ExecutiveInsights />
        <AssessmentCTA />
      </main>
    </div>
  )
}

export default App
