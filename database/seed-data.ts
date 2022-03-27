
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente Aut dolorum ut qui et. Voluptatem rerum veritatis eaque provident. Ipsam exercitationem nostrum.',
      status: 'pending',
      createdAt: Date.now() - 100000000
    },
    {
      description: 'En-progeso Vel eligendi harum rerum porro sint. Delectus tempore doloribus esse non harum nostrum consectetur nisi earum..',
      status: 'in-progress',
      createdAt: Date.now()
    },
    {
      description: 'Terminada Consectetur in facere at rerum. Debitis sequi et soluta magnam. Sunt molestias ratione nihil repellendus reiciendis recusandae porro eligendi. Non et facere.',
      status: 'finished',
      createdAt: Date.now() - 100000
    },
  ]
}