// Bilingual knowledge check for Dira 2050 / Vision 2050. The shared Quiz engine
// renders whichever language set the site is currently showing.

const EN = {
  ratings: [
    { min: 88, name: 'Visionary', msg: 'Outstanding. You know Dira 2050 inside out.' },
    { min: 63, name: 'On track', msg: 'A solid grasp of the Vision.' },
    { min: 38, name: 'Getting there', msg: 'A quick re-read will lock it in.' },
    { min: 0, name: 'Just starting', msg: 'Begin with the Vision overview and try again.' },
  ],
  questions: [
    {
      type: 'mc',
      prompt: 'By 2050, what size economy does Dira 2050 aim for?',
      options: [
        { id: 'a', text: 'A one-trillion-dollar economy' },
        { id: 'b', text: 'USD 118 billion' },
        { id: 'c', text: 'USD 500 billion' },
        { id: 'd', text: 'USD 100 billion' },
      ],
      answer: 'a',
      explain: 'The Vision targets a one-trillion-dollar economy by 2050.',
    },
    {
      type: 'mc',
      prompt: 'What average income per person is the Vision targeting?',
      options: [
        { id: 'a', text: 'About USD 7,000 a year' },
        { id: 'b', text: 'About USD 1,000 a year' },
        { id: 'c', text: 'About USD 3,000 a year' },
        { id: 'd', text: 'About USD 12,000 a year' },
      ],
      answer: 'a',
      explain: 'An average income of about USD 7,000 per person, the upper-middle-income level.',
    },
    {
      type: 'mc',
      prompt: 'How many pillars does Dira 2050 stand on?',
      options: [
        { id: 'a', text: 'Three' }, { id: 'b', text: 'Five' }, { id: 'c', text: 'Four' }, { id: 'd', text: 'Ten' },
      ],
      answer: 'a',
      explain: 'Three: a strong economy, capable people, and a healthy environment.',
    },
    {
      type: 'mc',
      prompt: 'How many catalytic drivers power the Vision?',
      options: [
        { id: 'a', text: 'Five' }, { id: 'b', text: 'Three' }, { id: 'c', text: 'Seven' }, { id: 'd', text: 'Four' },
      ],
      answer: 'a',
      explain: 'Five drivers: logistics, energy, science & technology, R&D, and digital transformation.',
    },
    {
      type: 'order',
      prompt: 'Order the Vision from the base upward.',
      items: [
        { id: 'f', text: 'Foundation: good governance, peace and stability' },
        { id: 'p', text: 'Three pillars' },
        { id: 'd', text: 'Five drivers' },
        { id: 's', text: 'Priority transformative sectors' },
      ],
      correct: ['f', 'p', 'd', 's'],
      explain: 'A foundation of governance holds up the pillars, powered by the drivers, delivered through priority sectors.',
    },
    {
      type: 'match',
      prompt: 'Match each pillar to what it means.',
      pairs: [
        { slot: 'p1', slotText: 'Strong economy', tile: 't1', tileText: 'A competitive upper-middle-income economy' },
        { slot: 'p2', slotText: 'Capable people', tile: 't2', tileText: 'Health, education and skills for all' },
        { slot: 'p3', slotText: 'Healthy environment', tile: 't3', tileText: 'Conservation and climate resilience' },
      ],
      explain: 'The three pillars: a strong economy, capable people, and a healthy environment.',
    },
    {
      type: 'mc',
      prompt: 'Which of these is one of the five guiding principles?',
      options: [
        { id: 'a', text: 'Dignity' }, { id: 'b', text: 'Privatisation' }, { id: 'c', text: 'Austerity' }, { id: 'd', text: 'Deregulation' },
      ],
      answer: 'a',
      explain: 'Dignity is one of the five principles, alongside democracy, peace and unity, natural wealth, and culture.',
    },
    {
      type: 'mc',
      prompt: 'Which body coordinates delivery of the Vision?',
      options: [
        { id: 'a', text: 'The National Planning Commission' },
        { id: 'b', text: 'The central bank' },
        { id: 'c', text: 'Development partners' },
        { id: 'd', text: 'A single ministry' },
      ],
      answer: 'a',
      explain: 'The National Planning Commission, with the Zanzibar Planning Commission, coordinates delivery.',
    },
  ],
}

