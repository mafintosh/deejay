# deejay

Music player that broadcasts to everyone on the same network

```
npm install -g deejay
```

On the DJ's machine

```
deejay music.mp3 # plays and broadcasts music.mp3
```

On other computers on the same network

```
deejay # plays music.mp3 at the same time offset as the deejay
```

If there are multiple DJs on the same network you can use the `--station [name]` switch to name your music feed

```
deejay --station=eurodance music.mp3
```

## License

MIT
