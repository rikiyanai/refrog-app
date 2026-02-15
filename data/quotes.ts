export type QuoteCategory = 'philosophy' | 'poetry' | 'humor' | 'spiritual' | 'science';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'any';

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
  timeOfDay?: TimeOfDay;
}

export const QUOTES: Quote[] = [
  {
    id: '1',
    text: "Death smiles at us all, all a man can do is smile back.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '2',
    text: "I do not fear death. I had been dead for billions and billions of years before I was born, and had not suffered the slightest inconvenience from it.",
    author: "Mark Twain",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '3',
    text: "To the well-organized mind, death is but the next great adventure.",
    author: "J.K. Rowling",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '4',
    text: "Death ends a life, not a relationship.",
    author: "Mitch Albom",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '5',
    text: "Don't feel bad, I'm usually about to die.",
    author: "Rick Riordan",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '6',
    text: "I'm not afraid of death; I just don't want to be there when it happens.",
    author: "Woody Allen",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '7',
    text: "I wish it need not have happened in my time,\" said Frodo.\n\"So do I,\" said Gandalf, \"and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.",
    author: "J.R.R. Tolkien",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '8',
    text: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.",
    author: "Mark Twain",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '9',
    text: "I'm the one that's got to die when it's time for me to die, so let me live my life the way I want to.",
    author: "Jimi Hendrix",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '10',
    text: "It is said that your life flashes before your eyes just before you die. That is true, it's called Life.",
    author: "Terry Pratchett",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '11',
    text: "Life is for the living.\nDeath is for the dead.\nLet life be like music.\nAnd death a note unsaid.",
    author: "Langston Hughes",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '12',
    text: "Cowards die many times before their actual deaths.",
    author: "Julius Caesar",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '13',
    text: "Time is a great teacher, but unfortunately it kills all its pupils.",
    author: "Hector Berlioz",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '14',
    text: "What is life? It is the flash of a firefly in the night. It is the breath of a buffalo in the winter time. It is the little shadow which runs across the grass and loses itself in the Sunset.",
    author: "Crowfoot",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '15',
    text: "I would rather die a meaningful death than to live a meaningless life.",
    author: "Corazon Aquino",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '16',
    text: "Only the dead have seen the end of war.",
    author: "Plato",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '17',
    text: "There will be no one like us when we are gone, but then there is no one like anyone else, ever. When people die, they cannot be replaced. They leave holes that cannot be filled.",
    author: "Oliver Sacks",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '18',
    text: "Death is not the greatest loss in life. The greatest loss is what dies inside us while we live.",
    author: "Norman Cousins",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '19',
    text: "I go to seek a Great Perhaps.",
    author: "François Rabelais",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '20',
    text: "Death has but one terror, that it has no tomorrow.",
    author: "Eric Hoffer",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '21',
    text: "We sometimes congratulate ourselves at the moment of waking from a troubled dream; it may be so the moment after death.",
    author: "Nathaniel Hawthorne",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '22',
    text: "If there are no dogs in Heaven, then when I die I want to go where they went.",
    author: "Will Rogers",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '23',
    text: "We die only once, and for such a long time.",
    author: "Molière",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '24',
    text: "Life is growth. If we stop growing, technically and spiritually, we are as good as dead.",
    author: "Morihei Ueshiba",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '25',
    text: "How wonderful is death! Death and his brother sleep.",
    author: "Percy Bysshe Shelley",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '26',
    text: "To be, or not to be: that is the question.",
    author: "William Shakespeare",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '27',
    text: "When people don't express themselves, they die one piece at a time.",
    author: "Laurie Halse Anderson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '28',
    text: "I meant,\" said Death, \"what is there in this world that truly makes living worthwhile?\"\nCATS, he said. CATS ARE NICE.",
    author: "Terry Pratchett",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '29',
    text: "Death is the loss of everything all at once.",
    author: "Julie Salamon",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '30',
    text: "Growing old was simply a process of drawing closer to that ultimate independence called death.",
    author: "Martha Ostenso",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '31',
    text: "My dear, Find what you love and let it kill you.",
    author: "Kinky Friedman",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '32',
    text: "If the truth shall kill them, let them die.",
    author: "Ayn Rand",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '33',
    text: "Even death has a heart.",
    author: "Markus Zusak",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '34',
    text: "It kills me sometimes, how people die.",
    author: "Markus Zusak",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '35',
    text: "I don't want to die without any scars.",
    author: "Chuck Palahniuk",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '36',
    text: "Life should not be a journey to the grave with the intention of arriving safely in a pretty and well preserved body, but rather to skid in broadside in a cloud of smoke, thoroughly used up.",
    author: "Hunter S. Thompson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '37',
    text: "We are all alone, born alone, die alone, and—in spite of True Romance magazines—we shall all someday look back on our lives and see that, in spite of our company, we were alone the whole way.",
    author: "Hunter S. Thompson",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '38',
    text: "Things we lose have a way of coming back to us in the end, if not always in the way we expect.",
    author: "J.K. Rowling",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '39',
    text: "If you gave someone your heart and they died, did they take it with them? Did you spend the rest of forever with a hole inside you that couldn't be filled?",
    author: "Jodi Picoult",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '40',
    text: "That was the thing. You never got used to it, the idea of someone being gone. Just when you think it's reconciled, accepted, someone points it out to you, and it just hits you all over again, that shocking.",
    author: "Sarah Dessen",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '41',
    text: "When he died, all things soft and beautiful and bright would be buried with him.",
    author: "Madeline Miller",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '42',
    text: "Unbeing dead isn't being alive.",
    author: "E.E. Cummings",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '43',
    text: "Love never dies a natural death. It dies because we don't know how to replenish its source.",
    author: "Anaïs Nin",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '44',
    text: "Death's got an Invisibility Cloak? Sometimes he gets bored of running at people, flapping his arms and shrieking...",
    author: "J.K. Rowling",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '45',
    text: "A thing is not necessarily true because a man dies for it.",
    author: "Oscar Wilde",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '46',
    text: "Man cannot live without some knowledge of the purpose of life. If he can find no purpose in life he creates one in the inevitability of death.",
    author: "Chester Himes",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '47',
    text: "Death is a continuation of my life without me.",
    author: "Jean-Paul Sartre",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '48',
    text: "I do not wish to die: but I care not if I were dead.",
    author: "Cicero",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '49',
    text: "The darkness of death is like the evening twilight; it makes all objects appear more lovely to the dying.",
    author: "Jean Paul",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '50',
    text: "Death is the next step after the pension-it's perpetual retirement without pay.",
    author: "Jean Giraudoux",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '51',
    text: "You could leave life right now. Let that determine what you do and say and think.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '52',
    text: "Think of yourself as dead. You have lived your life. Now, take what's left and live it properly.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '53',
    text: "It is not death that a man should fear, but he should fear never beginning to live.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '54',
    text: "Even if you're going to live three thousand more years, or ten times that, remember: you cannot lose another life than the one you're living now.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '55',
    text: "Don't behave as if you are destined to live forever. Death hangs over you. While you live, while it is in your power, be good. Now.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '56',
    text: "We die every day, for every day some part of life is taken from us.",
    author: "Seneca",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '57',
    text: "Let us prepare our minds as if we'd come to the very end of life. Let us postpone nothing. Let us balance life's books each day.",
    author: "Seneca",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '58',
    text: "Just where death is expecting you is something we cannot know; so, for your part, expect him everywhere.",
    author: "Seneca",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '59',
    text: "That man lives badly who does not know how to die well.",
    author: "Seneca",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '60',
    text: "No evil is honorable: but death is honorable; therefore, death is not evil.",
    author: "Seneca",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '61',
    text: "Because I could not stop for Death –\nHe kindly stopped for me –\nThe Carriage held but just Ourselves –\nAnd Immortality.",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '62',
    text: "I'm Nobody! Who are you?\nAre you – Nobody – too?\nThen there's a pair of us!",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '63',
    text: "The Bustle in a House\nThe Morning after Death\nIs solemnest of industries\nEnacted upon Earth –",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'morning'
  },
  {
    id: '64',
    text: "I heard a Fly buzz – when I died –\nThe Stillness in the Room\nWas like the Stillness in the Air –\nBetween the Heaves of Storm –",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '65',
    text: "Death is a dialogue between\nThe Spirit and the Dust.",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '66',
    text: "The grave my little cottage is,\nWhere keeping house for thee,\nI make my parlor orderly\nAnd lay the marble tea.",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '67',
    text: "I've seen a Dying Eye\nRun round and round a Room –\nIn search of Something – as it seemed –\nThen Cloudier become –",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '68',
    text: "Dust be thy pillow, earth thy bed,\nMy soul shall join the disembodied dead.",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '69',
    text: "The Day she died\nNature sat around\nIn silence – in a solemn trance.",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '70',
    text: "Death is like the insect\nMenacing the tree,\nCompetent to kill,\nBut impotent to be.",
    author: "Emily Dickinson",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '71',
    text: "Do not go gentle into that good night.\nRage, rage against the dying of the light.",
    author: "Dylan Thomas",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '72',
    text: "Though lovers be lost love shall not;\nAnd death shall have no dominion.",
    author: "Dylan Thomas",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '73',
    text: "After the first death, there is no other.",
    author: "Dylan Thomas",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '74',
    text: "And death shall have no dominion.\nDead men naked they shall be one\nWith the man in the wind and the west moon.",
    author: "Dylan Thomas",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '75',
    text: "Do not forget, in this life, that it is but a dream, and when I die, I will know that I have been dreaming.",
    author: "Rumi",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '76',
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '77',
    text: "Be like a tree and let the dead leaves drop.",
    author: "Rumi",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '78',
    text: "Don't grieve. Anything you lose comes round in another form.",
    author: "Rumi",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '79',
    text: "Death is not the opposite of life, but a part of it.",
    author: "Haruki Murakami",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '80',
    text: "When you realize nothing is lacking, the whole world belongs to you.",
    author: "Lao Tzu",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '81',
    text: "The art of living is more like wrestling than dancing.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '82',
    text: "It never ceases to amaze me: we all love ourselves more than other people, but care more about their opinion than our own.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '83',
    text: "The universe is change; our life is what our thoughts make it.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '84',
    text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '85',
    text: "It is the responsibility of leadership to work intelligently with what is given, and not waste time fantasizing about a world of flawless people and perfect choices.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '86',
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '87',
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '88',
    text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '89',
    text: "Loss is nothing else but change, and change is Nature's delight.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '90',
    text: "If it is not right do not do it; if it is not true do not say it.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '91',
    text: "When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '92',
    text: "We live only now. Everything else is either passed or is unknown.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '93',
    text: "Remember that very little is needed to make a happy life.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '94',
    text: "It is time we realized that to place our trust in princes, or any mortal men, is unsafe.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '95',
    text: "Nothing happens to any man that he is not formed by nature to bear.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '96',
    text: "The best revenge is to be unlike him who performed the injury.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '97',
    text: "How much time he gains who does not look to see what his neighbor says or does or thinks, but only at what he does himself, to make it just and holy.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '98',
    text: "Whenever you are about to find fault with someone, ask yourself the following question: What fault of mine most nearly resembles the one I am about to criticize?",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '99',
    text: "Look within. Within is the fountain of good, and it will ever bubble up, if thou wilt ever dig.",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '100',
    text: "Is your cucumber bitter? Throw it away. Are there briars in your path? Step aside. That is enough. Do not add, \"And why were such things made in the world?\"",
    author: "Marcus Aurelius",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '101',
    text: "No man is free who is not master of himself.",
    author: "Epictetus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '102',
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '103',
    text: "Men are disturbed not by things, but by the view which they take of them.",
    author: "Epictetus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '104',
    text: "Do not seek to have events happen as you want them to, but instead want them to happen as they do happen, and your life will go well.",
    author: "Epictetus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '105',
    text: "We have two ears and one mouth so that we can listen twice as much as we speak.",
    author: "Epictetus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '106',
    text: "He who fears death either fears the loss of sensation or a different kind of sensation.",
    author: "Epicurus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '107',
    text: "Death is nothing to us, since when we exist, death is not present, and when death is present, we do not exist.",
    author: "Epicurus",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '108',
    text: "The goal of life is to live in agreement with nature.",
    author: "Zeno",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '109',
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '110',
    text: "I am not afraid of tomorrow, for I have seen yesterday and I love today.",
    author: "William Allen White",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '111',
    text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    author: "Bil Keane",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '112',
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '113',
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '114',
    text: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '115',
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '116',
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '117',
    text: "The universe is under no obligation to make sense to you.",
    author: "Neil deGrasse Tyson",
    category: 'science',
    timeOfDay: 'any'
  },
  {
    id: '118',
    text: "We are all made of starstuff.",
    author: "Carl Sagan",
    category: 'science',
    timeOfDay: 'evening'
  },
  {
    id: '119',
    text: "If you want to make an apple pie from scratch, you must first invent the universe.",
    author: "Carl Sagan",
    category: 'science',
    timeOfDay: 'any'
  },
  {
    id: '120',
    text: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
    category: 'science',
    timeOfDay: 'any'
  },
  {
    id: '121',
    text: "We are a way for the universe to know itself.",
    author: "Carl Sagan",
    category: 'science',
    timeOfDay: 'any'
  },
  {
    id: '122',
    text: "I would rather live one life in the moment than a thousand lives in my head.",
    author: "Unknown",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '123',
    text: "As a well-spent day brings happy sleep, so a life well used brings happy death.",
    author: "Leonardo da Vinci",
    category: 'philosophy',
    timeOfDay: 'evening'
  },
  {
    id: '124',
    text: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '125',
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '126',
    text: "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '127',
    text: "The woods are lovely, dark and deep, but I have promises to keep, and miles to go before I sleep.",
    author: "Robert Frost",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '128',
    text: "A prayer for the wild at heart, kept in cages.",
    author: "Tennessee Williams",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '129',
    text: "I have measured out my life with coffee spoons.",
    author: "T.S. Eliot",
    category: 'poetry',
    timeOfDay: 'morning'
  },
  {
    id: '130',
    text: "This is the way the world ends\nNot with a bang but a whimper.",
    author: "T.S. Eliot",
    category: 'poetry',
    timeOfDay: 'evening'
  },
  {
    id: '131',
    text: "We shall not cease from exploration\nAnd the end of all our exploring\nWill be to arrive where we started\nAnd know the place for the first time.",
    author: "T.S. Eliot",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '132',
    text: "What we call the beginning is often the end. And to make an end is to make a beginning. The end is where we start from.",
    author: "T.S. Eliot",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '133',
    text: "We die as we live: in the middle of things.",
    author: "Unknown",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '134',
    text: "Tell me, what is it you plan to do with your one wild and precious life?",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '135',
    text: "Someone I loved once gave me a box full of darkness. It took me years to understand that this, too, was a gift.",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '136',
    text: "Tell me about despair, yours, and I will tell you mine.",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '137',
    text: "You do not have to be good. You do not have to walk on your knees for a hundred miles through the desert repenting.",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '138',
    text: "Wild geese are calling to you, over and over announcing your place in the family of things.",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '139',
    text: "There are moments that cry out to be fulfilled.",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '140',
    text: "To live in this world you must be able to do three things: to love what is mortal; to hold it against your bones knowing your own life depends on it; and, when the time comes to let it go, to let it go.",
    author: "Mary Oliver",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '141',
    text: "Death is nothing at all. I have only slipped away to the next room. I am I and you are you. Whatever we were to each other, that we are still.",
    author: "Henry Scott Holland",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '142',
    text: "Life is eternal and love is immortal, and death is only a horizon, and a horizon is nothing save the limit of our sight.",
    author: "Rossiter Worthington Raymond",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '143',
    text: "There are no goodbyes for us. Wherever you are, you will always be in my heart.",
    author: "Mahatma Gandhi",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '144',
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '145',
    text: "The weak can never forgive. Forgiveness is the attribute of the strong.",
    author: "Mahatma Gandhi",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '146',
    text: "An eye for an eye only ends up making the whole world blind.",
    author: "Mahatma Gandhi",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '147',
    text: "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mahatma Gandhi",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '148',
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '149',
    text: "There is a time for everything, and a season for every activity under the heavens.",
    author: "Bible - Ecclesiastes",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '150',
    text: "For everything there is a season, a time for every purpose under heaven.",
    author: "Bible - Ecclesiastes",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '151',
    text: "A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted.",
    author: "Bible - Ecclesiastes",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '152',
    text: "He has made everything beautiful in its time.",
    author: "Bible - Ecclesiastes",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '153',
    text: "I am the resurrection and the life. He who believes in Me, though he may die, he shall live.",
    author: "Bible - John",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '154',
    text: "And I give them eternal life, and they shall never perish; neither shall anyone snatch them out of my hand.",
    author: "Bible - John",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '155',
    text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.",
    author: "Bible - Psalm 23",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '156',
    text: "The LORD is my shepherd; I shall not want.",
    author: "Bible - Psalm 23",
    category: 'spiritual',
    timeOfDay: 'morning'
  },
  {
    id: '157',
    text: "Precious in the sight of the LORD is the death of his saints.",
    author: "Bible - Psalm 116",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '158',
    text: "For to me to live is Christ, and to die is gain.",
    author: "Bible - Philippians",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '159',
    text: "And as it is appointed for men to die once, but after this the judgment.",
    author: "Bible - Hebrews",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '160',
    text: "The dust returns to the ground it came from, and the spirit returns to God who gave it.",
    author: "Bible - Ecclesiastes",
    category: 'spiritual',
    timeOfDay: 'any'
  },
  {
    id: '161',
    text: "To live we must conquer incessantly, we must have the courage to be happy.",
    author: "Henri-Frédéric Amiel",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '162',
    text: "He who has a thousand friends has not a friend to spare, and he who has one enemy will meet him everywhere.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '163',
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '164',
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '165',
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '166',
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '167',
    text: "Life is a journey that must be traveled no matter how bad the roads and accommodations.",
    author: "Oliver Goldsmith",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '168',
    text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '169',
    text: "To laugh often and much; to win the respect of intelligent people and the affection of children.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '170',
    text: "To leave the world a bit better... to know even one life has breathed easier because you have lived.",
    author: "Ralph Waldo Emerson",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '171',
    text: "This is the true joy of life: being used for a purpose recognized by yourself as a mighty one.",
    author: "George Bernard Shaw",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '172',
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '173',
    text: "There are two tragedies in life. One is to lose your heart's desire. The other is to gain it.",
    author: "George Bernard Shaw",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '174',
    text: "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.",
    author: "George Bernard Shaw",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '175',
    text: "The only way to get rid of a temptation is to yield to it.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '176',
    text: "I can resist everything except temptation.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '177',
    text: "The truth is rarely pure and never simple.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '178',
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '179',
    text: "I have the simplest tastes. I am always satisfied with the best.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '180',
    text: "I am not young enough to know everything.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '181',
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '182',
    text: "I'm dying of boredom. If I could die one thousand times, I would choose death by boredom.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '183',
    text: "I never want to see anyone. That's not true. I just want to see a few people before I die.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '184',
    text: "Life is much too important a thing ever to talk seriously about.",
    author: "Oscar Wilde",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '185',
    text: "The mind is its own place, and in itself can make a heaven of Hell, a hell of Heaven.",
    author: "John Milton",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '186',
    text: "What though the field be lost? All is not lost; th' unconquerable will.",
    author: "John Milton",
    category: 'poetry',
    timeOfDay: 'any'
  },
  {
    id: '187',
    text: "The world is all that is the case.",
    author: "Ludwig Wittgenstein",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '188',
    text: "Whereof one cannot speak, thereof one must be silent.",
    author: "Ludwig Wittgenstein",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '189',
    text: "The limits of my language mean the limits of my world.",
    author: "Ludwig Wittgenstein",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '190',
    text: "He who fights with monsters should look to it that he himself does not become a monster.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '191',
    text: "And if you gaze long into an abyss, the abyss also gazes into you.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '192',
    text: "Whatever does not kill me makes me stronger.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '193',
    text: "That which does not kill us makes us stronger.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '194',
    text: "Is life not a thousand times too short for us to bore ourselves?",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '195',
    text: "It is not a lack of love, but a lack of friendship that makes unhappy marriages.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '196',
    text: "One must still have chaos in oneself to be able to give birth to a dancing star.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '197',
    text: "All truth is simple... is that not doubly a lie?",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '198',
    text: "There are no facts, only interpretations.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '199',
    text: "You have your way. I have my way. As for the right way, the correct way, and the only way, it does not exist.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '200',
    text: "It is always consoling to think of success: but it was much better to think of it without despairing in the beginning.",
    author: "Friedrich Nietzsche",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '201',
    text: "I have learned this at least by my experiment: that if one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '202',
    text: "Most men lead lives of quiet desperation and go to the grave with the song still in them.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '203',
    text: "Our life is frittered away by detail. Simplify, simplify.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '204',
    text: "The price of anything is the amount of life you exchange for it.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '205',
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'morning'
  },
  {
    id: '206',
    text: "Happiness is like a butterfly: the more you chase it, the more it will elude you, but if you turn your attention to other things, it will come and sit softly on your shoulder.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '207',
    text: "The mass of men lead lives of quiet desperation.",
    author: "Henry David Thoreau",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '208',
    text: "When I die, I want to be a ghost, so I can walk through walls and scare people.",
    author: "Unknown",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '209',
    text: "I'm not afraid of death, but I'm not ready to go yet. I haven't finished my Netflix queue.",
    author: "Unknown",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '210',
    text: "Death is nature's way of telling you to slow down.",
    author: "Unknown",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '211',
    text: "The trouble with life is there's no background music.",
    author: "Unknown",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '212',
    text: "Life is a sexually transmitted disease with 100% mortality.",
    author: "Unknown",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '213',
    text: "I want to die in my sleep like my grandfather did, not screaming like the passengers in his car.",
    author: "Unknown",
    category: 'humor',
    timeOfDay: 'any'
  },
  {
    id: '214',
    text: "Death is the only thing that is permanent in life.",
    author: "Unknown",
    category: 'philosophy',
    timeOfDay: 'any'
  },
  {
    id: '215',
    text: "The day you were born is the day you begin to die.",
    author: "Unknown",
    category: 'philosophy',
    timeOfDay: 'any'
  },
];

export const CATEGORIES: QuoteCategory[] = ['philosophy', 'poetry', 'humor', 'spiritual', 'science'];
export const TIMES_OF_DAY: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'any'];

export function getRandomQuote(quotes: Quote[] = QUOTES): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export function getQuotesByCategory(category: QuoteCategory): Quote[] {
  return QUOTES.filter(quote => quote.category === category);
}

export function getQuotesByTimeOfDay(timeOfDay: TimeOfDay): Quote[] {
  return QUOTES.filter(quote => 
    quote.timeOfDay === timeOfDay || quote.timeOfDay === 'any'
  );
}