const SW = {
  ratings: [
    { min: 88, name: 'Mwenye maono', msg: 'Hongera sana. Unaifahamu Dira 2050 vizuri kabisa.' },
    { min: 63, name: 'Upo njiani', msg: 'Uelewa mzuri wa Dira.' },
    { min: 38, name: 'Unakaribia', msg: 'Kusoma tena kutakusaidia kuimarisha uelewa.' },
    { min: 0, name: 'Unaanza', msg: 'Anza na muhtasari wa Dira kisha ujaribu tena.' },
  ],
  questions: [
    {
      type: 'mc',
      prompt: 'Ifikapo 2050, Dira 2050 inalenga uchumi wa ukubwa gani?',
      options: [
        { id: 'a', text: 'Uchumi wa dola trilioni moja' },
        { id: 'b', text: 'Dola bilioni 118' },
        { id: 'c', text: 'Dola bilioni 500' },
        { id: 'd', text: 'Dola bilioni 100' },
      ],
      answer: 'a',
      explain: 'Dira inalenga uchumi wa dola trilioni moja ifikapo 2050.',
    },
    {
      type: 'mc',
      prompt: 'Ni wastani gani wa pato la mtu mmoja unaolengwa?',
      options: [
        { id: 'a', text: 'Takriban dola 7,000 kwa mwaka' },
        { id: 'b', text: 'Takriban dola 1,000 kwa mwaka' },
        { id: 'c', text: 'Takriban dola 3,000 kwa mwaka' },
        { id: 'd', text: 'Takriban dola 12,000 kwa mwaka' },
      ],
      answer: 'a',
      explain: 'Wastani wa pato la takriban dola 7,000 kwa mtu, ngazi ya kipato cha kati cha juu.',
    },
    {
      type: 'mc',
      prompt: 'Dira 2050 inasimama juu ya nguzo ngapi?',
      options: [
        { id: 'a', text: 'Tatu' }, { id: 'b', text: 'Tano' }, { id: 'c', text: 'Nne' }, { id: 'd', text: 'Kumi' },
      ],
      answer: 'a',
      explain: 'Nguzo tatu: uchumi imara, watu wenye uwezo, na mazingira yenye afya.',
    },
    {
      type: 'mc',
      prompt: 'Ni vichocheo vingapi vinavyosukuma Dira?',
      options: [
        { id: 'a', text: 'Vitano' }, { id: 'b', text: 'Vitatu' }, { id: 'c', text: 'Saba' }, { id: 'd', text: 'Vinne' },
      ],
      answer: 'a',
      explain: 'Vichocheo vitano: usafirishaji, nishati, sayansi na teknolojia, utafiti na maendeleo, na mageuzi ya kidijitali.',
    },
    {
      type: 'order',
      prompt: 'Panga Dira kuanzia msingi kwenda juu.',
      items: [
        { id: 'f', text: 'Msingi: utawala bora, amani na utulivu' },
        { id: 'p', text: 'Nguzo tatu' },
        { id: 'd', text: 'Vichocheo vitano' },
        { id: 's', text: 'Sekta za mageuzi za kipaumbele' },
      ],
      correct: ['f', 'p', 'd', 's'],
      explain: 'Msingi wa utawala unashikilia nguzo, zinazosukumwa na vichocheo, na kutekelezwa kupitia sekta za kipaumbele.',
    },
    {
      type: 'match',
      prompt: 'Oanisha kila nguzo na maana yake.',
      pairs: [
        { slot: 'p1', slotText: 'Uchumi imara', tile: 't1', tileText: 'Uchumi shindani wa kipato cha kati ngazi ya juu' },
        { slot: 'p2', slotText: 'Watu wenye uwezo', tile: 't2', tileText: 'Afya, elimu na ujuzi kwa wote' },
        { slot: 'p3', slotText: 'Mazingira yenye afya', tile: 't3', tileText: 'Uhifadhi na uhimilivu wa tabianchi' },
      ],
      explain: 'Nguzo tatu: uchumi imara, watu wenye uwezo, na mazingira yenye afya.',
    },
    {
      type: 'mc',
      prompt: 'Ni ipi kati ya hizi ni mojawapo ya misingi mitano?',
      options: [
        { id: 'a', text: 'Utu' }, { id: 'b', text: 'Ubinafsishaji' }, { id: 'c', text: 'Ukali wa bajeti' }, { id: 'd', text: 'Kuondoa kanuni' },
      ],
      answer: 'a',
      explain: 'Utu ni mojawapo ya misingi mitano, pamoja na demokrasia, amani na umoja, utajiri wa asili, na utamaduni.',
    },
    {
      type: 'mc',
      prompt: 'Ni chombo gani kinachoratibu utekelezaji wa Dira?',
      options: [
        { id: 'a', text: 'Tume ya Taifa ya Mipango' },
        { id: 'b', text: 'Benki kuu' },
        { id: 'c', text: 'Washirika wa maendeleo' },
        { id: 'd', text: 'Wizara moja' },
      ],
      answer: 'a',
      explain: 'Tume ya Taifa ya Mipango, pamoja na Tume ya Mipango Zanzibar, inaratibu utekelezaji.',
    },
  ],
  ui: {
    count: (n, total, score) => `Swali ${n} kati ya ${total} · Alama ${score}`,
    check: 'Angalia jibu',
    moveUp: 'Sogeza juu',
    moveDown: 'Sogeza chini',
    allPlaced: 'Vyote vimewekwa. Angalia jibu.',
    dropTile: 'Dondosha au gusa kipande',
    ratingLabel: 'Kiwango chako',
    tryAgain: 'Jaribu tena',
    back: 'Rudi',
    correct: 'Sahihi.',
    notQuite: 'Si sahihi kabisa.',
    next: 'Swali linalofuata',
    seeRating: 'Ona kiwango changu',
  },
}

export const QUIZ = { en: EN, sw: SW }
