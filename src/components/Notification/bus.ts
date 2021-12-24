// const emitter = require('tiny-emitter/instance')
import Emitter from 'tiny-emitter'
const emitter = new Emitter()

export default {
  $on: (...args: unknown[]) => emitter.on(...args),
  $once: (...args: unknown[]) => emitter.once(...args),
  $off: (...args: unknown[]) => emitter.off(...args),
  $emit: (...args: unknown[]) => emitter.emit(...args)
}
