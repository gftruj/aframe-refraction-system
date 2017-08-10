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

### Some visual examples
If You don't want to check out my fiddle:<br />

If the 'far' attribute is low enough, the camera will only catch close objects:<br />
![low far distance](https://github.com/gftruj/aframe-refraction-system/blob/master/pics/Screenshot%20(282).png)<br />


It does not seem to affect my FPS rate :<br />
![59 FPS](https://github.com/gftruj/aframe-refraction-system/blob/master/pics/Screenshot%20(283).png)<br />


Looks amazing with normal maps:<br />
![basic](https://github.com/gftruj/aframe-refraction-system/blob/master/pics/Screenshot%20(286).png)<br />
### Notes:
 -  do realize that "realtime" is the opposite of "good performance". At least this simple project may be of use to someone willing to expand it

 - I do not attach the cubeCamera to the <a-camera>. The cubeCamera scale gets messed up, so instead of adjusting it I change its position, so the envMap won't look ridiculous. This is a bad idea since its more wasteful then adding one camera to the other, but I'll need to work out the scaling issue.

 - I'm not sure if system tick's work with component tick's, so each of them has one: the system updates the cubemap, the component updates the texture on their ticks.
