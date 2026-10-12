import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ContentProvider } from '@/context/ContentContext'
import { HomePage } from '@/pages/HomePage'
import { AdminAuthProvider } from '@/admin/AdminAuth'
import { AdminLayout } from '@/admin/AdminLayout'
import { LoginPage } from '@/admin/LoginPage'
import { DashboardPage } from '@/admin/DashboardPage'
import { SettingsPage } from '@/admin/SettingsPage'
import { SectionsPage } from '@/admin/SectionsPage'
import { CollectionPage } from '@/admin/CollectionPage'

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="sections" element={<SectionsPage />} />
              <Route path="destinations" element={<CollectionPage kind="destinations" />} />
              <Route path="packages" element={<CollectionPage kind="packages" />} />
              <Route path="gallery" element={<CollectionPage kind="gallery" />} />
              <Route path="faqs" element={<CollectionPage kind="faqs" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AdminAuthProvider>
      </ContentProvider>
    </BrowserRouter>
  )
}
