# aframe-refraction-system

## Description

The system creates a THREE.cubeCamera, and provides envMap texture to each registered entity.
If there are no registered entities, the camera is removed.

Needs to work almost realtime to look good, still, I didn't experience fps-drops.

Check it out live at this fiddle: https://jsfiddle.net/gftruj/gofdyd1a/6/.



### Attributes

| Property             | Default      | Description                                         |
|----------------------|--------------|-----------------------------------------------------|
| near         		   |      1       | the near clipping distance                          |
| far                  |      200     | The far clipping distance                           |
| resolution           |      256     | Sets the length of the cubeCamera cube's edges      |
| tickrate  		   |      10      | The updateCubeMap (in system), or how often should the texture be updated (in component) |

If the 'far' attribute is low enough, the camera will only catch close objects:
![low far distance](https://github.com/gftruj/aframe-refraction-system/blob/master/pics/Screenshot%20(282).png)


It does not seem to affect my FPS rate 
![59 FPS](https://github.com/gftruj/aframe-refraction-system/blob/master/pics/Screenshot%20(283).png)


Looks amazing with normal maps:
![basic](https://github.com/gftruj/aframe-refraction-system/blob/master/pics/Screenshot%20(286).png)
### Notes:


