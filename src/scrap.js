// source =
// policy.locations[]

// target = radar.locations[{
// ]

// $= parent.  starts off as 'radar'
// locations:mapping->$.locations

// locations.address:mapping->$.address
// locations.address.number:mapping-> $.num

//knowing the target schema of locations=


/*
  mappings: {
      radar : { jsonata }
      radar: { [
        // to support multiple versions...
        // each object *must* have id & data.  anything else is up to you.
        // typically each target will have whatever it needs to identify/describe the maping
        {id: v2-1, desc: DebugModelV2-1, data: { jsonata } }
      ] },
      acord: [],
}

the JSONata value is generated/stored by editor.
it could be stored with the configuration and read by the client...or it could be stored in a
separate DB and you pass the configId to mapping service.  the mapping service would then
be responsible for retrieving it.   the issue with separating it from the config data is that
when you write the editor, it must now be responsible for storing related data in multiple DBs (issues
with transactions).

 Also, there doesn't have to be an exclusive "mapping service".  it could be part of the radar
 middle layer service.
 Another approach is to make the client responsible for doing mapping and keeping the services
 out of this mess (my favourite approach at this point).   This would involve making an PM
 module that each client would import and use.   The module would only satisfy the API =

 $map( data, jsonata )     // not responsible for reading jsonata config object.  must be passed in.

 // jsonata parameter can be a Promise.   or a URL that will be wrapped in a promise.

 let config = Promise(function(resolve, reject) {
      axios.get('blah/blah/blah')
        .then(response) resolve(response.data)
    }

 $map(data, config)

 OR

 async foo function(url) {
   return axios.get(url)
}

*/
{

    [{
        "location": {
            "ignoredSuggestedEndorsements":[],
            "perilsRequired": [
                "Fire",
                "Lightning",
                "Aircraft",
                "Explosion",
                "Subsidence",
                "Earthquake",
                "Storm",
                "Flood",
                "Escape of water",
                "Balance of risks",
                "Theft",
                "Impact",
                "Accidental damage"
            ],
            "extensions": [],
            "endorsements": [],
            "id": -1,
            "sumsInsured": [
                {
                    "name": "Buildings",
                    "amount": 0,
                    "theft": false,
                    "cover": "I",
                    "rate": 0
                },
                {
                    "name": "Contents",
                    "amount": 0,
                    "theft": false,
                    "cover": "I",
                    "rate": 0
                }
            ],
            "address": {
              street:'main', number:100, city: 'toronto'
            },
            "trade": {
                "primary": null,
                "secondary": null,
                "ratio": 50
            }
        },
    }]
}


// each entity has its own mapping file.
