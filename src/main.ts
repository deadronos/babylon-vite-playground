import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core'

export class App {
  private engine: Engine
  private scene: Scene

  constructor(canvas: HTMLCanvasElement) {
    // Create engine and scene
    this.engine = new Engine(canvas, true)
    this.scene = new Scene(this.engine)

    // Create camera
    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      3,
      new Vector3(0, 0, 0),
      this.scene
    )
    camera.attachControl(canvas, true)

    // Create light
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene)
    light.intensity = 0.7

    // Create a sphere
    MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene)

    // Create ground
    MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this.scene)

    // Run the render loop
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    // Handle window resize
    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }

  public getScene(): Scene {
    return this.scene
  }

  public getEngine(): Engine {
    return this.engine
  }

  public dispose(): void {
    this.scene.dispose()
    this.engine.dispose()
  }
}

// Initialize the app
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
if (canvas) {
  new App(canvas)
}
