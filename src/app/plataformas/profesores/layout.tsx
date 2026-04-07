import TeacherSidebar from 'app/components/TeacherSidebar'

export default function ProfesorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <TeacherSidebar />
      <div style={{ flex: 1, marginLeft: '260px', width: 'calc(100% - 260px)' }}>
        {children}
      </div>
    </div>
  )
}