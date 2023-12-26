const { exec }  = require('child_process');
const path      = require('path');
const soundFile = 'file.wav'


module.exports = (app) => 
  {
  const plugin = {};

  plugin.id = 'serveur-alarm';
  plugin.name = 'Serveur Alarm';
  plugin.description = 'Play sound alarm on usb server port';
  
  let unsubscribes = [];
  const pathFile = path.resolve(__dirname, soundFile);

  plugin.start = (settings) => 
  	{
  	app.debug('Plugin started')

  	let localSubscription = 
		{
		context: 'vessels.self', 
		subscribe: 
			[
			{
			path: 'notifications.navigation.anchor',
			period: settings.timeLoop*1000
			}
			]
		};

	app.subscriptionmanager.subscribe
		(
		localSubscription,
		unsubscribes,
		subscriptionError => 
			{
			app.error('Error:' + subscriptionError);
			},
		delta => 
			{
			delta.updates.forEach(u => 
				{
				if(u.values[0].value.state == "emergency")
					{ 	
					app.debug("Play sound emergency");
					exec('aplay -d ' + settings.soundLength + ' '+ pathFile)
					}
				});
			}
		);
  	}  

  plugin.stop = () => 
  	{
	app.debug('Plugin stopped');
	unsubscribes.forEach(f => f());
  	unsubscribes = [];
  	};
  
  plugin.schema = 
  	{
  	type: 'object',
    	required: ['timeLoop', 'soundLength'],
    	properties: 
    		{
      		timeLoop: 
      			{
			type: 'number',
			title: 'Time loop to check anchorage status',
			default: 5
     		 	},
      		soundLength: 
      			{
			type: 'number',
			title: 'Sound File length',
			default: 2
		      	}
    		}
  	};
  
  return plugin;
  };

