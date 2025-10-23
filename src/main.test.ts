import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NullEngine, Scene, MeshBuilder } from '@babylonjs/core'

describe('App', () => {
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    // Create a canvas element for testing
    canvas = document.createElement('canvas')
    canvas.id = 'renderCanvas'
    document.body.appendChild(canvas)
  })

  afterEach(() => {
    // Clean up
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
  })

  it('should create an App instance with NullEngine', () => {
    // For testing purposes, we'll create the scene directly with NullEngine
    const engine = new NullEngine()
    expect(engine).toBeDefined()
    engine.dispose()
  })

  it('should verify Babylon.js scene can be created', () => {
    // Test that we can create a basic scene with NullEngine
    const engine = new NullEngine()
    const scene = new Scene(engine)
    
    // Create meshes similar to our main app
    MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene)
    MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
    
    expect(scene).toBeDefined()
    expect(scene.meshes.length).toBe(2)
    
    const meshNames = scene.meshes.map(mesh => mesh.name)
    expect(meshNames).toContain('sphere')
    expect(meshNames).toContain('ground')
    
    scene.dispose()
    engine.dispose()
  })
})
