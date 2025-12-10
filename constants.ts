import { Lesson, QuizCategory } from './types';
import { BookOpen, Flag, Crown, Globe, Shield, Users, AlertTriangle, ScrollText, Layers } from 'lucide-react';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Pre-Colonial Rwanda: A Unified Kingdom',
    category: 'History',
    duration: '15 min',
    description: 'Discover the harmonious social structure, the role of the Mwami, and the economic systems of ancient Rwanda before 1894.',
    sections: [
      {
        id: 's1',
        title: 'Social Structure & Unity',
        content: 'Pre-colonial Rwanda was a homogenous society where Banyarwanda shared the same culture, language (Kinyarwanda), and beliefs. Social groups (Hutu, Tutsi, Twa) were fluid and based on wealth (cattle ownership) rather than race. The concept of **Ubudehe** (mutual assistance) and **Ubuhake** (patron-client relationship) cemented social cohesion.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rwanda_Intore_dancers.jpg/640px-Rwanda_Intore_dancers.jpg',
      },
      {
        id: 's2',
        title: 'Administration: The Mwami',
        content: 'The Kingdom was centralized under the **Mwami** (King), considered of divine origin. Administration was handled through three chiefs at the local level: \n\n1. **Chief of Pastures** (Menya) \n2. **Chief of Land** (Ubutaka) \n3. **Chief of Army** (Ingabo)\n\nThis system ensured checks and balances and unified the population under the King.',
        videoUrl: 'placeholder'
      }
    ]
  },
  {
    id: '2',
    title: 'Colonization: German & Belgian Rule',
    category: 'History',
    duration: '25 min',
    description: 'Detailed analysis of the colonial period, from the Berlin Conference to the 1933 Identity Cards.',
    sections: [
      {
        id: 's1',
        title: 'German Colonization (1894-1916)',
        content: 'Following the **1884 Berlin Conference**, Rwanda became part of German East Africa. Count Gustav Adolf von Götzen was the first European to meet the Mwami in 1894. Germany employed **Indirect Rule**, governing through the existing monarchy with minimal physical presence.',
        timelineEvents: [
          {
            year: '1884',
            title: 'Berlin Conference',
            description: 'Africa is partitioned among European powers. Rwanda is assigned to Germany.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Berlin_Conference_1884.jpg/640px-Berlin_Conference_1884.jpg'
          },
          {
            year: '1894',
            title: 'Von Götzen Arrives',
            description: 'Count Von Götzen meets Mwami Kigeri IV Rwabugiri, marking the start of formal contact.',
          }
        ]
      },
      {
        id: 's2',
        title: 'Belgian Colonization (1916-1962)',
        content: 'Belgium occupied Rwanda in 1916 during WWI. Unlike the Germans, they slowly implemented **Direct Rule**. \n\nCrucially, in **1933**, Belgium introduced ethnic identity cards, classifying citizens as Hutu (85%), Tutsi (14%), or Twa (1%) based on cattle ownership and physical features. This rigid classification destroyed the fluid social fabric.',
        mapUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/German_East_Africa_1892.jpg/500px-German_East_Africa_1892.jpg',
        timelineEvents: [
          {
            year: '1916',
            title: 'Belgian Takeover',
            description: 'Belgian troops enter Rwanda; Germany loses control during WWI.',
          },
          {
            year: '1931',
            title: 'Musinga Deposed',
            description: 'King Yuhi V Musinga is deposed by Belgians for resisting baptism and colonial orders.',
          },
          {
            year: '1933',
            title: 'Ethnic ID Cards',
            description: 'Introduction of identity cards based on the number of cattle (10+ cows = Tutsi).',
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Road to Independence (1959-1962)',
    category: 'Civics',
    duration: '20 min',
    description: 'The turbulent path to independence, the rise of political parties, and the 1959 Social Revolution.',
    sections: [
      {
        id: 's1',
        title: 'Political Awakening',
        content: 'In the late 1950s, political parties formed. **UNAR** (Union Nationale Rwandaise) sought immediate independence under the monarchy, while **PARMEHUTU** (supported by the Belgian administration and church) promoted Hutu emancipation.',
      },
      {
        id: 's2',
        title: 'Independence',
        content: 'Following the 1959 violence and a UN-monitored referendum in 1961 (which abolished the monarchy), Rwanda gained independence on **July 1, 1962** under President Grégoire Kayibanda. However, this independence was marred by ethnic division and exclusion.',
        timelineEvents: [
          {
            year: '1959',
            title: 'Social Revolution',
            description: 'Sparked by the rumor of a sub-chief\'s death, violence erupted, leading to the exile of thousands of Tutsis.',
          },
          {
            year: '1961',
            title: 'Referendum',
            description: 'Kamarampaka referendum abolishes the Monarchy.',
          },
          {
            year: '1962',
            title: 'Independence Day',
            description: 'Rwanda gains formal independence from Belgium.',
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Patriotism & Heroism (Ubutwari)',
    category: 'Values',
    duration: '10 min',
    description: 'Understanding the categories of heroes: Imanzi, Imena, and Ingenzi.',
    sections: [
      {
        id: 's1',
        title: 'Categories of Heroes',
        content: 'In Rwanda, heroes are classified into three categories:\n\n1. **Imanzi**: Supreme heroes who made the ultimate sacrifice (e.g., Maj. Gen. Fred Gisa Rwigema, The Unknown Soldier).\n2. **Imena**: Heroes known for their extraordinary acts and sacrifice (e.g., King Mutara III Rudahigwa, Michel Rwagasana).\n3. **Ingenzi**: Heroes who are still alive or recently deceased, serving as exemplary role models.',
      }
    ]
  }
];

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'basics',
    title: 'Basic Definitions',
    description: 'Origins of citizenship, nationality vs. citizenship.',
    icon: BookOpen,
    questions: [
      {
        id: 1,
        type: 'MCQ',
        difficulty: 'Easy',
        question: "What is the etymological origin of the word 'Citizenship'?",
        options: ["Latin 'Civitas' and Greek 'Polites'", "French 'Citoyen'", "German 'Burg'", "English 'City'"],
        correctAnswer: 0,
        explanation: "Citizenship comes from the Latin 'Civitas' (city-state) and the Greek 'Polites' (member of a polis)."
      },
      {
        id: 2,
        type: 'TRUE_FALSE',
        difficulty: 'Medium',
        question: "Nationality and Citizenship are exactly the same legal concept.",
        correctAnswer: "False",
        explanation: "False. Nationality is a legal bond usually acquired by birth or blood, while Citizenship implies active participation and rights within a political community."
      },
      {
        id: 3,
        type: 'FILL_BLANK',
        difficulty: 'Hard',
        question: "The set of knowledge, skills, attitudes, and values required for active participation in society is known as ________ Education.",
        correctAnswer: "Citizenship",
        explanation: "Citizenship Education aims to equip individuals with the KSAV (Knowledge, Skills, Attitudes, Values) necessary for society."
      }
    ]
  },
  {
    id: 'objectives',
    title: 'Objectives & Values',
    description: 'KSAV, patriotism, and Rwandan cultural values.',
    icon: Flag,
    questions: [
      {
        id: 4,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "Which acronym represents the core components of Citizenship Education?",
        options: ["KSAV (Knowledge, Skills, Attitudes, Values)", "PEACE", "STEM", "SMART"],
        correctAnswer: 0,
        explanation: "KSAV stands for Knowledge, Skills, Attitudes, and Values."
      },
      {
        id: 5,
        type: 'MCQ',
        difficulty: 'Easy',
        question: "Which of the following is NOT a core value of Rwandan Citizenship?",
        options: ["Patriotism", "Divisionism", "Resilience", "Integrity"],
        correctAnswer: 1,
        explanation: "Divisionism is destructive. Values include patriotism, unity, integrity, and resilience."
      }
    ]
  },
  {
    id: 'pre_colonial',
    title: 'Pre-Colonial Rwanda',
    description: 'Clans, Ubuhake, and social fluidity.',
    icon: Crown,
    questions: [
      {
        id: 6,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "Before colonization, how many major clans (Amoko) existed in Rwanda?",
        options: ["3", "12", "18-20", "50+"],
        correctAnswer: 2,
        explanation: "There were about 18-20 major clans (e.g., Abanyiginya, Abagesera) which included Hutu, Tutsi, and Twa members."
      },
      {
        id: 7,
        type: 'TRUE_FALSE',
        difficulty: 'Easy',
        question: "In pre-colonial Rwanda, a Hutu could never become a Tutsi.",
        correctAnswer: "False",
        explanation: "False. Social mobility was possible through 'Kwihutura' (accumulating wealth/cattle) or 'Gucupira' (losing wealth)."
      },
      {
        id: 8,
        type: 'FILL_BLANK',
        difficulty: 'Medium',
        question: "The pre-colonial system of cattle clientelism where a patron lent a cow to a client was called ________.",
        correctAnswer: "Ubuhake",
        explanation: "Ubuhake was a socio-economic relationship based on cattle exchange that created social cohesion."
      }
    ]
  },
  {
    id: 'german',
    title: 'German Colonization',
    description: '1894-1916: Berlin Conference and Indirect Rule.',
    icon: Globe,
    questions: [
      {
        id: 9,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "Which conference in 1884-1885 assigned Rwanda to the German sphere of influence?",
        options: ["Treaty of Versailles", "Berlin Conference", "Brussels Roundtable", "Yalta Conference"],
        correctAnswer: 1,
        explanation: "The Berlin Conference partitioned Africa, placing Rwanda under German East Africa."
      },
      {
        id: 10,
        type: 'FILL_BLANK',
        difficulty: 'Hard',
        question: "The first European explorer to meet Mwami Kigeri IV Rwabugiri in 1894 was Count ________.",
        correctAnswer: "Von Gotzen",
        explanation: "Count Gustav Adolf von Götzen arrived in 1894."
      },
      {
        id: 11,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "What style of administration did the Germans primarily use in Rwanda?",
        options: ["Direct Rule", "Indirect Rule", "Assimilation", "Military Dictatorship"],
        correctAnswer: 1,
        explanation: "Germany used Indirect Rule, relying on the Mwami and existing chiefs due to lack of manpower."
      }
    ]
  },
  {
    id: 'belgian',
    title: 'Belgian Colonization',
    description: '1916-1962: ID Cards, Direct Rule, and Division.',
    icon: AlertTriangle,
    questions: [
      {
        id: 12,
        type: 'MCQ',
        difficulty: 'Hard',
        question: "In what year were ethnic Identity Cards introduced by the Belgian administration?",
        options: ["1916", "1933", "1959", "1962"],
        correctAnswer: 1,
        explanation: "The infamous ethnic identity cards were introduced in 1933-1935, cementing fluid social groups into rigid racial categories."
      },
      {
        id: 13,
        type: 'FILL_BLANK',
        difficulty: 'Medium',
        question: "The Belgian requirement for forced labor (working for the state/chiefs) was locally known as ________.",
        correctAnswer: "Akazi",
        explanation: "Akazi refers to the forced labor system (corvée) imposed by the colonizers."
      },
      {
        id: 14,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "Which King was deposed and exiled by the Belgians in 1931 for resisting their authority?",
        options: ["Kigeri IV Rwabugiri", "Yuhi V Musinga", "Mutara III Rudahigwa", "Kigeri V Ndahindurwa"],
        correctAnswer: 1,
        explanation: "Yuhi V Musinga was deposed in 1931 and exiled to Kamembe, then Moba, for refusing baptism and resisting Belgian orders."
      }
    ]
  },
  {
    id: 'independence',
    title: 'Path to Independence',
    description: '1959 Revolution, Parties, and 1962.',
    icon: ScrollText,
    questions: [
      {
        id: 15,
        type: 'MCQ',
        difficulty: 'Hard',
        question: "Which political party was known for promoting Hutu emancipation under Belgian support?",
        options: ["UNAR", "RADER", "PARMEHUTU", "APROSOMA"],
        correctAnswer: 2,
        explanation: "PARMEHUTU (Parti du Mouvement de l'Emancipation Hutu) led the drive for ethnic-based independence."
      },
      {
        id: 16,
        type: 'FILL_BLANK',
        difficulty: 'Medium',
        question: "Rwanda gained formal independence on July 1, ________.",
        correctAnswer: "1962",
        explanation: "Independence was granted on July 1, 1962."
      }
    ]
  },
  {
    id: 'impacts',
    title: 'Impacts of Colonization',
    description: 'Economic, Cultural, and Social consequences.',
    icon: Layers,
    questions: [
      {
        id: 17,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "Which of the following was an economic impact of colonization?",
        options: ["Introduction of coffee and tea as cash crops", "Industrialization of rural areas", "Equitable distribution of land", "Abolition of taxes"],
        correctAnswer: 0,
        explanation: "Colonizers introduced cash crops like coffee and tea, shifting focus away from subsistence farming (food security)."
      },
      {
        id: 18,
        type: 'TRUE_FALSE',
        difficulty: 'Easy',
        question: "Colonization reinforced the unity of Rwandans.",
        correctAnswer: "False",
        explanation: "False. Colonization, through divide-and-rule and the Hamitic Hypothesis, destroyed unity and created ethnic division."
      }
    ]
  },
  {
    id: 'figures',
    title: 'Key Figures',
    description: 'Kings, Leaders, and Heroes.',
    icon: Users,
    questions: [
      {
        id: 19,
        type: 'MCQ',
        difficulty: 'Medium',
        question: "Who was the first President of independent Rwanda?",
        options: ["Juvénal Habyarimana", "Grégoire Kayibanda", "Dominique Mbonyumutwa", "Pasteur Bizimungu"],
        correctAnswer: 1,
        explanation: "Grégoire Kayibanda became the first President after the abolition of the monarchy."
      },
      {
        id: 20,
        type: 'MCQ',
        difficulty: 'Hard',
        question: "Which King abolished Ubuhake in 1954?",
        options: ["Yuhi V Musinga", "Mutara III Rudahigwa", "Kigeri IV Rwabugiri", "Kigeri V Ndahindurwa"],
        correctAnswer: 1,
        explanation: "King Mutara III Rudahigwa abolished the Ubuhake system in 1954 to promote equality."
      }
    ]
  },
  {
    id: 'review',
    title: 'Comprehensive Review',
    description: 'Mixed questions from all categories.',
    icon: Shield,
    questions: [
      {
        id: 21,
        type: 'MCQ',
        difficulty: 'Hard',
        question: "What does the mnemonic I-A-E-C-N-R stand for regarding colonization impacts?",
        options: ["Identity, Admin, Economy, Culture, Narrative, Rise of Ideology", "International, Army, Economy, Church, Nation, Republic", "Internal, Admin, Education, Courts, New Rule", "None of the above"],
        correctAnswer: 0,
        explanation: "It stands for Identity fixation, Administrative centralization, Economic exploitation, Cultural transformation, Narrative control, and Rise of genocidal ideology."
      }
    ]
  }
];