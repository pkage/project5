const express      = require('express')
const minimist     = require('minimist')
const expressws    = require('express-ws')
const pty          = require('pty.js')
const cookieparser = require('cookie-parser')
const crypto	   = require('crypto')


// parse command line options
const options = {
	port: '8080',
	vm: 'sandbox',
}
Object.assign(options, minimist(process.argv.slice(2)))

const app = express()
const _   = expressws(app)

app.use(cookieParser())
app.use(express.static('static'))

app.ws('/terminal', (ws, req) => {
    console.log('spawning client...')
    const vm = pty.spawn(
        'docker',
		//        ['run', '-it', 'project5_sandbox'],
		['attach', options.vm],
        {
            name: 'screen-256color',
            cols: 80,
            rows: 30
        }
    )

    ws.on('message', msg => {

        msg = JSON.parse(msg)
        switch (msg.type) {
            case 'keys':
                vm.stdin.write(msg.data)
                break
            case 'resize':
                vm.resize(msg.cols, msg.rows)
                break
            case 'quit':
                vm.terminate()
                break;
        }
    })

    let trytowrite = data => {
        try {
            ws.send(data)
        } catch (e) {
            console.log('terminating vm due to exception')
            vm.kill()
        }
    }

    vm.stdout.on('data', trytowrite)
    vm.stderr.on('data', trytowrite)

    vm.on('exit', () => {
        console.log('terminated client')
        ws.terminate()
    })
})

app.get('/api/login', (req, res) => {
    if ('pw' in req.query && req.query.pw === 'foobar') {
        res.json({success: true})
        return
    }
    res.json({success: false})
})

app.listen(options.port, () => console.log(`listening on ${options.port}, serving out vm ${options.vm}`))
