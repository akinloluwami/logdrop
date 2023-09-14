import { copyToClipboard } from "@/utils/copyToClipboard";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { PiFireSimpleFill } from "react-icons/pi";
import {
  SiAdonisjs,
  SiExpress,
  SiFastify,
  SiKoa,
  SiMeteor,
} from "react-icons/si";
import SyntaxHighlighter from "react-syntax-highlighter";

const code = {
  "hljs-comment": {
    color: "#7195a8",
  },
  "hljs-quote": {
    color: "#c084fc",
  },
  "hljs-variable": {
    color: "#ffffff",
  },
  "hljs-template-variable": {
    color: "#ffffff",
  },
  "hljs-attribute": {
    color: "#ffffff",
  },
  "hljs-tag": {
    color: "#ffffff",
  },
  "hljs-name": {
    color: "#ffffff",
  },
  "hljs-regexp": {
    color: "#FFFFFF",
  },
  "hljs-link": {
    color: "#ffffff",
  },
  "hljs-selector-id": {
    color: "#ffffff",
  },
  "hljs-selector-class": {
    color: "#ffffff",
  },
  "hljs-number": {
    color: "#ffffff",
  },
  "hljs-meta": {
    color: "#ffffff",
  },
  "hljs-built_in": {
    color: "#ffffff",
  },
  "hljs-builtin-name": {
    color: "#ffffff",
  },
  "hljs-literal": {
    color: "#ffffff",
  },
  "hljs-type": {
    color: "#ffffff",
  },
  "hljs-params": {
    color: "#ffffff",
  },
  "hljs-string": {
    color: "#c084fc",
  },
  "hljs-symbol": {
    color: "#ffffff",
  },
  "hljs-bullet": {
    color: "#ffffff",
  },
  "hljs-keyword": {
    color: "#737A7F",
  },
  "hljs-selector-tag": {
    color: "#ffffff",
  },
  hljs: {
    display: "block",
    overflowX: "auto",
    background: "#161b1d",
    color: "#ffffff",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
};

const BringYourFramework = () => {
  const frameworks = [
    {
      name: "Express",
      icon: <SiExpress />,
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
      icon: <SiFastify />,
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
      icon: <SiAdonisjs />,
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
      icon: <SiMeteor />,
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
      icon: <PiFireSimpleFill />,
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
      icon: <SiKoa />,
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
  const [selected, setSelected] = useState(frameworks[0]);
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-20">
      <h1 className="text-center font-semibold text-6xl">
        Bring your{" "}
        <span className="bg-gradient-to-r from from-purple-300 to-purple-900 bg-clip-text text-transparent">
          favourite
        </span>{" "}
        framework{" "}
      </h1>
      <div className="mt-10 flex items-center justify-center">
        <div className="px-5 flex items-center lg:gap-16 gap-8 overflow-x-auto w-fit">
          {frameworks.map((framework, i) => (
            <div
              className="flex items-center flex-col"
              key={i}
              onClick={() => setSelected(framework)}
            >
              <div
                className={`${
                  selected.name === framework.name
                    ? "bg-gradient-to-bl from-slate-300 via-slate-600 to-purple-700"
                    : "bg-slate-300/20 hover:bg-purple-800/40"
                } p-[1.5px] rounded-lg cursor-pointer`}
              >
                <div className="text-3xl bg-black rounded-md p-5">
                  {framework.icon}
                </div>
              </div>
              <p>{framework.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[95%] lg:w-[60%] mx-auto mt-10">
        <SyntaxHighlighter
          language="javascript"
          style={code as any}
          showLineNumbers
          customStyle={{
            background: "black",
            borderRadius: "20px",
            border: "1px solid rgb(216 180 254)",
            padding: "15px",
          }}
        >
          {selected.code as string}
        </SyntaxHighlighter>
      </div>
      <div className="flex items-center gap-3 justify-center mt-5 bg-purple-600 w-fit mx-auto px-4 py-3 rounded-full">
        <code>npm install @logdrop/node</code>
        <button
          onClick={() => {
            copyToClipboard("npm install @logdrop/node");
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          }}
          className="bg-white/80 hover:bg-white transition-colors rounded-full p-2 text-black"
        >
          {copied ? <BsCheck2 /> : <FiCopy />}
        </button>
      </div>
    </div>
  );
};

export default BringYourFramework;
