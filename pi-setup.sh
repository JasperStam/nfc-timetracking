sudo passwd root
su

# Follow guide to resize partition to have 4gb (1.2gb is not enough):
# https://raspberrypi.stackexchange.com/questions/499/how-can-i-resize-my-root-partition

apt-get update
apt-get upgrade
apt-get install vim zsh screen tree members moreutils mtr-tiny pv rsync curl
apt-get install libpcsclite1 pcsc-tools pcscd libnfc5 python3 python-virtualenv libusb-dev bzr
chsh -s /bin/zsh
adduser kees --disabled-password
adduser modus --disabled-password
chsh -s /bin/zsh modus
su - modus
mkdir app
cd app
virtualenv venv
source venv/bin/activate
pip install libusb1 pyserial
bzr branch lp:nfcpy trunk

# Check if device is recognized (reboot if you get a busy error):
nfc-list

# USB tethering with android:
ip link set usb0 up
dhclient usb0


cat > /etc/systemd/system/modus-nfc.service <<'EOF'
[Unit]
Description=Modus NFC Hacky
After=network.target

[Service]
ExecStart=/home/modus/venv/bin/python scan.py
Restart=always
User=root
WorkingDirectory=/home/modus/
RestartSec=1
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
EOF
systemctl enable modus-nfc
