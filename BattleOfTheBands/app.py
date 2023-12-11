from flask import Flask, jsonify, request
from spotify_integration import searchArtists
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

@app.route('/')
@cross_origin()  # This enables CORS for all domains on this route. You can also specify origins here.
def index():
    return "Hello, World!"

@app.route('/search_artists', methods=['GET', 'POST'])
@cross_origin()
def search_artists():
    data = request.json
    access_token = data.get('accessToken')
    query = data.get('query')
    artists = searchArtists(access_token, query)
    
    # If searchArtists returns 'Failed to fetch artists', you may want to handle it:
    if artists == 'Failed to fetch artists':
        return jsonify({'error': 'Failed to fetch artists'}), 500

    return jsonify({'artists': artists})

@app.route('/artist_albums', methods=['POST'])
@cross_origin()
def artist_albums():
    data = request.json
    artist_id = data.get('artistId')
    access_token = data.get('accessToken')
    # Implement logic to fetch albums using Spotify API
    albums = fetch_artist_albums(artist_id, access_token)
    return jsonify({'albums': albums})

@app.route('/album_details', methods=['POST'])
@cross_origin()
def album_details():
    data = request.json
    album_id = data.get('albumId')
    access_token = data.get('accessToken')
    # Implement logic to fetch album details using Spotify API
    album_info = fetch_album_details(album_id, access_token)
    return jsonify({'albumDetails': album_info})


if __name__ == '__main__':
    app.run(debug=True)
