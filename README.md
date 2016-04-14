# Install

```
apt-get install python3 python-virtualenv
```

1. `virtualenv venv -p python3`
1. `source venv/bin/activate`
1. `make build`

# Migrate DB

1. `cd python-server`
2. `python`
3. `from db import db`
4. `db.create_all()`
