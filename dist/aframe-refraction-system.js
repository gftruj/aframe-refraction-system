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
    let data = this.data;
    this.tick = AFRAME.utils.throttleTick(this.throttledTick, data.tickrate, this);
  },
  throttledTick: function(t, dt) {
    if(typeof this.refractionCamera === 'undefined'){return};
    let position = document.querySelector('a-camera').getAttribute('position');
    if (position) {
      this.refractionCamera.position.set(position.x, position.y, position.z);
    }
    this.refractionCamera.updateCubeMap(AFRAME.scenes[0].renderer, this.el.sceneEl.object3D)
  },
  getTexture() {
    return this.refractionCamera.renderTarget.texture;
  },
  registerMe: function(el) {
    let data = this.data;
    this.entities.push(el);
    if (this.entities.lenght != 0) {
      if (!this.refractionCamera) {
        this.refractionCamera = new THREE.CubeCamera(data.near, data.far, data.resolution);
        this.refractionCamera.renderTarget.texture.mapping = THREE.CubeRefractionMapping;
        this.el.object3D.add(this.refractionCamera);
      }
    };
  },
  unregisterMe: function(el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
    if (this.entities.length === 0) {
      this.el.object3D.remove(this.refractionCamera);
    }
  }
});
AFRAME.registerComponent('refraction-component', {
  schema: {
    tickrate: {
      type: 'number',
      default: 10
    }
  },
  init: function() {
    this.system.registerMe(this.el);
    this.counter = 0;
    this.tick = AFRAME.utils.throttleTick(this.throttledTick, this.data.tickrate, this);
  },
  throttledTick: function(t, dt) {
    //TODO use frustums or something to make this acceptable
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