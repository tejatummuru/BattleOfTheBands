import json

# List of genres obtained from Spotify API
genres = [
    "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass",
    "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children",
    "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house",
    "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic",
    "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove",
    "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays",
    "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol",
    "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc",
    "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party",
    "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock",
    "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll",
    "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska",
    "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango",
    "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"
]

# We will generate a JSON file with dummy artist data
# Each artist will have a name and associated genres

# Dummy artist names
artist_names = [f"Artist {i}" for i in range(1, 101)]

# Function to create a random list of genres for each artist
import random

def generate_random_genres(genres, max_genres=3):
    return random.sample(genres, k=random.randint(1, max_genres))

# Creating a list of artist data with random genres
artist_data = [{
    "external_urls": {
        "spotify": f"https://open.spotify.com/artist/{i}"
    },
    "followers": {
        "href": None,
        "total": random.randint(1000, 1000000)
    },
    "genres": generate_random_genres(genres),
    "href": f"https://api.spotify.com/v1/artists/{i}",
    "id": f"{i}",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab6761610000e5eb1eb16cb1e32a3ec51c01896b",
            "width": 640
        },
        {
            "height": 320,
            "url": "https://i.scdn.co/image/ab676161000051741eb16cb1e32a3ec51c01896b",
            "width": 320
        },
        {
            "height": 160,
            "url": "https://i.scdn.co/image/ab6761610000f1781eb16cb1e32a3ec51c01896b",
            "width": 160
        }
    ],
    "name": name,
    "popularity": random.randint(0, 100),
    "type": "artist",
    "uri": f"spotify:artist:{i}"
} for i, name in enumerate(artist_names, 1)]

# Writing the artist data to a JSON file
json_data = json.dumps({"artists": artist_data}, indent=4)
with open('artists_data.json', 'w') as file:
    file.write(json_data)

# Since we cannot write to a file in this environment, we will return the JSON data
# If you run this code in a local environment,

