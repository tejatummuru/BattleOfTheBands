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

if __name__ == '__main__':
    app.run(debug=True)
