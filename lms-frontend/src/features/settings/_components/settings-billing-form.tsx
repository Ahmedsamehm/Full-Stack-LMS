import { Download, FileText } from 'lucide-react'

import { SettingsTableSkeleton } from '#/components/loading-skeleton'

import type { BillingInvoice } from '../_types/settings.types'

interface SettingsBillingFormProps {
  invoices?: BillingInvoice[]
  isLoading: boolean
}

const statusStyles: Record<
  string,
  { container: string; dot: string; label: string }
> = {
  paid: {
    container: 'bg-[#ecfdf5] border-[#a7f3d0]',
    dot: 'bg-[#10b981]',
    label: 'text-[#065f46]',
  },
  pending: {
    container: 'bg-[#fffbeb] border-[#fde68a]',
    dot: 'bg-[#f59e0b]',
    label: 'text-[#92400e]',
  },
  failed: {
    container: 'bg-[#fef2f2] border-[#fecaca]',
    dot: 'bg-[#ef4444]',
    label: 'text-[#991b1b]',
  },
}

export default function SettingsBillingForm({
  invoices,
  isLoading,
}: SettingsBillingFormProps) {
  if (isLoading) return <SettingsTableSkeleton />

  if (!invoices) return null

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <h3 className="text-lg font-semibold text-on-surface mb-1">
          Billing History
        </h3>
        <p className="text-sm text-on-surface-variant">
          View and download your past invoices and payment records.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Invoice
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Description
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">
                Receipt
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {invoices.map((inv) => {
              const style = statusStyles[inv.status]
              return (
                <tr
                  key={inv.id}
                  className="hover:bg-surface transition-colors duration-150"
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-on-surface-variant" />
                      <span className="text-sm font-medium text-on-surface">
                        {inv.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-on-surface">
                    {inv.date}
                  </td>
                  <td className="py-4 px-6 text-sm text-on-surface max-w-xs truncate">
                    {inv.description}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-on-surface">
                    ${inv.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.container} ${style.label}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                      />
                      {inv.status.charAt(0).toUpperCase() +
                        inv.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <button className="p-1 text-on-surface-variant hover:text-primary transition-colors">
                      <Download className="size-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
        <p className="text-xs text-on-surface-variant">
          Showing {invoices.length} invoices
        </p>
        <button
          type="button"
          className="bg-transparent text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          View All
        </button>
      </div>
    </div>
  )
}
