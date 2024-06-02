# JSOD

> [!IMPORTANT]
>
> The project is under development, so bugs or missing important features are expected.

Write, run, and share JavaScript code instantly.

It's:

- Open Source
- Run 100% on your device
- Powered by QuickJS (via [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten))
- Shareable
- Installable
- Offline first

> [!CAUTION]
>
> Although JSOD aims to provide a safe environment, there may be inappropriate or malicious behavior when executing third-party code.

## Folder Structure

Follow [Bulletproof-react project structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

## Development

To get a local copy of the code, clone it using git:

```bash
git clone https://github.com/Pkcarreno/jsod
cd jsod
```

Install dependencies:

```bash
 pnpm i
```

Now, you can start a local web server by running:

```bash
pnpm dev
```

And then open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Thanks to

[Vite Template React](https://github.com/SafdarJamal/vite-template-react): Template used in this project.
[quickjs-emscripten](https://github.com/justjake/quickjs-emscripten) and [quickjs-emscripten-sync](https://github.com/reearth/quickjs-emscripten-sync): Quickjs wrapper, the engine of this app.
[codi.link](http://codi.link): Web editor, made in community. Great inspiration.
[borrowed.nvim](https://github.com/MyyPo/borrowed.nvim): Neovim color scheme, take the naming convention to create a color scheme under the JSOD color palette.

## License

This project is licensed under the terms of the [MIT license](https://github.com/Pkcarreno/jsod/blob/main/LICENSE).
