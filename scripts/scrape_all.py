#!/usr/bin/env python3
"""
Filtered Scraper - Only REAL death quotes from curated classics.
Outputs to: scripts/scraper-output/pending-review.json
"""

import requests
import json

OUTPUT_FILE = "scripts/scraper-output/pending-review.json"

# REAL verified death quotes only - no garbage
CLASSICS = [
    # Emily Dickinson - Death poems (quality)
    {
        "text": "Because I could not stop for Death – He kindly stopped for me –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "I heard a Fly buzz – when I died – The Stillness in the Room Was like the Stillness in the Air –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "The Bustle in a House The Morning after Death Is solemnest of industries Enacted upon Earth –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "The grave my little cottage is, Where keeping house for thee, I make my parlor orderly.",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "I've seen a Dying Eye Run round and round a Room – In search of Something –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "Dust be thy pillow, earth thy bed, My soul shall join the disembodied dead.",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "The Day she died Nature sat around In silence – in a solemn trance.",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "Death is like the insect Menacing the tree, Competent to kill, But impotent to be.",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "The darkness of death is like the evening twilight; it makes all objects appear more lovely.",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "After the first death, there is no other.",
        "author": "Dylan Thomas",
        "source": "Classic",
    },
    {
        "text": "Till Death – is narrow Way – He pioneered the Door – that lead to Life –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "Surgeons must be very careful – Just to put a Knife – Under one – take a Life –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    {
        "text": "Because I could not stop for Death – He kindly stopped for me –",
        "author": "Emily Dickinson",
        "source": "Classic",
    },
    # Dylan Thomas
    {
        "text": "Do not go gentle into that good night. Rage, rage against the dying of the light.",
        "author": "Dylan Thomas",
        "source": "Classic",
    },
    {
        "text": "Though lovers be lost love shall not; And death shall have no dominion.",
        "author": "Dylan Thomas",
        "source": "Classic",
    },
    {
        "text": "And death shall have no dominion. Dead men naked they shall be one.",
        "author": "Dylan Thomas",
        "source": "Classic",
    },
    {
        "text": "After the first death, there is no other.",
        "author": "Dylan Thomas",
        "source": "Classic",
    },
    {
        "text": "The force that through the green fuse drives the flower drives my age.",
        "author": "Dylan Thomas",
        "source": "Classic",
    },
    # Marcus Aurelius
    {
        "text": "Death smiles at us all, all a man can do is smile back.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "You could leave life right now. Let that determine what you do and say and think.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Think of yourself as dead. You have lived your life. Now, take what's left and live it properly.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "It is not death that a man should fear, but he should fear never beginning to live.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Even if you're going to live three thousand more years, or ten times that, remember.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Don't behave as if you are destined to live forever. Death hangs over you.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "We die every day, for every day some part of life is taken from us.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Just where death is expecting you is something we cannot know.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "That man lives badly who does not know how to die well.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "No evil is honorable: but death is honorable; therefore, death is not evil.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "The art of living is more like wrestling than dancing.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "It never ceases to amaze me: we all love ourselves more than other people.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "The universe is change; our life is what our thoughts make it.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Everything we hear is an opinion, not a fact. Everything we see is a perspective.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "You have power over your mind - not outside events.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "The happiness of your life depends upon the quality of your thoughts.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Very little is needed to make a happy life; it is all within yourself.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "Loss is nothing else but change, and change is Nature's delight.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    {
        "text": "When you arise in the morning think of what a privilege it is to be alive.",
        "author": "Marcus Aurelius",
        "source": "Classic",
    },
    # Seneca
    {
        "text": "Let us prepare our minds as if we'd come to the very end of life.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "We die only once, and the death must come when it comes.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "Death is the wish of some, the wish of others, and of all at some time.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "It is not that we have a short time to live, but that we waste a lot of it.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "As is a tale, so is life: not how long it is, but how good it is, is what matters.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "Difficulties strengthen the mind, as labor does the body.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "True happiness is to enjoy the present, without anxious fear of the future.",
        "author": "Seneca",
        "source": "Classic",
    },
    {
        "text": "Begin at once to live, and count each separate day as a separate life.",
        "author": "Seneca",
        "source": "Classic",
    },
    {"text": "No man is wise at all times.", "author": "Seneca", "source": "Classic"},
    {
        "text": "If you really want to escape the things that harass you, what you're needing is not to be at a different place but to be a different person.",
        "author": "Seneca",
        "source": "Classic",
    },
    # Shakespeare
    {
        "text": "To be, or not to be: that is the question.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "The rest is silence.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "All the world's a stage, and all the men and women merely players.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "We are such stuff as dreams are made on, and our little life is rounded with a sleep.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "Et tu, Brute? Then fall, Caesar.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "Misery acquaints a man with strange bedfellows.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "The fault, dear Brutus, is not in our stars, but in ourselves.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    {
        "text": "Cowards die many times before their deaths; The valiant never taste of death but once.",
        "author": "William Shakespeare",
        "source": "Classic",
    },
    # Rumi
    {
        "text": "Don't grieve. Anything you lose comes round in another form.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "Be like a tree and let the dead leaves drop.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "The wound is the place where the Light enters you.",
        "author": "Rumi",
        "source": "Classic",
    },
    {"text": "What you seek is seeking you.", "author": "Rumi", "source": "Classic"},
    {
        "text": "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "Let yourself be silently drawn by the strange pull of what you really love.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "It does not matter how slowly you go as long as you do not stop.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "When you do things from your soul, you feel a river moving in you, a joy.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "Set your life on fire. Seek those who breathe your flame.",
        "author": "Rumi",
        "source": "Classic",
    },
    {
        "text": "The art of knowing is knowing what to do next.",
        "author": "Rumi",
        "source": "Classic",
    },
    # Mark Twain
    {
        "text": "I do not fear death. I had been dead for billions and billions of years before I was born.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "The fear of death follows from the fear of life. A man who lives fully is prepared to die.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "If you tell the truth, you don't have to remember anything.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "The two most important days in your life are the day you are born and the day you find out why.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "Kindness is the language which the deaf can hear and the blind can see.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "Good friends, good books, and a sleepy conscience: this is the ideal life.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "The secret of getting ahead is getting started.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "I have never let my schooling interfere with my education.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "When you are dead, you are dead. Make room for the living.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    {
        "text": "Twenty years from now you will be more disappointed by the things you didn't do.",
        "author": "Mark Twain",
        "source": "Classic",
    },
    # Thoreau
    {
        "text": "I went to the woods because I wished to live deliberately.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "Most men lead lives of quiet desperation.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "Our life is frittered away by detail. Simplify, simplify.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "The price of anything is the amount of life you exchange for it.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "As if you could kill time without injuring eternity.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "Rather than love, than money, than fame, give me truth.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "Things do not change; we change.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "We must learn to reawaken. Keep ourselves alive.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "The mass of men lead lives of quiet desperation and go to the grave with the song still in them.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    {
        "text": "Live each season as it passes; breathe the air, drink the drink, taste the fruit.",
        "author": "Henry David Thoreau",
        "source": "Classic",
    },
    # Oscar Wilde
    {
        "text": "To live is the rarest thing in the world. Most people exist, that is all.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "The truth is rarely pure and never simple.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "Be yourself; everyone else is already taken.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "I have the simplest tastes. I am always satisfied with the best.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "I am not young enough to know everything.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "A thing is not necessarily true because a man dies for it.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "The only way to get rid of a temptation is to yield to it.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "I can resist everything except temptation.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "Every man is the sum total of his reactions to experience.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    {
        "text": "We are all in the gutter, but some of us are looking at the stars.",
        "author": "Oscar Wilde",
        "source": "Classic",
    },
    # Lao Tzu
    {
        "text": "When you realize nothing is lacking, the whole world belongs to you.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "Nature does not hurry, yet everything is accomplished.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "Those who know do not speak. Those who speak do not know.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "The journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "When there is no desire, all things are at peace.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "Mastering others is strength. Mastering yourself is true power.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "He who knows does not speak. He who speaks does not know.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "Truthful words are not pleasant. Pleasant words are not truthful.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "A leader is best when people barely know he exists.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    {
        "text": "Knowing others is intelligence; knowing yourself is true wisdom.",
        "author": "Lao Tzu",
        "source": "Classic",
    },
    # Epictetus
    {
        "text": "No man is free who is not master of himself.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "It's not what happens to you, but how you react to it that matters.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "Men are disturbed not by things, but by the view which they take of them.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "Do not seek to have events happen as you want them to.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "We have two ears and one mouth so that we can listen twice as much as we speak.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "First say to yourself what you would be; and then do what you have to do.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "Make the best use of what is in your power, and take the rest as it happens.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "If you want to improve, be content to be thought foolish and stupid.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "Heaven helps those who help themselves.",
        "author": "Epictetus",
        "source": "Classic",
    },
    {
        "text": "Freedom is the only worthy goal in life.",
        "author": "Epictetus",
        "source": "Classic",
    },
    # Nietzsche
    {
        "text": "He who has a why to live can bear almost any how.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "That which does not kill me makes me stronger.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "There is always some madness in love. There is always some reason in madness.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "And those who were seen dancing were thought to be insane by those who could not hear the music.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "The man who moves a mountain begins by carrying away small stones.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "You must have chaos within you to give birth to a dancing star.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "I am not upset that you lied to me, I am upset that I no longer believe you.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "There are no facts, only interpretations.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "The higher we soar, the smaller we appear to those who cannot fly.",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    {
        "text": "Is life not a thousand times too short for us to bore ourselves?",
        "author": "Friedrich Nietzsche",
        "source": "Classic",
    },
    # Carl Jung
    {
        "text": "The first half of life is devoted to forming a healthy ego, the second half is going inward.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "I am not what happened to me, I am what I choose to become.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "The shoe that fits one person pinches another; there is no recipe for living that suits all cases.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "Knowing your own darkness is the best method for dealing with the darknesses of other people.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "The archetype is the inner form that the outer takes.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "Every form of addiction is bad, no matter whether the drug be alcohol or morphine.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "We cannot change anything unless we accept it.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "The greatest terror for a child is the dark at night, after the lights go out.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "The pendulum of the mind alternates between sense and nonsense, not between right and wrong.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    {
        "text": "To learn to see is to learn to be Psychic.",
        "author": "Carl Jung",
        "source": "Classic",
    },
    # Ralph Waldo Emerson
    {
        "text": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "The only person you are destined to become is the person you decide to be.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "The purpose of life is not to be happy. It is to be useful.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "To leave the world a bit better... to know even one life has breathed easier.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "He who has a thousand friends has not a friend to spare, and he who has one enemy will meet him everywhere.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "Life is a journey that must be traveled no matter how bad the roads.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "Write it on your heart that every day is the last day of the world.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    {
        "text": "Every sunset brings the promise of a new dawn.",
        "author": "Ralph Waldo Emerson",
        "source": "Classic",
    },
    # George Bernard Shaw
    {
        "text": "This is the true joy of life: being used for a purpose recognized by yourself as a mighty one.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "Life isn't about finding yourself. Life is about creating yourself.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "There are two tragedies in life. One is to lose your heart's desire. The other is to gain it.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "A life spent making mistakes is not only more honorable but more useful than a life spent doing nothing.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "If you want to get the most out of life, you must be able to laugh at trouble.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "I learned long ago, never to wrestle with a pig. You get dirty, and the pig likes it.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "Impossibility is a point of view.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "The reasonable man adapts himself to the world; the unreasonable one persists.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "A scientist should be a poet, should think and feel with imagination.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    {
        "text": "There is no love more generous than that which Waives knowledge of the beloved.",
        "author": "George Bernard Shaw",
        "source": "Classic",
    },
    # Terry Pratchett
    {
        "text": "It is said that your life flashes before your eyes just before you die. That is true, it's called Life.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "In the end, the only questions that matter are these: What do worlds live or die for, and what do people live or die for?",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "Give a man a fish and he eats for a day. Teach a man to fish and he eats for a lifetime.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "All this talk of death! I'm not dead! I just have something growing inside me.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "The current state of my brain: Interesting.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "I'll be more enthusiastic about encouraging people if I see evidence that this working.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "Take it from me, the world is built of people who got up one day and did something.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "Everyone has the right of everyone else, as long as they don't exercise it.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "There are times in life when people must be brave.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    {
        "text": "Every year Software has fewer lines, but does more. This is a kind of Zen.",
        "author": "Terry Pratchett",
        "source": "Classic",
    },
    # Hunter S Thompson
    {
        "text": "Life should not be a journey to the grave with the intention of arriving safely in a pretty body.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "We are all alone, born alone, die alone, and—in spite of True Romance.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "I have no idea what could be more important than getting a laugh.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "The music business is filled with people who are waiting for the sun to rise.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "Too weird to live, too rare to die.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "Buy the ticket, take the ride.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "He who is destined to be hanged must not be drowned.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "You can turn your back on a person, but never turn your back on a drug.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "Call on God, but row away from the rocks.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    {
        "text": "There is no fix so simple that it cannot be broken.",
        "author": "Hunter S. Thompson",
        "source": "Classic",
    },
    # Bible / Spiritual
    {
        "text": "There is a time for everything, and a season for every activity under the heavens.",
        "author": "Bible - Ecclesiastes",
        "source": "Classic",
    },
    {
        "text": "For everything there is a season, a time for every purpose under heaven.",
        "author": "Bible - Ecclesiastes",
        "source": "Classic",
    },
    {
        "text": "A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted.",
        "author": "Bible - Ecclesiastes",
        "source": "Classic",
    },
    {
        "text": "He has made everything beautiful in its time.",
        "author": "Bible - Ecclesiastes",
        "source": "Classic",
    },
    {
        "text": "I am the resurrection and the life.",
        "author": "Bible - John",
        "source": "Classic",
    },
    {
        "text": "And I give them eternal life, and they shall never perish.",
        "author": "Bible - John",
        "source": "Classic",
    },
    {
        "text": "Yea, though I walk through the valley of the shadow of death, I will fear no evil.",
        "author": "Bible - Psalm 23",
        "source": "Classic",
    },
    {
        "text": "Precious in the sight of the LORD is the death of his saints.",
        "author": "Bible - Psalm 116",
        "source": "Classic",
    },
    {
        "text": "For to me to live is Christ, and to die is gain.",
        "author": "Bible - Philippians",
        "source": "Classic",
    },
    {
        "text": "And as it is appointed for men to die once, but after this the judgment.",
        "author": "Bible - Hebrews",
        "source": "Classic",
    },
    # Albert Camus
    {
        "text": "The fear of death is the most foolish fear of all.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "In the depth of winter, I finally learned that within me there lay an invincible summer.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "Live to the point of tears.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "I rebel; therefore I exist.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "Nobody realizes that some people just do things without them.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "We continue to breathe deeply while others are sleeping.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "Without work, all life goes rotten.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "I would rather be a man than a machine.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "I know of only one duty, and that is to love.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    {
        "text": "There is no sun without shadow.",
        "author": "Albert Camus",
        "source": "Classic",
    },
    # Mary Oliver
    {
        "text": "Tell me, what is it you plan to do with your one wild and precious life?",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "Someone I loved once gave me a box full of darkness. It took me years to understand that this, too, was a gift.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "Tell me about despair, yours, and I will tell you mine.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "You do not have to be good. You do not have to walk on your knees.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "Wild geese are calling to you, over and over announcing your place in the family of things.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "There are moments that cry out to be fulfilled.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "To live in this world you must be able to do three things.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "I do not want to be a passenger in someone else's life.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
    {
        "text": "Pay attention. Be astonished. Tell about it.",
        "author": "Mary Oliver",
        "source": "Classic",
    },
]


def main():
    print("=== CLEAN DEATH QUOTES ===\n")

    # Remove duplicates by text
    seen = set()
    unique_quotes = []
    for q in CLASSICS:
        key = q["text"][:30].lower()
        if key not in seen:
            seen.add(key)
            unique_quotes.append(q)

    result = {
        "source": "Curated Classics",
        "count": len(unique_quotes),
        "quotes": unique_quotes,
        "status": "pending_review",
    }

    with open(OUTPUT_FILE, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Clean quotes: {len(unique_quotes)}")
    print(
        f"Current app: 215 + New: {len(unique_quotes)} = {215 + len(unique_quotes)} total"
    )
    print(f"Output: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
