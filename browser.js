/*
function fetchDecorator(originalFetch) {
	return function(req, init) {
		var request = new Request(req, init || {})
		var event = new FetchEvent('fetch', {request: request})
		window.dispatchEvent(event)
		return event.response || originalFetch(event.request)
	}
}

class FetchEvent extends CustomEvent {
	constructor(type, init) {
		super(type)
		this.request = init.request
		this.clientId = init.clientId || window
		this.isReload = init.isReload || false
	}

	respondWith(response) {
		this.stopPropagation()
		this.stopImmediatePropagation()

		this.response = Promise.resolve(response)
	}
}

window.fetch = fetchDecorator(fetch)
*/
