import React from 'react'
import DashboardUser from './components/DashboardUser'
import DashboardPassword from './components/DashboardPassword'
import DashboardDeleteAccount from './components/DashboardDeleteAccount'

function Dashboard() {
  return (
    <div className='max-w-2xl m-auto'>
          <DashboardUser />
          <DashboardPassword />
          <DashboardDeleteAccount />
    </div>
  )
}

export default Dashboard
