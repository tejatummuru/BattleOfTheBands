import json
import random

# List of genres
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

# Load the previously generated artists data
with open('artists_data.json', 'r') as file:
    artists_data = json.load(file)["artists"]

# Function to generate random genres for an album
def generate_random_album_genres(max_genres=3):
    return random.sample(genres, k=random.randint(1, max_genres))

# Function to generate dummy album data for an artist
def generate_albums_for_artist(artist, num_albums=3):
    albums = []
    for i in range(num_albums):
        album_genres = generate_random_album_genres()
        album = {
            "album_type": "compilation",
            "total_tracks": random.randint(5, 15),
            "available_markets": ["CA", "BR", "IT"],
            "external_urls": {
                "spotify": f"https://open.spotify.com/album/{artist['id']}{i}"
            },
            "href": f"https://api.spotify.com/v1/albums/{artist['id']}{i}",
            "id": f"{artist['id']}{i}",
            "images": [
                # ... (image data as before) ...
            ],
            "name": f"Album {i} of {artist['name']}",
            "release_date": f"{random.randint(1980, 2020)}-{random.randint(1, 12):02d}",
            "release_date_precision": "month",
            "restrictions": {"reason": "market"},
            "type": "album",
            "uri": f"spotify:album:{artist['id']}{i}",
            "artists": [artist],
            "tracks": {
                # ... (track data as before) ...
            },
            "copyrights": [{"text": "Copyright text", "type": "C"}],
            "external_ids": {"isrc": "ISRC code", "ean": "EAN code", "upc": "UPC code"},
            "genres": album_genres,
            "label": "Demo Label",
            "popularity": random.randint(0, 100)
        }
        albums.append(album)
    return albums

# Generate albums for each artist
all_albums = []
for artist in artists_data:
    artist_albums = generate_albums_for_artist(artist)
    all_albums.extend(artist_albums)

# Save the albums data to a JSON file
albums_data = {"albums": all_albums}
with open('albums_data.json', 'w') as file:
    json.dump(albums_data, file, indent=4)
