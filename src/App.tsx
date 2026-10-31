import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import ForgotPassword from '@/pages/ForgotPassword'
import Dashboard from '@/pages/Dashboard'
import Lessons from '@/pages/Lessons'
import LessonOne from '@/pages/lessons/LessonOne'
import LessonTwo from '@/pages/lessons/LessonTwo'
import LessonThree from '@/pages/lessons/LessonThree'
import LessonFour from '@/pages/lessons/LessonFour'
import LessonFive from '@/pages/lessons/LessonFive'
import Practice from '@/pages/Practice'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="lessons/1" element={<LessonOne />} />
          <Route path="lessons/2" element={<LessonTwo />} />
          <Route path="lessons/3" element={<LessonThree />} />
          <Route path="lessons/4" element={<LessonFour />} />
          <Route path="lessons/5" element={<LessonFive />} />
          <Route path="practice" element={<Practice />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
