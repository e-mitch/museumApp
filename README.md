# museumApp

* Use the following code in GetCoordinates Cloud Function

```
import requests
import json 

def getCoordinates(request):
  request_json = request.get_json()
  if request.args:
      zipcode = request.args.get('zip')
      URL="https://maps.googleapis.com/maps/api/geocode/json?components=postal_code%3A"+zipcode+"%7Ccountry%3AUS&key=AIzaSyD-bm4og0qfSjwjBD6OR08KcDeKRDt7vd8"
      r = requests.get(url=URL)
      data = r.json()
      coords = data['results'][0]['geometry']['location']
      if request.method == 'OPTIONS':
        headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
      headers = {
        'Access-Control-Allow-Origin': '*'
      }
      return (json.dumps(coords), 200, headers)
  elif request_json:
      return request_json
  else:
      return f'parameters didn not work'

#add 'requests' to requirements.txt
```

* Use the following code in getData Cloud Function
```
import requests
import json 

def getData(request):
    request_json = request.get_json()
    if request.args:
        #add verification details
        lat = request.args.get('lat')
        lon = request.args.get('lon')
        zipcode = request.args.get('zip')
        URL="https://maps.googleapis.com/maps/api/place/textsearch/json?query=museum+" + zipcode + "&location=" + lat + "," + lon + "&radius=1000&key=AIzaSyD-bm4og0qfSjwjBD6OR08KcDeKRDt7vd8"
        r = requests.get(url=URL)
        data = r.json()
        readyData = formatData(data)
        if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600'
            }

            return('',204, headers)
        headers = {
            'Access-Control-Allow-Origin': '*'
        }
        return (json.dumps(readyData), 200, headers)
    elif request_json:
        return request_json
    else:
        return f'parameters didn not work'

def formatData(data):
    results = data['results']
    resultsList = []

    for result in results:
        name = ""
        address = ""
        rating = 0
        numRatings = 0
        openNow = False;
        if 'permanently_closed' in result.keys():
            continue
        if 'name' not in result.keys():
            continue
        else:
            name = result['name']
            currentDict = {
                'name':name,
            }
        if 'formatted_address' in result.keys():
            currentDict['address'] = result['formatted_address']
        if 'rating' in result.keys():
            currentDict['rating'] = result['rating']
        if 'user_rating_total' in result.keys():
            currentDict['numRatings'] = result['user_ratings_total']
        if 'opening_hours' in result.keys():
            currentDict['openNow'] = result['opening_hours']['open_now']
        resultsList.append(currentDict)
    return resultsList
    
    #add 'requests' to requirements.txt

```
