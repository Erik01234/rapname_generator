from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

class MessagePayload(BaseModel):
    firstname: str
    lastinitial: str
    gender: str
    howmany: str

@app.post("/api/ping")
async def read_item(payload: MessagePayload):
    toReturn = []
    for _ in range(int(payload.howmany)):
        toReturn.append(generate_rap_name(first_name=payload.firstname, last_initial=payload.lastinitial, gender=payload.gender))
    return {"reply": f"{toReturn}"}


import random
from typing import Dict, List, Optional


DEFAULT_WORD_BANKS: Dict[str, List[str]] = {
    "titles": [
        "Mr.", "Rula", "Ruler", "Preacher",
        "Honorable", "MC", "EmCee", "Em-C", "Dr.", "Boss",
        "Big", "Unc", "Don", "Chief", "Sir", "Yung", "Da",
        "Tha", "Prof.", "Captain", "King", "Lord", "General", "Colonel", 
        "OG", "Raw", "Professor", "Emperor", "Sensei", "Grandmaster", 
        "Master", "Sultan"
    ],
    "adjectives": [
        "Diligent", "Special", "Smooth", "Free Style", "Lil", "Young",
        "Cold", "Fast", "Shady", "Gangsta", "Icy", "Immortal", "Bad",
        "Jiggy", "Wild", "Saucy", "Easy", "Royal", "Nasty", "Bizzy",
        "Lucid", "Slick", "Wicked", "Dirty", "Little", "Big", "Biggie",
        "Heavy", "Butter", "Banana", "Deja", "Sus", "Salty", "Grimy",
        "Tuff", "Certified", "Saggy", "Round", "Fat", "Skinny", "Raggedy",
        "Beat", "Dope", "Weak", "Fresh", "Goofy", "Trash", "Whack", 
        "Tight", "Banger", "Baller", "Faded", "Funky", "Mad", "Straight",
        "Twisted", "Bussin", "Fire", 
        "Ruthless", "Brutal", "Savage", "Vicious", "Ferocious", "Fierce",
        "Gritty", "Deadly", "Lethal", "Coldblooded", "Heartless", "Merciless", 
        "Bulletproof", "Unstoppable", "Untouchable", "Crooked", "Outlaw", 
        "Rogue", "Savage", "Menacing", "Sinister", "Dark", "Nocturnal", 
        "Hustlin", "Thuggin", "Stealth", "Vicious", "Cringe", "Based", 
        "Chad", "Gooner", "Braindead", "Cheesy", "Smelly", "Thicc", 
        "Mid", "Zesty", "Chopped", "Cooked", "Cracked", "Peak", "GOATed",
        "Riggidy", "Chinese", "Satanist", "Antisemitic", "Fugly", "Hellish",
        "Zooted", "Shy", "Bloody", "Wet", "Holy", "Grim", "Nonchalant",
        "Sloppy", "Slutty", "Filthy", "Spicy", "Staggering", "Sublime",
        "Afwul", "Slippin", "Screaming", "Creamy", "Smoky", "Heartbreaking",
        "Thick", "Violent", "Sinful", "Wasted", "Scrappy", "Exquisite",
        "Elemental", "Natural", "Bombastic", "Cheeky", "Devious", "Slim", 
        "Wretched", "Shameless", "Viscious", "Gross", "Dreadful", "Monstrous",
        "Pathetic", "Miserable", "Worthless", "Hostile", "Macho",
        "Excellent", "Remarkable", "Monumental", "Unusual", "Unprecedented",
        "Abnormal", "Freakish", "Remarkable", "Jiggly", "Stinky", "Starvin'",
        "Infrared"
    ],
    "money": [
        "Dollar", "Dolla", "Lotto", "Money", "Cash", "Gold", "Bag", 
        "Cheese", "Loot", "Cheddar", "Scrilla", "Benjamin", "Buck",
        "Dough", "Green", "Ghetto",
        "Stackz", "Stacks", "Racks", "Bling", "Ice", "Diamonds", "Platinum",
        "Paper", "Fat Stacks", "Million", "Billion", "Vault", "Safe", "Stax",
        "NFTs", "V-Bucks", "Robux", "Crypto", "Coupons", "Food Stamps"
    ],
    "nouns": [
        "Beats", "Trigga", "Havoc", "Slice", "Sling", "Block", "Frost",
        "Thug", "Hitman", "Grim", "Tickle", "Scam", "Rough", "Love",
        "Sheets", "Doom", "Mix", "Gunshot", "Jam", "Sharp", "Cobra",
        "Blunt", "Jab", "Swoop", "Bash", "Punch", "Fist", "Justice",
        "Zone", "Spin", "Wack", "Face", "Cookies", "Smack", "Rhythm",
        "Curves", "Juice", "Box", "Killah", "Slide", "Grind", "Force",
        "Cherry", "Angel", "Blush", "Chilli", "Flava", "Mystique", "Tang",
        "Cube", "Scratch", "Blood", "Style", "Pimpz", "Tripp", "Daddy",
        "Nugget", "Plug", "Snitch", "Rat", "Shawty", "Finesse", "Hater",
        "Gas", "Burner", "Menace", "Fire", "Heat", "Booty", "Clown",
        "Cop", "Dawg", "Fade", "Fly", "Game", "Herb", "Piece", "Playa",
        "Shank", "Shorty", "Skeezer", "Whip", "Rizz", "Aura", "Gyatt",
        "Crib", "Scrub", "N*gga", "Digga", "Don", "Hottie", "Hustler",
        "Pussy", "Head", "Ride", "Monster", "Piece"
        "Reaper", "Demon", "Beast", 
        "Hit", "Shot", "Slug", "Clip", "Trigger",
        "Riot", "Chaos", "Mayhem", "Wrath", "Fury", "Rage", "Venom",
        "Fang", "Claw", "Razor", "Blade", "Axe", "Hammer", "Goon",
        "Mob", "Syndicate", "Cartel", "Assassin", "Executioner", "Predator",
        "Hunter", " Stalker", "Phantom", "Ghost", "Wraith", "Terror",
        "Horror", "Nightmare", "Blitz", "Slayer", "Bruiser", 
        "Enforcer", "Kingpin", "Warlord", "Overlord", "Incel", "Foid",
        "Baka", "Moron", "Alpha", "Simp", "Cuck", "Chad", "Karen",
        "Boomer", "Zoomer", "Dingus", "Doofus", "Knucklehead", "Numbskull",
        "Numbnut", "Sausage", "Snot", "Blud", "GOAT", "Griddy", "Aura",
        "Bussy", "Dih", "Drip", "Function", "Glizzy", "Goy", "Opp",
        "Situationship", "Son", "Skill", "Twin", "Zaza", "Skank", 
        "Dildo", "Fleshlight", "Bitchass", "Nerd", "Golddigger", "Nazi",
        "Fatty", "Rizza", "Bomb", "Terrorist", "Dickbag", "Cunt", "Bastard",
        "Misery", "Motherfucker", "Fuckhead", "Smegma", "Puke", 
        "Squirtmaster", "Ninja", "Papa", "Pookie", "Crackhouse", "Sucka",
        "Fent", "Needle", "Bong", "Mogger", "Heat", "Jizz", "High",
        "Powder", "Lean", "Acid", "Pizza", "Bars", "Faker", "Pozer", 
        "Goblin", "Feast", "Penetration", "Squirt", "House", "Smack", 
        "Piss", "Dick", "Cock", "Balls", "Feet", "Face", "Head", "Legend",
        "Fart", "Pissant", "Degenerate", "Baldy", "Gypsy", "Tricksta",
        "Clown", "Bazooka", "Beads", "Slave", "Lover", "Genitals",
        "Titty", "Bullet", "Dummy", 
    ],
}

def split_syllable_roughly(word: str) -> Optional[str]:
    if len(word) < 4:
        return None
    mid = (len(word) + 1) // 2
    return f"{word[:mid]} {word[mid:]}"


def build_name_variants(first_name: str, last_initial: Optional[str] = None, gender: str = "male") -> Dict[str, List[str]]:
    clean_first = first_name.strip()
    if not clean_first:
        raise ValueError("first_name must not be empty")

    first_init = clean_first[0].upper()
    last_init = last_initial.strip()[0].upper() if last_initial and last_initial.strip() else None

    names = {clean_first, first_init}
    #split = split_syllable_roughly(clean_first)
    #if split:
        #names.add(split)

    lower = clean_first.lower()
    if not lower.endswith(("a", "e", "i", "o", "u")):
        names.add(f"{clean_first}y")
        names.add(f"{clean_first}y {last_init}")

    if gender == "male":
        names.add(clean_first+"-san")
    elif gender == "female":
        names.add(clean_first+"-chan")

    initials = {first_init}
    if last_init:
        initials.add(last_init)
        initials.add(f"{first_init}{last_init}")
        initials.add(f"{last_init}{first_init}")
        initials.add(f"Triple {last_init}")
        initials.add(f"{first_init} Triple {last_init}")
        initials.add(f"Triple {first_init}")

    return {
        "names": list(names),
        "initials": list(initials),
    }

