import type { SettingsPageData } from '../_types/settings.types'

export const settingsPageData: SettingsPageData = {
  activeTab: 'profile',
  profile: {
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.jenkins@edupro.edu',
    bio: 'Lead Instructional Designer with 10+ years of experience in higher education curriculum development. Passionate about creating accessible and engaging digital learning environments.',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIhDmqkjP6EC9BuWxsycAii8gye8upVMw8arhfa0_HkUYYfXTg-aPXkruQ52-TsrJoKqJGP_FTiDGaVOzsrVe-OF1tmgeGzW0vzjLlLLyFCmWqXP0IkOiX_BNgx4-4B5Gc3VqYP13-epsY-RjBV-ifZ2DWqyB7YEjpX63Sk8RZ9aBguazizlc88bRByy7CKuYad_UMdFmt12iUSeL9L_Vh8-hGmramaiF4e5wRJQxBkpeBh0E3BV2515C56y4PDun5IPQOnJCkH1i2',
  },
  notificationPreferences: [
    {
      id: 'course_updates',
      label: 'Course Updates',
      description: 'Get notified when courses are updated or modified',
      enabled: true,
    },
    {
      id: 'enrollment_alerts',
      label: 'Enrollment Alerts',
      description: 'Receive alerts when new students enroll in your courses',
      enabled: true,
    },
    {
      id: 'system_notifications',
      label: 'System Notifications',
      description: 'Important platform announcements and maintenance updates',
      enabled: true,
    },
    {
      id: 'payment_reminders',
      label: 'Payment Reminders',
      description: 'Reminders about upcoming and overdue payments',
      enabled: false,
    },
    {
      id: 'marketing_emails',
      label: 'Marketing Emails',
      description: 'Product updates, tips, and promotional content',
      enabled: false,
    },
  ],
  billingHistory: [
    {
      id: 'INV-2024-0123',
      date: 'Jun 1, 2024',
      description: 'EduPro Enterprise Plan - Monthly Subscription',
      amount: 299.0,
      status: 'paid',
    },
    {
      id: 'INV-2024-0112',
      date: 'May 1, 2024',
      description: 'EduPro Enterprise Plan - Monthly Subscription',
      amount: 299.0,
      status: 'paid',
    },
    {
      id: 'INV-2024-0098',
      date: 'Apr 1, 2024',
      description: 'EduPro Enterprise Plan - Monthly Subscription',
      amount: 299.0,
      status: 'paid',
    },
    {
      id: 'INV-2024-0085',
      date: 'Mar 1, 2024',
      description: 'EduPro Enterprise Plan - Monthly Subscription',
      amount: 299.0,
      status: 'paid',
    },
    {
      id: 'INV-2024-0070',
      date: 'Feb 1, 2024',
      description: 'EduPro Enterprise Plan - Monthly Subscription',
      amount: 299.0,
      status: 'pending',
    },
    {
      id: 'INV-2024-0056',
      date: 'Dec 15, 2023',
      description: 'Additional Storage - 50GB',
      amount: 49.99,
      status: 'paid',
    },
    {
      id: 'INV-2024-0042',
      date: 'Dec 1, 2023',
      description: 'EduPro Enterprise Plan - Monthly Subscription',
      amount: 299.0,
      status: 'failed',
    },
  ],
}
