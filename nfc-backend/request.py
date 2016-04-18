import json
import urllib2

def my_request(url, data):
    try:
        req = urllib2.Request(url, data, {'Content-Type': 'application/json'})
        f = urllib2.urlopen(req)
        response = f.read()
        f.close()
    except urllib2.URLError as e:
        print('Error for ' + str(url))
        print(e)

# TODO: Go fuck yourself.
def post(tag, is_connected):
    action = 'in' if is_connected else 'out'
    data = json.dumps({
        'tag_code': tag,
    })
    my_request('https://webduck.nl/modus/', data)
    my_request('http://localhost:3000/activity/' + action, data)
