function getColor(c) {
  var green = "#0f9d58",
    blue = "#4285f4",
    yellow = "#ffc107",
    red = "#db4437"
  var color
  switch (c) {
    case 'green':
      color = green
      break;
    case 'red':
      color = red
      break;
    case 'blue':
      color = blue;
      break;
    case 'yellow':
      break;
    default:
      color = red;
  }
}

function getBoxGeometry (h, w, l) {
  var w2 = w/2,
      l2 = l/2,
      h2 = h/2
  var geometry = new THREE.BufferGeometry()
  var verts = new Float32Array( [
    0, 0, 0, //0
    w, 0, 0, //1
    w, h, 0, //2
    0, h, 0, //3

    0, 0, -l, //4
    w, 0, -l, //5
    w, h, -l, //6
    0, h, -l, //7
  ])

  var indices = [
    0, 1, 2,
    0, 2, 3,

    0, 5, 1,
    0, 4, 5,

    0, 3, 4,
    3, 7, 4,

    3, 2, 6,
    3, 6, 7,

    2, 1, 5,
    2, 5, 6,

    4, 6, 5,
    4, 7, 6
  ]

  geometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
  geometry.setIndex(indices)
  return geometry
}

function getPrismGeometry(h, w, l) {
  var w2 = w/2,
      l2 = l/2,
      h2 = h/2

  var geometry = new THREE.BufferGeometry()
  var verts = new Float32Array( [
    -w2, -h2, l2, //0
    w2, -h2, l2, //1
    0, h2, l2, //2

    -w2, -h2, -l2, //0
    w2, -h2, -l2, //1
    0, h2, -l2 //2
  ])
  var indices = [
    0, 1, 2,

    3, 5, 4,

    0, 4, 1,
    0, 3, 4,

    2, 3, 0,
    2, 5, 3,

    2, 1, 4,
    2, 4, 5

  ]

  geometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
  geometry.setIndex(indices)
  return geometry
}

// cone

// a-blocks component (c) 2017 Madlaina Kalunder

AFRAME.registerComponent('a-blocks', {
  schema: {
    width: { type: 'int', default: 1 },
    height: { type: 'int', default: 1 },
    length: { type: 'int', default: 1 },
    shape: {
      oneOf: ['box', 'prism'],
      default: 'box'},
    color: {
      oneOf: ['green', 'blue', 'yellow', 'red'],
      default: 'red'
    }
  },

  init: function () {
    console.log("initialize")
  },

  update: function () {
    var h = this.data.height,
        w = this.data.width,
        l = this.data.length
        c = getColor(this.data.color)

    var geometry
    switch (this.data.shape) {
      case 'cube':
        geometry = getBoxGeometry(w, w, w)
        break;
      case 'box':
        geometry = getBoxGeometry(h, w, l)
        break;
      case 'prism':
        geometry = getPrismGeometry(h, w, l)
        break;
      default:
        geometry = getBoxGeometry(h, w, l)
    }

    var material = new THREE.MeshLambertMaterial({color: this.data.color})
    var mesh = new THREE.Mesh(geometry, material)

    this.el.setObject3D('mesh', mesh)
  }
})