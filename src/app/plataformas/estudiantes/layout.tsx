import Sidebar from 'app/components/Sidebar'
import styles from 'app/styles/pages/Dashboard.module.scss'
import sidebarStyles from 'app/styles/components/PlatformSidebar.module.scss'

export default function EstudianteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={sidebarStyles.contentArea}>
        {children}
      </div>
    </div>
  )
}
