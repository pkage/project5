# project5

a hacky terminal running in browser, connected to a docker backend

## demo

[![watch the demo](demo/videolink.png)](https://youtu.be/RvRU0PaQOZs)

## disclaimer

This is probably not that great and has very little security whatsoever.
I have not attempted any sort of authentication past the flashy little password (`foobar`) at the front.
Please don't actually use this for anything important without significantly hardening the server.

## installation

install [docker](https://docker.com), then:

```
$ git clone https://github.com/pkage/project5
$ cd project5
$ cd docker && ./build.sh && ./runlocally.sh
$ npm i
$ node server.js
```

## command line options

```
$ node server.js --port 8080 --vm DOCKER_IMAGE_NAME
```

By default, it looks for a docker image to attach to called `sandbox`. Right now, if you want to change it to create a new docker instance per client, change line 26 in server.js.


