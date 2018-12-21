# TODO

Move this assignment to PNXMath.ts

(Math.floor(Math.random() * (new Date()).getTime()).toString(36))

---

Create Scene definition file which defines anim objects, their placement and properties

{
  scene: {
    name: 'level one',
    objects: [
      {
        type: 'tile',
        background: 'tile.png'
      },
      {
        type: 'hero',
        x: 400,
        y: 650,
        collisionDetection: true,
        health: 100
      },
      {
        type: 'debre',
        x: 24,
        y: 18,
        collisionDetection: false
      }
    }
  }
}

