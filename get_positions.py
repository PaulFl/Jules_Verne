from requests_html import HTMLSession
import json

gitana_url = "http://gitana-team.geovoile.com/tropheejulesverne/2020/tracker/?lg=fr"
sodebo_url = "https://sodebo-voile.geovoile.com/tropheejulesverne/2020/tracker/?lg=fr"

data = {}

# Gitana

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:82.0) Gecko/20100101 Firefox/82.0',
           'Upgrade-Insecure-Requests': '1',
           'If-None-Match': "637418997940064246",
           'Host': "gitana-team.geovoile.com",
           'Cookie': 'ASP.NET_SessionId=ilhxxwzt1k0cg2lxq2rigaes',
           'Connection': 'keep-alive',
           'Cache-Control': 'max-age=0',
           'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
           'Accept-Encoding': 'gzip, deflate',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
           }

session = HTMLSession()
r = session.get(gitana_url, headers=headers)
r.html.render(timeout=10, sleep=2)

index = r.html.full_text.find("Situation")
coordonnees_gitana_raw = r.html.full_text[index:index + 50].split('\n')
gitana_lat_lon = []
for elt in coordonnees_gitana_raw:
    if elt.find("°") != -1:
        gitana_lat_lon.append(elt)


data['gitana'] = {}
data['gitana']['lat'] = gitana_lat_lon[0].replace('°', ',').replace('\'', ',').replace('.', ',')
data['gitana']['lng'] = gitana_lat_lon[1].replace('°', ',').replace('\'', ',').replace('.', ',')
data['gitana']['cap'] = int(gitana_lat_lon[2].replace(' °', ''))

r = session.get(sodebo_url, headers=headers)
r.html.render(timeout=10, sleep=2)

index = r.html.full_text.find("Situation")
coordonnees_sodebo_raw = r.html.full_text[index:index + 50].split('\n')
sodebo_lat_lon = []
for elt in coordonnees_sodebo_raw:
    if elt.find("°") != -1:
        sodebo_lat_lon.append(elt)


data['sodebo'] = {}
data['sodebo']['lat'] = sodebo_lat_lon[0].replace('°', ',').replace('\'', ',').replace('.', ',')
data['sodebo']['lng'] = sodebo_lat_lon[1].replace('°', ',').replace('\'', ',').replace('.', ',')
data['sodebo']['cap'] = int(sodebo_lat_lon[2].replace(' °', ''))


print(data)
json_data = json.dumps(data, indent=4)

json_file = open('ultims_data.json', 'w')
json_file.write(json_data)
json_file.close()