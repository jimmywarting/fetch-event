const {EventEmitter} = require('events')

function fetchDecorator(nodeFetch) {
  let lib = nodeFetch
  let {Request} = lib
  let {fetch = lib} = lib

	lib.fetch = (...args) => {
		let request = new Request(...args)
		let event = new FetchEvent({request})
    lib.fetch.emit('fetch', event)
		return event.response || fetch(event.request)
	}

  Object.setPrototypeOf(lib.fetch, new EventEmitter)
  return lib
}

class FetchEvent {
	constructor(init) {
		this.type = 'fetch'
		this.request = init.request
		this.clientId = init.clientId || process.pid
		this.isReload = init.isReload || false
	}

	respondWith(response) {
		this.response = Promise.resolve(response)
	}
}

module.exports = fetchDecorator
