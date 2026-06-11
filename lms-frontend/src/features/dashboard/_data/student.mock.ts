import type { StudentDashboardData } from '../_types/student.types'

export const studentDashboardData: StudentDashboardData = {
  continueLearning: {
    id: '1',
    title: 'Advanced React Patterns',
    description:
      'Master modern React architecture, hooks, and performance optimization techniques for large-scale applications.',
    category: 'Web Development',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDrjUkLdzkwgwPwKX2rs8VmZapRQ7Uh-tYu1TLei61BKsNXWm0Awv228uOlfc2XYeR_scSK020_XI4gi4mT40OgJqEhi8jipqE1GLSKCzgdrG496DzTbehSR2SU5uKN15WZlGC2cB8HzDz5ucnUuaFC3fVlTcYX_1ACO6IJqLxJpRUl3J46dYM9lx0c_gOWKYzBTLvyDj637DMIgrIJKHKcleGU1-G0Ngz4HICodM2PVSH93SvlonToVs8IiUgW1Pj0Y2eT7F3D0PF',
    currentModule: 4,
    totalModules: 12,
    progress: 35,
  },
  courses: [
    {
      id: '1',
      title: 'UI/UX Design Systems',
      instructor: 'Sarah Chen',
      icon: 'design_services',
      iconBg: 'bg-secondary-container',
      iconColor: 'text-on-secondary-container',
      progress: 80,
    },
    {
      id: '2',
      title: 'Data Structures',
      instructor: 'Marcus Ray',
      icon: 'data_object',
      iconBg: 'bg-tertiary-container',
      iconColor: 'text-on-tertiary-container',
      progress: 15,
    },
    {
      id: '3',
      title: 'Cloud Computing Intro',
      instructor: 'Elena Rostova',
      icon: 'cloud',
      iconBg: 'bg-surface-tint/20',
      iconColor: 'text-surface-tint',
      progress: 0,
    },
  ],
  recommended: [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description:
        'Understand the basics of neural networks and predictive modeling.',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGn_2tasgSUbtMA70Ob7xTLKO-truvcR1FpgKmzdHPty8HS3IvItJQ8yqYX0ArjGlOV6nFekLB_RED3wh1Jh836eDM9SPQ_RiNxmVRl1ZVXfyrsUC_pZnRqRxEJQbYLFPGAbmOuqpMcR_ZOTk7kxIoOxRwdPFNs_QuYXAToUPS4sI4DgAaST028KgGj5IKQdADs5NeAxGE_9u8MgL02wvxi_f_mjgUDrLNEr3dzLOdPu9URfIBc9wTh_L_1BCdOXzd7879zt4ow7z',
      tags: ['New', 'Tech'],
      type: 'large',
    },
    {
      id: '2',
      title: 'Digital Marketing Analytics',
      description: '',
      thumbnail:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAaCpqKmL7BhNHkQ5ORCd3bjdOIsQH8mt73ST4HlxTZStzsFkF2fpTGdKBdl1CNoWLWiU8yYbIojbelOoxfi5jthPh3VikBs0ZPgFnmKdstBRdoFEKf_oKN9BOurasxD6x7BJl7ia6SsuXeIJmDL7jWHCigNduR5H5myHz4Gaa87zQB0pFZfWjeXYhcTeTcJW6KhM7g8E63PG1kt2AgFcl_ey-7EhL042Lu5Dx9INkXbHGdimMe3kq-lwgOs5ba0K_VbVoXt28EeOHs',
      rating: 4.8,
      reviews: '1.2k reviews',
      level: 'Beginner Friendly',
      type: 'small',
    },
  ],
}
