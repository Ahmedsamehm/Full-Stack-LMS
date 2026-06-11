import type { DashboardCourse } from '../_types/dashboard-courses.types'

export const teacherCourses: DashboardCourse[] = [
  {
    id: '1',
    title: 'Advanced Cellular Biology & Genetics',
    category: 'Science',
    instructorName: 'Dr. Sarah Jenkins',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP9a5W7KRyEAv6Un4SdLucgNWuu8pWZKm8fgczFWUk-6a0Kn4J3BEwRZUyr4lSF-x-e2VvyRerBZGl4uBZ6AL3M4jjYuPl7ab3wMasQ8Oq4sj61GwnwMAKazsi3RWLXL7avHoFPEokIey7qH_B4n8vn5BeFF5pVGa4nxg_Zler8aMEn29eDk9d0ixr0L1GYQC8tiYuGXAgTtY2gtRpII_NZCV_RrT30w0O5T9MkGKaXEythGeatRN7O3xIMqz9iXpozo1PxUg6TNbb',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7lma5u7n3BUe6rW4tPxvm5vNpPHvlXlCtH8ui4B6k3VfjmPe3OudbYrTppfbLjXaBrQXcEqXpVLWXIyXtFeVn_ItKvaOfH-Bw-IKMXaVvIUFp3Kv5CNSmQcLszIeP0cY2vseOMxrdB1hhL6a4my7ejKtX3wAWaUd47veJ0dStNoZhlXiPLXD5Yafew8yXIQ0ZmP1qkGSbD_xtGrqWHQ-A82pT4E7YyhPGs7pn5l1kd4hAuWG3X6dMTPesyUNE1OEoAHfVX3PXWwjJ',
    enrolledCount: 142,
  },
  {
    id: '2',
    title: 'Full-Stack Web Development Bootcamp',
    category: 'Technology',
    instructorName: 'Prof. Marcus Cole',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBt6n-6rBj1I5tH8D8qhVpaUUvug6_D_4dK_GZAY8z-lhCSbkfOBlMTpHYWjv8k3ogu8-ez3_fI9fBjDcvGRBMJo7hFkzhe-iiL6I1jd_pV4rs3PhFY0pQZvdsUewqrMN1gozD4IptL2hCrrOvbmzFgKLd7vcF2f69IRmZQwDiEFQXavKxAmvv96fWqv40DKmzzboYdCRKrxcyNkyB2r-YNcKwT5Cy85mOh0Fqd3Q65uwa-EM6R-MLe_RC93Bn8aI2aNFoygv6AY9zk',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuDN5_N_fWMM6zufmtMqYNpXQvlI_e1OuF8i2R1pAgWGPzvpdVnttmv5h_BqxdKkRCKUF6ILZWOTk54HNlt1rH0JgxH6gt82CkRwHKp2c3WmKO7-kIoyBrIDZY_PJCUopExQtJC867n0kcy5MwIIhqcA2sJqCyY67-PBX6NwPoFWXnHU3d0lIz9mSf2CP7xrFgGd997DSgVwAbltoa5L1nZvAu38sxfhukIPaPWv_0mQ23mqTvzUJ7bEg40tyGy87ZqsbeNGRX9k48',
    enrolledCount: 320,
  },
  {
    id: '3',
    title: 'Conversational Spanish for Business',
    category: 'Languages',
    instructorName: 'Elena Rodriguez',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdos_WDaoIj1rBtc8xldcA9Rc9D3x5kXC7rZx3C2WqJVDUOPc2cT3OHfZTBRAU_41D2VwQNgxg2qOZ-BFt59tuXv5U9qmzsJwfR6W0gEUJkzVq6JjOQu2llAvdDlGVlfHJWMTDRXnWZ-AB69MiCyHETtsyriA1MgXxeKFgHrOu3EItHR7pXriSJrbeuaj5DZeHcf1WR-v8RV4UGKYECWKBAsknrq56_gFfds85lVm7PGztKG3clR-8X7oV5fKUbAXAOdgfLRew_mud',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7pQqus1slr-vU_HqklP2NJmtGrRffvmoB39h1--fSWlZOZVNEaI3hvjQry2IO8QiBgdUPE8MsNU9iYzhZ-O_DP-_Y1uQc7xdmQYd_hVfO3-T7SxsdY2VaFqbDZi0fYI4vo2yw7YZmNF8usjN6UvuMOHAsRuUG_W_NvWov5Y2xpBu9CbfeeTpygosqXv_E9oEVqw9zdi_oIu_UsBqvvcO7RrCeeAva71WeaRQkbw9Smec1deDtvmAGLU5Ns9tfKLui_HkQKADhMnM0',
    enrolledCount: 85,
  },
]

