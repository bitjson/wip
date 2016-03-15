[![npm](https://img.shields.io/npm/v/wip.svg)](https://www.npmjs.com/package/wip) [![npm](https://img.shields.io/npm/dt/wip.svg)](https://www.npmjs.com/package/wip)
[![npm](https://img.shields.io/npm/l/wip.svg)](https://www.npmjs.com/package/wip)

# WIP, WIP, &amp; NAENAE

`wip` and `naenae` are command line utilities to better manage your WIP (Work In Progress) with Git.

`wip` saves your progress by committing the current state of your Git repo with a commit message of "WIP" (a common convention). `naenae` squashes all your "WIP" commits together and lets you give the commit a better title. By periodically saving your progress, you're free to write, rewrite, and ship faster.

![Demo of the wip and naenae command line utilities](/assets/wip-naenae-demo.gif)

## Install

`wip` and `naenae` run in Node.js, so you'll need to have that installed, type this in the terminal:

```bash
$ npm install -g wip
```

If you don't have it already, you'll need to [install Git, too](https://desktop.github.com/).

## Usage

When you want to save your work, type this in the terminal:

```bash
$ wip
```

When you've finished a big chunk of work and you're ready to ship it, type this:

```bash
$ naenae
```

### HELPMEIT'SALLBROKEN

No worries! Thanks to `wip`, you've been meticulously tracking your work with Git, so everything is gonna' be ok.

When things break, you can see everything you've changed since the last commit with something like:
```bash
$ git diff HEAD^ HEAD
```

Or you could just download the [GitHub Desktop](https://desktop.github.com/) app like the rest of us. [SourceTree](https://www.sourcetreeapp.com/) is also a great option, especially if you're looking for more control.

## FAQs

Here's some answers to questions humans might ask if they ever read this.

### How do I turn the sound effects off?

You read that right – `wip` and `naenae` have some _sweet sound effects_. They're **on** by default (so everyone around you can share in your progress), but you can turn them off by typing:

```bash
$ wip silently
```

### Someone turned my sound effects off, how do I get them back?

That's terrible! But all is not lost – just:
```bash
$ wip loudly
```

### 💩, why can't I see the emoji?
Unfortunately, some shells don't support emoji. If you're on Windows, you may need to upgrade to something like [Cygwin](https://www.cygwin.com/). If you want to avoid seeing the "unrecognized character" boxes (or if you just hate fun) you can:
```bash
$ wip without emoji
```

And when you're ready to rejoin civilization:
```bash
$ wip with emoji
```

### All the hipsters use commitizen.
And you can too! Turn it on:
```bash
$ wip with commitizen
```

You can also turn it back off:
```bash
$ wip without commitizen
```
### Have you tried putting it in a watch task and commiting on save?
```bash
npm install -g watch
wip silently
watch wip --ignoreDotFiles
```
You won't be disappointed.

## License

MIT

---

[![xkcd commic about git](https://imgs.xkcd.com/comics/git.png)](https://xkcd.com/1597/)


Naming inspired by Silentó - Watch Me (Whip/Nae Nae):

[![Silentó - Watch Me (Whip/Nae Nae) (Official)](http://img.youtube.com/vi/vjW8wmF5VWc/0.jpg)](http://www.youtube.com/watch?v=vjW8wmF5VWc)
