import React, { createRef } from "react";
import * as three from "three";
import { OrbitControls } from "./OrbitControls";
import { VolumeRenderShader } from "./VolumeShader";

export class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = createRef();

    this.scene = undefined;
    this.renderer = undefined;
    this.camera = undefined;
    this.config = {
      clim1: 0,
      clim2: 0.25
    };
  }

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new three.Scene();

    // Create renderer
    const canvas = this.canvas.current;
    const context = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false
    });
    this.renderer = new three.WebGLRenderer({ canvas, context });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    const texture = this.getTexture(this.props.data);

    // Create camera
    const frustrumHeight = 512;
    const aspectRatio = width / height;
    this.camera = new three.OrthographicCamera(
      (-frustrumHeight * aspectRatio) / 2,
      (frustrumHeight * aspectRatio) / 2,
      frustrumHeight / 2,
      -frustrumHeight / 2,
      0.1,
      10000
    );
    this.camera.position.set(0, texture.lengthX, 0);
    this.camera.up.set(0, 1, 0);

    // Create camera controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener("change", this.updateScene.bind(this));
    controls.target.set(
      texture.lengthX / 2,
      texture.lengthY / 2,
      texture.lengthZ / 2
    );
    controls.minZoom = 0.5;
    controls.maxZoom = 4;
    controls.update();

    const shader = VolumeRenderShader;

    const uniforms = three.UniformsUtils.clone(shader.uniforms);
    uniforms["u_data"].value = texture.data;
    uniforms["u_size"].value.set(
      texture.lengthX,
      texture.lengthY,
      texture.lengthZ
    );
    uniforms["u_clim"].value.set(0, 0.5);

    const material = new three.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: three.BackSide // The volume shader uses the backface as its "reference point"
    });

    const geometry = new three.BoxBufferGeometry(
      texture.lengthX,
      texture.lengthY,
      texture.lengthZ
    );
    geometry.translate(
      texture.lengthX / 2 - 0.5,
      texture.lengthY / 2 - 0.5,
      texture.lengthZ / 2 - 0.5
    );

    var mesh = new three.Mesh(geometry, material);
    this.scene.add(mesh);

    this.updateScene();
  }

  getTexture() {
    const { array, lengthX, lengthY, lengthZ } = this.props.data;

    let maxValue = 0;
    for (let i = 0; i < array.length; i++) {
      maxValue = Math.max(maxValue, array[i]);
    }

    const textureArray = new Float32Array(array.length);

    for (let i = 0; i < array.length; i++) {
      textureArray[i] = Math.sqrt(array[i] / maxValue);
    }

    const data = new three.DataTexture3D(
      textureArray,
      lengthX,
      lengthY,
      lengthZ
    );
    data.format = three.RedFormat;
    data.type = three.FloatType;
    data.unpackAlignment = 1;

    return {
      data,
      lengthX,
      lengthY,
      lengthZ
    };
  }

  updateScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    );
  }
}
