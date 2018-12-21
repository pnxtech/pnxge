# TODO

---

Create Scene definition file which defines anim objects, their placement and properties.
Add loader to scene.

{
  scene: {
    name: 'level one',

    openingScreen: {
      background: 'level1-title.jpg'
      font: 'title60pt.fnt',
      title: {
        text: 'Level one',
        size: 72,
        tint: 0x004800
      }
      subTitle: {
        text: 'Welcome to the battle'
        size: 48,
        tint: 0x004800
      }
      body: {
        text: ''
        size: 32,
        tint: 0x004800
      }
    },

    objects: [
      {
        type: 'tile',
        background: 'tile.png'
      },
      {
        type: 'hero',
        file: 'turret.json',
        x: 400,
        y: 650,
        collisionDetection: true,
        health: 100
      },
      {
        type: 'debre',
        file: 'debre.json',
        x: 24,
        y: 18,
        collisionDetection: false
      }
    }
  }
}

