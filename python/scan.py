#!/usr/bin/env python
import sys
import nfc
import nfc.clf
import nfc.ndef
import time
import request

try:
    clf = nfc.ContactlessFrontend('usb')
except IOError as e:
    print("No device found!")
    print("Error: " + str(e))
    sys.exit(1)

print("Using device: " + str(clf))

# Docs: https://nfcpy.readthedocs.org/en/latest/modules/clf.html

new_tag = ''
old_tag = ''

def tag_connected(tag):
    print('Connected: ' + tag)
    request.post(tag, True)

def tag_released(tag):
    print('Released: ' + tag)
    request.post(tag, False)

def on_tag_connect(tag):
    global new_tag
    global old_tag
    new_tag = str(tag)

    if old_tag != new_tag:
        tag_connected(new_tag)

    old_tag = new_tag

    return True

def recursive_detect():
    global new_tag
    global old_tag
    new_tag = ''

    started = time.time();
    rdwr_options = {
        'on-connect': on_tag_connect,
    }
    close_after = lambda: time.time() - started > .1
    started = time.time()
    clf.connect(rdwr=rdwr_options, terminate=close_after)

    if new_tag != old_tag:
        tag_released(old_tag)
        old_tag = ''

    time.sleep(.2)
    return True

while recursive_detect():
    pass
