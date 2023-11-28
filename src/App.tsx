import '@/App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { FormProvider } from './context/formContext'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Register from '@/components/Register'
import { Toaster } from '@/components/ui/toaster'
function App() {

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <FormProvider>
        <div className='min-h-screen flex flex-col  items-center pt-10'>
          <ModeToggle  className="fixed top-6 right-6"/>
          <Register />
          <Toaster />
        </div>
      </FormProvider>

    </ThemeProvider>
  )
}

export default App
