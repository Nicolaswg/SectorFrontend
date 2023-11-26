import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/ui/mode-toggle'
import Register from './components/Register'
function App() {

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        
      <div className='min-h-screen flex flex-col  items-center pt-10'>
        <ModeToggle  className="fixed top-6 right-6"/>
        <Register />
      </div>

    </ThemeProvider>
  )
}

export default App