def build_adj_variants(adjectives: list, ahh_probability):
    toreturn = []
    for item in adjectives:
        if random.random() < ahh_probability: 
            toreturn.append(item + "-ahh")
        else:
            toreturn.append(item)
    return toreturn


def generate_rap_name(
    first_name: str,
    last_initial: Optional[str] = None,
    banks: Dict[str, List[str]] = DEFAULT_WORD_BANKS,
    aka_probability: float = 0.2,
    ahh_probability: float = 0.1,
    gender: str = "male"
) -> str:
    variants = build_name_variants(first_name, last_initial, gender)
    names = variants["names"]
    initials = variants["initials"]
    adjvariants = build_adj_variants(banks["adjectives"], ahh_probability)
    used = set()

    def unique_pick(pool: List[str]) -> str:
        candidates = [item for item in pool if item.lower() not in used]
        chosen = random.choice(candidates if candidates else pool)
        used.add(chosen.lower())
        return chosen

    templates = [
        lambda: [unique_pick(adjvariants), unique_pick(initials), unique_pick(adjvariants), unique_pick(banks["nouns"])],
        lambda: [unique_pick(initials), unique_pick(names), unique_pick(initials), unique_pick(banks["nouns"])],
        lambda: [unique_pick(initials), unique_pick(names), unique_pick(banks["nouns"])], 
        lambda: [unique_pick(banks["titles"]), unique_pick(names), unique_pick(initials), unique_pick(banks["nouns"])],
        lambda: [
            unique_pick(adjvariants),
            unique_pick(banks["money"]),
            unique_pick(names),
            unique_pick(initials),
            unique_pick(banks["nouns"]),
        ],
        lambda: [unique_pick(names), unique_pick(adjvariants), unique_pick(banks["nouns"])],
        lambda: [
            unique_pick(banks["titles"]),
            unique_pick(banks["money"]),
            unique_pick(initials),
            unique_pick(names),
            unique_pick(banks["nouns"]),
        ],
        lambda: [
            unique_pick(adjvariants),
            unique_pick(adjvariants),
            unique_pick(initials),
            unique_pick(banks["nouns"])],
        lambda: [
            unique_pick(adjvariants),
            unique_pick(names),
            unique_pick(initials),
            unique_pick(banks["nouns"]),
        ],
        lambda: [
            unique_pick(banks["titles"]),
            unique_pick(adjvariants),
            unique_pick(names),
            unique_pick(initials),
            unique_pick(banks["nouns"]),
        ],
        lambda: [
            unique_pick(adjvariants),
            unique_pick(names),
            unique_pick(initials),
            unique_pick(banks["nouns"]),
            unique_pick(banks["nouns"]),
        ],
        lambda: [
            unique_pick(banks["titles"]),
            unique_pick(initials),
            unique_pick(adjvariants),
            unique_pick(adjvariants),
            unique_pick(banks["nouns"]),
        ],
        lambda: [
            unique_pick(adjvariants),
            unique_pick(banks["money"]),
            unique_pick(initials),
            unique_pick(names),
            unique_pick(banks["nouns"]),
            unique_pick(banks["nouns"]),
        ],
    ]
    weights = [5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10]

    selected_template = random.choices(templates, weights=weights, k=1)[0]
    result = " ".join(selected_template())

    if random.random() < aka_probability:
        aka_modifiers = adjvariants + banks["money"]
        result += f" a.k.a. {random.choice(aka_modifiers)} {random.choice(banks['nouns'])}"

    return result