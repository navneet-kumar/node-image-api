
### Project description 
JSON-based REST API service which resizes images into `100x100px` thumbnails.

### How to run
Runnable with a single command.<br/>
```
docker-compose up
```

#### Alternative
navigate to directory containing .Dockerfile and build and execute your image using following commands :<br/>
```
docker build -t node-image-api .
docker images
docker run -p 3000:3000 -d node-image-api
docker ps
docker logs <container id>
```

### Usage
#### Making request using `curl`
```bash
curl --location --request POST 'http://127.0.0.1:3000/resize' \
--header 'Content-Type: multipart/form-data; boundary=--------------------------389759405236923940723361' \
--form 'image=@/Users/navneet.kumar/Desktop/Coffee.jpg'
```

#### sample response
```json
{
    "status": "success",
    "message": "Request queued successfully",
    "downloadUrl": "http://127.0.0.1:3000/download/604266fb458a89cc8b35b9670620eded.jpeg"
}
```


### How to test
you can easily execute test using following command :
```js
npm test
```

### architecture
[Architecture diagram](docs/architecture.png)

### Host this service


### corner cases

### improvements
- [ ] add config post parameter and externalise and custom configuration so that user can decide the output dimension (100x100), scaling, [e.t.c](https://sharp.pixelplumbing.com/api-resize#parameters)
- [ ] Implement queue on seprate container so that we can scale the request accepting api (Producers) also we need to put load balancer in front also create a fail safe (redundant) queue.
- [ ] Move job processors (Consumer) into container so that we can scale in peak period.
- [ ] Implement queue watcher which is capable of creating new consumers in case of high traffic and also scale down when not needed.
- [ ] Retention policy for the processed images and also perodically clean up policy for efficient use of storage.
