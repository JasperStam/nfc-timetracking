from dotenv import Dotenv
from os import path, environ as env

# First, parse env file and splice it into the OS environment
envpath = path.join(path.dirname(__file__), '..', '.env')
dotenv = Dotenv(envpath)
env.update(dotenv)

# Now, parse and set the settings dict
SETTINGS = {
    'DEBUG': env.get('MODUS_DEBUG', '').lower() == 'true',
    'DATABASE': env.get('MODUS_SQLITE_FILE', '').lower() == 'true',
}
