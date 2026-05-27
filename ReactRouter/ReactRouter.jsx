import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import Login from './Login.jsx'

function Info() {
  const { id } = useParams();
  return <h1>Hello, {id}!</h1>;
}

export default function ReactRouter() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> ||{" "}
        <Link to="/login">Login</Link> ||{" "}
        <Link to="/parms/100">Parms100</Link> |{" "}
        <Link to="/parms/200">Parms200</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parms/:id" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}
