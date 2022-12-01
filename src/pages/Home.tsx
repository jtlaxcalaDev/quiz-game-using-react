import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import '../styles/home.css'

const Home: FunctionComponent = () => {
  return (
    <>
      <h2 className="title">Quizzical</h2>
      <p className="description">Some description if needed</p>
      <Link className="cta-start-quiz" to="/quiz">Start quiz</Link>
    </>
  )
}

export default Home