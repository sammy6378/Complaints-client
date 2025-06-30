import type { TAudit } from "@/types/auditLogs"
import { useCreate, useDelete, useGetList, useGetOne, useUpdate } from "./UseGenericHook"



const base = 'audit-logs'

// get all
export const useGetAuditLogs = () =>
  useGetList<TAudit>('audit-logs', base)

// get by id
export const useGetAuditLog = (id: string) =>
  useGetOne<TAudit>('audit-log', `${base}/${id}`, !!id)

// create audit log
export const useCreateAuditLog = () =>
  useCreate('audit-logs', base)

// update audit log
export const useUpdateAuditLog = () =>
  useUpdate('audit-logs', (id) => `${base}/${id}`)

// delete audit log
export const useDeleteAuditLog = () =>
  useDelete('audit-logs', (id) => `${base}/${id}`)

// get recent logs
export const useGetRecentAuditLogs = () => {
  const { data: logs } = useGetAuditLogs()
  const recentLogs = logs?.data?.slice(0, 5) || []
  return { data: recentLogs }
}

// audit logs for a specific user
export const useGetUserAuditLogs = (userId: string) => {
  const { data: logs } = useGetAuditLogs()
  const userLogs = logs?.data?.filter((log:TAudit) => log.user_id === userId) || []
  return { data: userLogs }
}

// audit logs metrics
export const useAuditLogsMetrics = () => {

    // total
    const { data: logs } = useGetAuditLogs()
    const logsData = logs?.data || []
}