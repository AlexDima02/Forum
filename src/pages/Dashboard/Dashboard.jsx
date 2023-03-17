import React from 'react'
import DashboardUser from './components/DashboardUser'
import DashboardPassword from './components/DashboardPassword'
import DashboardDeleteAccount from './components/DashboardDeleteAccount'

function Dashboard() {
  return (
    <div>
        <DashboardUser />
        <DashboardPassword />
        <DashboardDeleteAccount />
    </div>
  )
}

export default Dashboard
