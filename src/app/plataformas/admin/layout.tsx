import { createClient } from 'app/utils/supabase/server'
import { redirect } from 'next/navigation'
import styles from 'app/styles/pages/Dashboard.module.scss'
import AdminSidebar from 'app/components/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/plataformas/estudiantes/dashboard')
  }

  return (
    <div className={styles.dashboardContainer}>
      
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px', width: 'calc(100% - 260px)', overflowY: 'auto' }}>
        {children}
      </div>
      
    </div>
  )
}