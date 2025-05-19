const { createBareServer } = require('@tomphttp/bare-server-node');
const { createServer } = require('http');
const Fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const { join } = require('path');
const httpProxy = require('http-proxy');
const fs = require('fs').promises;
const path = require('path');
const bare = createBareServer('/bare/');
const fastify = Fastify();
const proxyServer = httpProxy.createProxyServer();

const CHAT_FILE = path.join(__dirname, 'public', 'chat.txt');
const MAX_MESSAGES = 50;


// wipe /public/chat.txt
async function wipeChat() {
    try {
        await fs.writeFile(CHAT_FILE, '');
    } catch (error) {
        console.error('Error wiping chat file:', error);
    }
}

wipeChat();

fastify.get('/region', async (req, reply) => {
    const primaryUrl = 'https://ipapi.co/json/';
    const backupUrl = 'http://ip-api.com/json/';

    async function fetchPrimaryAPI() {
        try {
            const response = await fetch(primaryUrl);
            if (!response.ok) throw new Error('Failed to fetch region data from primary API');
            const data = await response.json();
            return {
                region: data.region,
                country: data.country,
                city: data.city,
                full_name: data.country_name
            };
        } catch (error) {
            console.error('Error fetching from primary API:', error);
            return null;
        }
    }

    async function fetchBackupAPI() {
        try {
            const response = await fetch(backupUrl);
            if (!response.ok) throw new Error('Failed to fetch region data from backup API');
            const data = await response.json();
            return {
                region: data.regionName,
                country: data.countryCode,
                city: data.city,
                full_name: data.country
            };
        } catch (error) {
            console.error('Error fetching from backup API:', error);
            return null;
        }
    }

    try {
        let primaryData = await fetchPrimaryAPI();
        if (!primaryData) primaryData = await fetchBackupAPI();
        if (!primaryData) throw new Error('Both primary and backup APIs failed.');
        reply.status(200).send(primaryData);
    } catch (error) {
        console.error('Error in /region endpoint:', error);
        reply.status(500).send({ error: 'Failed to fetch the region data' });
    }
});





fastify.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/',
    decorateReply: false,
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
});

fastify.get("/gdomain/", async (req, reply) => {
    try {
        const response = await fetch("https://raw.githubusercontent.com/Glitch-Network/glitch_net_domains/main/db.txt");
        const data = await response.text();
        reply.status(200).send(data);
    } catch (error) {
        reply.status(500).send({ error: "Failed to fetch the data" });
    }
});

fastify.get('/vpn/*', (req, reply) => {
    const countryCode = req.headers['glitch-vpn-country-code'];
    if (!countryCode) {
        reply.status(400).send('glitch-vpn-country-code header is missing');
        return;
    }
    const filteredProxies = proxies.filter(proxy => proxy.country === countryCode.toUpperCase());
    if (filteredProxies.length === 0) {
        reply.status(404).send('No proxies found for the specified country code');
        return;
    }
    const randomProxy = filteredProxies[Math.floor(Math.random() * filteredProxies.length)].proxy;
    delete req.headers['glitch-vpn-country-code'];
    proxyServer.web(req.raw, reply.raw, { target: `http://${randomProxy}` }, (err) => {
        if (err) {
            console.error(`Proxy error for target ${randomProxy}:`, err);
            reply.status(500).send('Proxy error');
        }
    });
});

fastify.get('/search_complete/*', async (req, reply) => {
    const query = req.params['*'];
    if (!query) {
        reply.status(400).send('Search query is missing');
        return;
    }
    try {
        const response = await fetch(`https://google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(query)}`);
        const suggestions = await response.json();
        reply.status(200).send(suggestions);
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        reply.status(500).send('no search results.');
    }
});

// --- POLLING CHAT ENDPOINTS ---
fastify.route({
    method: 'GET',
    url: '/api/socketio',
    handler: async (req, reply) => {
        try {
            let data = '';
            try {
                data = await fs.readFile(CHAT_FILE, 'utf8');
            } catch(e){
                console.log(e.message())
            }
            const messages = data
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .slice(-MAX_MESSAGES);
            reply.header('Content-Type', 'text/plain').send(messages.join('\n'));
        } catch (e) {
            reply.status(500).send('Server error');
        }
    }
});

fastify.route({
    method: 'POST',
    url: '/api/socketio',
    handler: async (req, reply) => {
        let body = req.body;
        // Fastify may give Buffer or string for text/plain
        if (Buffer.isBuffer(body)) body = body.toString('utf8');
        if (typeof body !== "string") body = "";
        const msg = body.trim().slice(0, 200);
        if (msg.length > 0) {
            let data = '';
            try {
                data = await fs.readFile(CHAT_FILE, 'utf8');
            } catch(e) {
                console.log(e.message())
            }
            const messages = data
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
            messages.push(msg);
            const recent = messages.slice(-MAX_MESSAGES);
            await fs.writeFile(CHAT_FILE, recent.join('\n') + '\n', 'utf8');
            reply.send('OK');
        } else {
            reply.status(400).send('Empty message');
        }
    }
});

fastify.setNotFoundHandler((req, reply) => {
    reply.status(404).sendFile('404.html', { root: join(__dirname, 'public') });
});

const server = createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
        return;
    }
    fastify.ready(err => {
        if (err) throw err;
        fastify.server.emit('request', req, res);
    });
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req, socket, head)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
});