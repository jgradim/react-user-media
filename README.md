react-user-media
================

Provides components for access to audio and webcam

Instalation
-----------

```
npm install react-user-media
```

```
import Webcam from "react-user-media";
```

Webcam
------

Renders a `video` element that autoplays the feed from the user's webcam (if allowed). If used with a `ref`, it's possible to take screenshots of the video feed to a data url format.

#### Basic usage

```
<Webcam />
```

#### Advanced usage (screenshots)

In your component, render `Webcam` along with a `ref`:

```
<Webcam ref="webcam" />
```

and then use that ref to access the `captureScreenshot` method. This methods returns a string with a data-url representation of the current frame of the video feed.

```
this.refs.webcam.captureScreenshot();
``` 

See the `examples` folder for more in-depth examples.

#### Props

| **Prop**        | **Type** | **Default**   | 
|-----------------|----------|---------------|
| `audio`         | `bool`   | `true`        | 
| `width`         | `number` | `640`         | 
| `height`        | `number` | `480`         | 
| `captureFormat` | `string` | `"image/png"` | 

