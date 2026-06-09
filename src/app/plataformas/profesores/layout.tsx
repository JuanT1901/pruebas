import TeacherSidebar from 'app/components/TeacherSidebar'
import sidebarStyles from 'app/styles/components/PlatformSidebar.module.scss'

export default function ProfesorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <TeacherSidebar />
      <div className={sidebarStyles.contentArea}>
        {children}
      </div>
    </div>
  )
}
