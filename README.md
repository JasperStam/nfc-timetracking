# Modus

## Requirements

```
apt-get install python3 python-virtualenv
```

- Node v4+
- npm v2+

## Install

1. `virtualenv venv -p python3`
1. `source venv/bin/activate`
1. `make build`

## Running

### Development

1. `cd frontend; npm start`
1. `cd api; python server.py`

## Migrate DB

1. `cd api`
2. `python`
3. `from db import db`
4. `db.create_all()`
