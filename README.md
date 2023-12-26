# server_alarm
plugin signalk

This plugin allows you to connect a loudspeaker directly to your signalk server and play an audio file repeatedly when the AnchorAlarm plugin is in emergency state.
You can use a USB mini speaker which is configured by defauft on the server.
The plugin works with the aplay library, if it is not installed: sudo apt-get install aplay
On raspberry to configure USB audio by default create a file /etc/asound.conf and record: defaults.pcm.card 3 (if 3 is the number of the USB audio port)

Now you can sleep nicely until your alarm ring!
