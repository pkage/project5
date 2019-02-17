// color theme
const gruvbox = {
	background: '#282828',
	black: '#3c3836',
    blue: '#458588',
    brightBlack: '#928374',
    brightBlue: '#83a598',
    brightCyan: '#8ec07c',
    brightGreen: '#b8bb26',
    brightMagenta: '#d3869b',
    brightRed: '#fb4934',
    brightWhite: '#fbf1c7',
    brightYellow: '#fabd2f',
    cursor: '#928374',
    cursorAccent: '#d5c4a1',
    cyan: '#689d6a',
    foreground: '#ebdbb2',
    green: '#98971a',
    magenta: '#b16286',
    red: '#cc241d',
    selection: '#a89984',
    white: '#fbf1c7',
    yellow: '#d79921'
}

// inject the terminal, connect to backend
const loadTerminal = () => {
	console.log('loading terminal')
	document.querySelector('#intro').remove()
	document.querySelector('#lock').remove()
	let term_el = document.createElement('div')
	term_el.id = 'terminal'
	document.body.appendChild(term_el)

	// open the emulator, with fit + attach and theme
	Terminal.applyAddon(fit)
	Terminal.applyAddon(attach)
	let terminal = new Terminal({ theme: gruvbox })


	// attach emulator to the new element
	terminal.open(term_el)
	terminal.fit()
	//terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
	terminal.focus()
	
	// create the websocket
	// (this feels wrong?)
	const socket = new WebSocket(`ws://${window.location.host}/terminal`)
	// unidirectional socket, simply display what's in the TTY
	terminal.attach(socket, false, false)

	// roll our own data handler
	terminal.on('data', data => {
		socket.send(JSON.stringify({type: 'keys', data: data.toString()}))
	})

	// as soon as we're ready, inform the server to resize the PTY
	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: 'resize',
			rows: terminal.rows,
			cols: terminal.cols
		}))
	}

	window.onclose = () => {
		socket.send(JSON.stringify({type: 'quit'}))
	}

	console.log(`terminal: ${terminal.rows}x${terminal.cols}`)

	window.term_el  = term_el //testing
	window.terminal = terminal //testing
}

// login failure sequence + state reset
const loginFailure = el => {
	let parent = el.parentNode
	parent.classList.add('invalid')
	el.setAttribute('readonly', true)
	setTimeout(() => {
		parent.classList.remove('invalid')
		el.removeAttribute('readonly')
		el.value = ''
	}, 1000)
}

// login animation sequence
const loginSuccess = el => {
	el.parentNode.classList.add('valid')
	setTimeout(() => {
		let intro = document.createElement('div')
		intro.id = 'intro'
		document.body.appendChild(intro)
		setTimeout(loadTerminal, 1.5 * 1000)
	}, 1.5 * 1000)
}

// login tester
document
	.querySelector('#pwbox')
	.addEventListener('keyup', e => {
		if (e.keyCode === 13) {
			fetch(`/api/login?pw=${e.target.value}`)
				.then(r => r.json())
				.then(r => {
					if (r.success === true) {
						loginSuccess(e.target)
					} else {
						loginFailure(e.target)
					}
				})
				.catch(() => loginFailure(e.target))

		}
	})
