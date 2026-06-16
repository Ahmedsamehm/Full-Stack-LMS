import { Download, FileText } from 'lucide-react'

import { SettingsTableSkeleton } from '#/components/loading-skeleton'
import { EmptyState } from '#/components/empty-state'
import { Pagination } from '#/components/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'

import type { BillingInvoice } from '../_types/settings.types'

interface SettingsBillingFormProps {
  invoices?: BillingInvoice[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const statusStyles: Record<string, { container: string; dot: string; label: string }> = {
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

export default function SettingsBillingForm({ invoices, isLoading, currentPage, totalPages, onPageChange }: SettingsBillingFormProps) {
  if (isLoading) return <SettingsTableSkeleton />

  if (!invoices || invoices.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
          <h3 className="text-lg font-semibold text-on-surface mb-1">Billing History</h3>
          <p className="text-sm text-on-surface-variant">View and download your past invoices and payment records.</p>
        </div>
        <EmptyState title="No billing history" message="You haven't made any payments yet." />
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 md:p-8 border-b border-outline-variant bg-surface-bright">
        <h3 className="text-lg font-semibold text-on-surface mb-1">Billing History</h3>
        <p className="text-sm text-on-surface-variant">View and download your past invoices and payment records.</p>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col divide-y divide-outline-variant">
        {invoices.map((inv) => {
          const style = statusStyles[inv.status]
          return (
            <div key={inv.id} className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-on-surface-variant" />
                  <span className="text-sm font-semibold text-on-surface">{inv.id.slice(0, 8)}...</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.container} ${style.label}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </span>
              </div>

              <div className="text-sm text-on-surface-variant">
                <p className="text-sm text-on-surface font-medium mb-1">{inv.description}</p>
                <div className="flex justify-between text-xs mt-2">
                  <span>Date: {new Date(inv.date).toLocaleDateString()}</span>
                  <span className="font-bold text-on-surface">${inv.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:text-primary border border-outline-variant rounded-lg transition-colors bg-surface-container-lowest">
                  <Download className="size-3.5" />
                  Download Receipt
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-surface-container-low border-b border-outline-variant">
            <TableRow className="hover:bg-transparent ">
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Invoice</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Date</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Course</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Amount</TableHead>
              <TableHead className="py-3 px-6 text-xs font-semibold text-on-surface-variant uppercase tracking-wider h-11">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant">
            {invoices.map((inv) => {
              const style = statusStyles[inv.status]

              return (
                <TableRow key={inv.id} className="hover:bg-surface transition-colors duration-150">
                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-on-surface-variant" />
                      <span className="text-sm font-medium text-on-surface">{inv.id.slice(0, 8)}...</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-on-surface">{new Date(inv.date).toLocaleDateString()}</TableCell>
                  <TableCell className="py-4 px-6 text-sm text-on-surface max-w-xs truncate">{inv.description}</TableCell>
                  <TableCell className="py-4 px-6 whitespace-nowrap text-sm font-medium text-on-surface">${inv.amount.toFixed(2)}</TableCell>
                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.container} ${style.label}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="p-6 border-t border-outline-variant bg-surface-container-low">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  )
}