export const adminCourses: DashboardCourse[] = [
  ...teacherCourses,
  {
    id: '4',
    title: 'Introduction to Machine Learning',
    category: 'Technology',
    instructorName: 'Dr. Alan Turing',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP9a5W7KRyEAv6Un4SdLucgNWuu8pWZKm8fgczFWUk-6a0Kn4J3BEwRZUyr4lSF-x-e2VvyRerBZGl4uBZ6AL3M4jjYuPl7ab3wMasQ8Oq4sj61GwnwMAKazsi3RWLXL7avHoFPEokIey7qH_B4n8vn5BeFF5pVGa4nxg_Zler8aMEn29eDk9d0ixr0L1GYQC8tiYuGXAgTtY2gtRpII_NZCV_RrT30w0O5T9MkGKaXEythGeatRN7O3xIMqz9iXpozo1PxUg6TNbb',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGn_2tasgSUbtMA70Ob7xTLKO-truvcR1FpgKmzdHPty8HS3IvItJQ8yqYX0ArjGlOV6nFekLB_RED3wh1Jh836eDM9SPQ_RiNxmVRl1ZVXfyrsUC_pZnRqRxEJQbYLFPGAbmOuqpMcR_ZOTk7kxIoOxRwdPFNs_QuYXAToUPS4sI4DgAaST028KgGj5IKQdADs5NeAxGE_9u8MgL02wvxi_f_mjgUDrLNEr3dzLOdPu9URfIBc9wTh_L_1BCdOXzd7879zt4ow7z',
    enrolledCount: 520,
  },
  {
    id: '5',
    title: 'Digital Marketing Strategy',
    category: 'Business',
    instructorName: 'Priya Sharma',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBt6n-6rBj1I5tH8D8qhVpaUUvug6_D_4dK_GZAY8z-lhCSbkfOBlMTpHYWjv8k3ogu8-ez3_fI9fBjDcvGRBMJo7hFkzhe-iiL6I1jd_pV4rs3PhFY0pQZvdsUewqrMN1gozD4IptL2hCrrOvbmzFgKLd7vcF2f69IRmZQwDiEFQXavKxAmvv96fWqv40DKmzzboYdCRKrxcyNkyB2r-YNcKwT5Cy85mOh0Fqd3Q65uwa-EM6R-MLe_RC93Bn8aI2aNFoygv6AY9zk',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaCpqKmL7BhNHkQ5ORCd3bjdOIsQH8mt73ST4HlxTZStzsFkF2fpTGdKBdl1CNoWLWiU8yYbIojbelOoxfi5jthPh3VikBs0ZPgFnmKdstBRdoFEKf_oKN9BOurasxD6x7BJl7ia6SsuXeIJmDL7jWHCigNduR5H5myHz4Gaa87zQB0pFZfWjeXYhcTeTcJW6KhM7g8E63PG1kt2AgFcl_ey-7EhL042Lu5Dx9INkXbHGdimMe3kq-lwgOs5ba0K_VbVoXt28EeOHs',
    enrolledCount: 210,
  },
]

export const studentCourses: DashboardCourse[] = [
  {
    id: '2',
    title: 'Full-Stack Web Development Bootcamp',
    category: 'Technology',
    instructorName: 'Prof. Marcus Cole',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBt6n-6rBj1I5tH8D8qhVpaUUvug6_D_4dK_GZAY8z-lhCSbkfOBlMTpHYWjv8k3ogu8-ez3_fI9fBjDcvGRBMJo7hFkzhe-iiL6I1jd_pV4rs3PhFY0pQZvdsUewqrMN1gozD4IptL2hCrrOvbmzFgKLd7vcF2f69IRmZQwDiEFQXavKxAmvv96fWqv40DKmzzboYdCRKrxcyNkyB2r-YNcKwT5Cy85mOh0Fqd3Q65uwa-EM6R-MLe_RC93Bn8aI2aNFoygv6AY9zk',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuDN5_N_fWMM6zufmtMqYNpXQvlI_e1OuF8i2R1pAgWGPzvpdVnttmv5h_BqxdKkRCKUF6ILZWOTk54HNlt1rH0JgxH6gt82CkRwHKp2c3WmKO7-kIoyBrIDZY_PJCUopExQtJC867n0kcy5MwIIhqcA2sJqCyY67-PBX6NwPoFWXnHU3d0lIz9mSf2CP7xrFgGd997DSgVwAbltoa5L1nZvAu38sxfhukIPaPWv_0mQ23mqTvzUJ7bEg40tyGy87ZqsbeNGRX9k48',
    enrolledCount: 320,
  },
  {
    id: '3',
    title: 'Conversational Spanish for Business',
    category: 'Languages',
    instructorName: 'Elena Rodriguez',
    instructorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdos_WDaoIj1rBtc8xldcA9Rc9D3x5kXC7rZx3C2WqJVDUOPc2cT3OHfZTBRAU_41D2VwQNgxg2qOZ-BFt59tuXv5U9qmzsJwfR6W0gEUJkzVq6JjOQu2llAvdDlGVlfHJWMTDRXnWZ-AB69MiCyHETtsyriA1MgXxeKFgHrOu3EItHR7pXriSJrbeuaj5DZeHcf1WR-v8RV4UGKYECWKBAsknrq56_gFfds85lVm7PGztKG3clR-8X7oV5fKUbAXAOdgfLRew_mud',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7pQqus1slr-vU_HqklP2NJmtGrRffvmoB39h1--fSWlZOZVNEaI3hvjQry2IO8QiBgdUPE8MsNU9iYzhZ-O_DP-_Y1uQc7xdmQYd_hVfO3-T7SxsdY2VaFqbDZi0fYI4vo2yw7YZmNF8usjN6UvuMOHAsRuUG_W_NvWov5Y2xpBu9CbfeeTpygosqXv_E9oEVqw9zdi_oIu_UsBqvvcO7RrCeeAva71WeaRQkbw9Smec1deDtvmAGLU5Ns9tfKLui_HkQKADhMnM0',
    enrolledCount: 85,
  },
]
