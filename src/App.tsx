import Footer from "./components/Layouts/Footer/Footer"
import Header from "./components/Layouts/Header/Header"

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, padding: '2rem' }}>
        <h2>Welcome to the Homepage</h2>
        {/* Your content */}
      </main>
      <Footer />
    </div>
  )
}

export default App
