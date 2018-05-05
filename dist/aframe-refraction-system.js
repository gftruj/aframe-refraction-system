/* globals AFRAME */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME' +
    ' was available.');
}

AFRAME.registerSystem('refraction-component', {
  schema: {
    near: {
      type: 'number',
      default: 1
    },
    far: {
      type: 'number',
      default: 200
    },
    resolution: {
      type: 'number',
      default: 256
    },
    tickrate: {
      type: 'number',
      default: 10
    }
  },
  init: function() {
    this.entities = [];
    this.refractionCamera = null
    this.el.addEventListener("camera-set-active", (e)=> this.getCameraPosition())
  },
  getCameraPosition: function() {
      this.camera = document.querySelector('[camera]')
      if(!this.camera) {
        this.camera = document.querySelector('a-camera')
      }
      this.cameraPos = this.camera ? this.camera.getAttribute('position') : null
  },
  throttledTick: function(t, dt) {
    if(!this.refractionCamera){return};
    if (this.cameraPos) {
      this.refractionCamera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);
    }
    this.refractionCamera.update(AFRAME.scenes[0].renderer, this.el.sceneEl.object3D)
    for (let i = 0; i < this.entities.length; i++){
        this.entities[i].components["refraction-component"].updateMaterial()
    }
  },
  getTexture() {
    return this.refractionCamera.renderTarget.texture;
  },
  update: function() {
    let data = this.data;
    if (this.refractionCamera)
      delete this.refractionCamera
    this.tick = AFRAME.utils.throttleTick(this.throttledTick, data.tickrate, this);
    this.refractionCamera = new THREE.CubeCamera(data.near, data.far, data.resolution);
    this.refractionCamera.renderTarget.texture.mapping = THREE.CubeRefractionMapping;
    this.el.object3D.add(this.refractionCamera);
  },
  remove: function() {
    if (this.refractionCamera) {
      delete this.refractionCamera
      this.el.object3D.remove(this.refractionCamera);
    }
  },
  registerMe: function(el) {
    this.entities.push(el);
  },
  unregisterMe: function(el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  }
});

AFRAME.registerComponent('refraction-component', {
  init: function() {
    this.system.registerMe(this.el);
  },
  updateMaterial: function() {
    this.mesh = this.el.getObject3D('mesh');
    if (this.mesh) {
      this.mesh.material.visible = false;
      this.mesh.material.envMap = this.system.getTexture();
      this.mesh.material.visible = true;
    }
  },
  remove: function() {
    this.system.unregisterMe(this.el);
    this.mesh.material.envMap = null;
  }
});