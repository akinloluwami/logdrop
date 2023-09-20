import {
  SiExpress,
  SiFastify,
  SiAdonisjs,
  SiMeteor,
  SiKoa,
} from "react-icons/si";
import { PiFireSimpleFill } from "react-icons/pi";

const frameworks = [
  {
    name: "Express",
    icon: SiExpress,
    code: `import express from "express"
import {record} from "@logdrop/node"

const app = express()

const logDrop = record("YOUR_API_KEY")

app.use(logDrop())

app.get("/ping", (req, res) => {
 res.send("Pong!")
})
`,
  },
  {
    name: "Fastify",
    icon: SiFastify,
    code: `import fastify from "fastify";
import { record } from "@logdrop/node";

const app = fastify();

const logDrop = record("YOUR_API_KEY");

app.register(logDrop);

app.get("/ping", (req, reply) => {
  reply.send("Pong!");
});
`,
  },
  {
    name: "Adonis",
    icon: SiAdonisjs,
    code: `import { Ignitor } from '@adonisjs/ignitor';
import { record } from '@logdrop/node';

async function startApp() {
  const { Server } = await new Ignitor(__dirname)
    .fireHttpServer();

  const logDrop = record('YOUR_API_KEY');

  Server.middleware.register(logDrop);

  Server.route('/ping', ({ response }) => {
    response.send('Pong!');
  });
}
`,
  },
  {
    name: "Meteor",
    icon: SiMeteor,
    code: `import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { record } from '@logdrop/node';

Meteor.startup(() => {
  const logDrop = record('YOUR_API_KEY');

  WebApp.connectHandlers.use(logDrop());

  WebApp.connectHandlers.use('/ping', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Pong!');
  });
});
      `,
  },
  {
    name: "Hono",
    icon: PiFireSimpleFill,
    code: `import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { record } from '@logdrop/node';

const app = new Hono()

app.get('/ping', (c) => c.text('Pong!'))

const logDrop = record('YOUR_API_KEY')

app.use('*', logDrop())
serve(app)
`,
  },
  {
    name: "Koa",
    icon: SiKoa,
    code: `import Koa from 'koa';
import { record } from '@logdrop/node';

const app = new Koa();

const logDrop = record('YOUR_API_KEY');

app.use(logDrop);

app.use(async (ctx) => {
  if (ctx.path === '/ping') {
    ctx.body = 'Pong!';
  } else {
    ctx.status = 404;
    ctx.body = 'Not Found';
  }
});
`,
  },
];

export { frameworks };
