import requests

def searchArtists(access_token, query):
    search_endpoint = 'https://api.spotify.com/v1/search'
    params = {'q': query, 'type': 'artist', 'limit': 1}
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(search_endpoint, headers=headers, params=params)

    if response.status_code == 200:
        json_data = response.json()
        # This already gets the 'items' list directly.
        artists_list = json_data.get('artists', {}).get('items', [])
        return artists_list
    else:
        return 'Failed to fetch artists'
