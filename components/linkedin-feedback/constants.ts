import { LinkedinFeedback } from '@/lib/types';

export const LINKEDIN_FEEDBACK_LIST: LinkedinFeedback[] = [
  {
    author: {
      name: 'Roman Kolisnyk ',
      position: 'Frontend UI Lead',
      avatar: '/static/images/about/kolisnyk.jpeg',
      linkedinLink: 'https://www.linkedin.com/in/ramapitek/',
      company: {
        name: 'AirSlate',
        url: 'https://www.airslate.com/',
      },
    },
    postDate: 'May 7, 2021',
    text: 'Sergey rocks!!! He is very talented person, he is a goddamn robot and knows EVERYTHING, studies hard, always tries to help others and be better in all senses, does his job perfectly and never gives up.',
  },
  {
    author: {
      name: 'Oleksandr Holovchenko',
      avatar: '/static/images/about/holovchenko.jpeg',
      position: 'Software Engineer',
      linkedinLink: 'https://www.linkedin.com/in/algolj/',
      company: {
        name: 'MacPaw',
        url: 'https://macpaw.com/',
      },
    },
    text: "I had the pleasure of working with Serhii, and I can confidently say he is one of the most talented and dedicated frontend developers I've collaborated with. Serhii has an exceptional ability to combine technical expertise with creativity, delivering clean, efficient, and visually impressive solutions.",
    postDate: 'February 20, 2025',
  },
  {
    author: {
      name: 'Anton Slesariev',
      position: 'Senior Frontend Engineer',
      avatar: '/static/images/about/slesariev.jpeg',
      linkedinLink: 'https://www.linkedin.com/in/sonarct/',
      company: {
        name: 'Readdle',
        url: 'https://readdle.com/',
      },
    },
    postDate: 'October 8, 2023',
    text: "I cannot emphasize enough what an outstanding professional Serhii is. His dedication to his work is truly remarkable, and it is evident in the quality of his contributions. Serhii's commitment to continuous learning and his willingness to explore new technologies and techniques make him a standout in our field. He possesses an abundance of energy and consistently strives for excellence in everything he does.",
  },
];
