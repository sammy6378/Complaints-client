type StatCardProps = {
  title: string
  value: number | string
  icon?: React.ReactNode
  color?: string
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-5 bg-white flex items-center gap-4 border-l-4 ${color}`}
    >
      {icon && <div className="text-3xl">{icon}</div>}
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}
