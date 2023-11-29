import '@/App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { FormProvider } from '@/context/formContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Toaster } from '@/components/ui/toaster'
import Register from '@/pages/Register'
import UserProfile from '@/pages/UserProfile'
import UserProfileEdit from '@/pages/UserProfileEdit'

function App():JSX.Element {
  
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <Router>
        <FormProvider>
          <Toaster />
          <ModeToggle  className="fixed top-6 right-6"/>
          <Routes>
            <Route path='/'  element={(
              <div className='min-h-screen flex flex-col  items-center pt-10'>
                <Register />
              </div>
            )}/>
            <Route path='/profile/home' element={<UserProfile />}/>
            <Route path='/profile/edit' element={<UserProfileEdit />}/>
          </Routes>
        </FormProvider>
        </Router>
   
    </ThemeProvider>
  )
}

export default App
