# aframe-refraction-system

## Description

The system creates a THREE.cubeCamera, and provides envMap texture to each registered entity.
If there are no registered entities, the camera is removed.

Needs to work almost realtime to look good, still, I didn't experience fps-drops.


### Attributes

| Property             | Default      | Description                                         |
|----------------------|--------------|-----------------------------------------------------|
| near         		   |      1       | the near clipping distance                          |
| far                  |      200     | The far clipping distance                           |
| resolution           |      256     | Sets the length of the cubeCamera cube's edges      |
| tickrate  		   |      10      | The updateCubeMap (in system), or how often should the texture be updated (in component) |


### Notes:


