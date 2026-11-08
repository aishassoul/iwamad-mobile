export type CampusEvent = {
    id: number
    title: string
    date: string
    place: string
    seats: number
  }
  
  export const events: CampusEvent[] = [
    {
      id: 1,
      title: 'React Study Night',
      date: '2026-10-28',
      place: 'Room 302',
      seats: 20,
    },
    {
      id: 2,
      title: 'Student Career Meetup',
      date: '2026-10-30',
      place: 'Main Hall',
      seats: 3,
    },
    {
      id: 3,
      title: 'Web Design Workshop',
      date: '2026-11-02',
      place: 'Lab 204',
      seats: 15,
    },
    {
      id: 4,
      title: 'Data Analytics Talk',
      date: '2026-11-05',
      place: 'Room 105',
      seats: 12,
    },
  ]