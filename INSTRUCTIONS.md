### Instructions for serving the 3D Tiles Samples with a local server

In order to access these samples from a Cesium Sandcastle, the data has to be provided by a server that is running locally.

- Download and install Node.js and npm from https://nodejs.org/en/download/

- At the command line, run 

  `npm install http-server -g`

  This will install the 'http-server' app from https://github.com/http-party/http-server globally
  
- In the directory that contains the sample data (for example, the `3d-tiles-samples` directory), run
  
  `http-server -a localhost -p 8003 --cors=http://localhost:8080/`
  
  This will start the server, under the address `localhost`, using port `8003`. The `cors` parameter will allow the Cesium Sandcastle to access the data from this locally running server.
  
In the Cesium Sandcastle, a tileset can be created by setting its `url` to point to the tileset that should be loaded from the local sever:
```JavaScript
const tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:8003/example/tileset.json'
}));
```

