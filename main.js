import './style.css'

import * as t from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/* boilerplate */
// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

const scene = new t.Scene()

const camera = new t.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const canvas = document.querySelector('#bg')

const renderer = new t.WebGLRenderer({
  canvas: canvas,
  alpha: true
})

// const bg = new t.TextureLoader()
//   .load('fool3d.jpg', () => {
//   const rt = new t.WebGLCubeRenderTarget(bg.image.height);
//   rt.fromEquirectangularTexture(renderer, bg);
//   scene.background = rt.texture;
// })

renderer.setClearColor(0x000000, 0)

renderer.setPixelRatio(
  window.devicePixelRatio
)
renderer.setSize(
  window.innerWidth - 32,
  window.innerHeight - 32
)

camera.position.setZ(30)

const geometry = new t.IcosahedronGeometry(10, 1)
const material = new t.MeshStandardMaterial({
  color: 0xFF7744,
  wireframe: true
})
const icosahedronius = new t.Mesh(
  geometry,
  material
)

scene.add(icosahedronius)

const bulb = new t.PointLight(0xFF7777, 1, 1000)
const bulb2 = new t.PointLight(0x7777FF, 1, 1000)
bulb.position.set(5, 5, 15)
bulb2.position.set(-5, -5, 15)
const sun = new t.AmbientLight(0xFFFFFF)
scene.add(bulb, bulb2, sun)

const bulber = new t.PointLightHelper(bulb)
const bulber2 = new t.PointLightHelper(bulb2)
const grider = new t.GridHelper(200, 50)
// scene.add(bulber, bulber2, grider)

const controls = new OrbitControls(camera, renderer.domElement)

function addParticle () {
  const particle = new t.Mesh(
    new t.SphereGeometry(0.5, 24, 24),
    new t.MeshStandardMaterial({
      color: 0xFFFFFF, // 226622
      wireframe: false
    })
  )

  const [x, y, z] = Array(3)
    .fill()
    .map(() =>
      t.MathUtils.randFloatSpread(300)
    )
  particle.position.set(x, y, z)
  scene.add(particle)
}

Array(200).fill().forEach(addParticle)


const nikiTexture = new t.TextureLoader().load('spoon.jpg')

const nikita = new t.Mesh(
  new t.BoxGeometry(6, 10, 1),
  new t.MeshBasicMaterial({
    map: nikiTexture
  })
)

scene.add(nikita)

const dogeTexture = new t.TextureLoader().load('spac.jpeg')
const normalTexture = new t.TextureLoader().load('death.jpeg')

const doge = new t.Mesh(
  new t.SphereGeometry(5, 32, 32),
  new t.MeshStandardMaterial({
    map: dogeTexture,
    normalMap: normalTexture
  })
)

doge.position.set(-10,0,40)

scene.add(doge)

const bg = new t.TextureLoader()
  .load('spac.jpg', () => {
    scene.background = bg
    console.log('%cspac bg ready', 'background: black; padding: 0.5rem 1rem; margin: 1rem 0; border-radius: 1rem; font-family: ubuntu;')
  })

function moveCamera () {
  const postop = document.body
    .getBoundingClientRect().top

  nikita.rotation.x += 0.05
  nikita.rotation.y += 0.075
  nikita.rotation.z += 0.05

  camera.position.z = postop * -0.01 - 20
  camera.position.x = postop * -0.005
  camera.position.y = postop * -0.005
}

document.body.onscroll = moveCamera

moveCamera()
anime()


function anime () {
  requestAnimationFrame(anime)

  // bulb.position.x -= 0.01
  // bulb.position.y -= 0.01
  // document
  // .querySelector('#app')
  // .innerHTML =
  // `
  // <h1>${bulb.position.x}</h1>
  // `

  icosahedronius.rotation.x += 0.001
  icosahedronius.rotation.y += 0.005
  icosahedronius.rotation.z += 0.001

  controls.update()

  const canvasAspect = canvas.clientWidth / canvas.clientHeight;
  const imageAspect = bg.image ? bg.image.width / bg.image.height : 1;
  const aspect = imageAspect / canvasAspect;
  console.log(canvasAspect)
  console.log(imageAspect)
  console.log(aspect)
  console.log(bg)

  bg.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
  bg.repeat.x = aspect > 1 ? 1 / aspect : 1;

  bg.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
  bg.repeat.y = aspect > 1 ? 1 : aspect;

  renderer.render(
    scene,
    camera
  )
}