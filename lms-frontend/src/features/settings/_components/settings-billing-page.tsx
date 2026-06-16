import { useState } from 'react'
import { PAGINATION } from '#/lib/constants'
import SettingsSidebar from './settings-sidebar'
import SettingsBillingForm from './settings-billing-form'
import { useGetBillingHistory } from '../_hooks/useGetBillingHistory'
import type { BillingInvoice } from '../_types/settings.types'

function mapPaymentToInvoice(payment: any): BillingInvoice {
  const statusMap: Record<string, BillingInvoice['status']> = {
    SUCCESS: 'paid',
    PENDING: 'pending',
    FAILED: 'failed',
    REFUNDED: 'failed',
  }
  return {
    id: payment.id,
    date: payment.createdAt,
    description: payment.course?.title || 'Course Purchase',
    amount: payment.amount,
    status: statusMap[payment.status],
  }
}

export default function SettingsBillingPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetBillingHistory({ page, limit: PAGINATION.DEFAULT_LIMIT })

  const invoices = data?.data?.map(mapPaymentToInvoice) || []
  const totalPages = data?.meta?.totalPages || 1

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-6 lg:py-8 max-w-[1440px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Account Settings</h1>
        <p className="text-base text-on-surface-variant mt-2">Manage your personal information, security preferences, and billing details.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <aside className="w-full md:w-64 shrink-0">
          <SettingsSidebar activeTab="billing" />
        </aside>

        <div className="flex-1 w-full">
          <SettingsBillingForm invoices={invoices} isLoading={isLoading} currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </main>
  )
}
