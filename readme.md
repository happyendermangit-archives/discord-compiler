# Discord snippets compiler:

### 🚀 The best compiler for Discord snippets.
#### Easily convert findByProps snippets to one snippet.

[![Discord](https://img.shields.io/discord/1103066670576193627?style=for-the-badge&color=%235562EA)](https://discord.gg/Q6UYNawvaF)
 ![GitHub contributors](https://img.shields.io/github/contributors/happyendermangit/discord-compiler?style=for-the-badge) ![GitHub issues](https://img.shields.io/github/issues/happyendermangit/discord-compiler?style=for-the-badge) [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/happyenderman)

# ⁉️ What it does?
- This tool compiles Discord's findByProps snippets to one snippet, and removes findByProps completely from the snippet.

# 👀 How to use?

1. Clone the repo
```sh
$ git clone https://github.com/happyendermangit/discord-compiler && cd discord-compiler
```
2. Install the required modules:
```sh
$ npm install 
```
3. Scrape discord chunks:
```sh
$ npm run scrapeChunks
```
4. Run the compiler with the file name:
```sh
$ node ./src/compiler.js <file path> # The result is saved to the same 
# file path, just file extension is replaced to .compiled.js
```
5. Profit!   

## 📸 Showcase:

#### Before:
```js
let blockedEvents = []
findByProps("_dispatch").addInterceptor(event=>{
    if (blockedEvents.includes(event.type)) { 
        console.log(`[BLOCKER] %cBlocked event: ${event.type}`,"color:cyan;font-weight:bold;font-size:10px") 
        event.type = null 
    }
})
```

#### After:
```js
let wreq; webpackChunkdiscord_app.push([[Symbol()],{},(r) => wreq = r]);webpackChunkdiscord_app.pop()
let blockedEvents = []
wreq("913144").default.addInterceptor(event=>{
    if (blockedEvents.includes(event.type)) { 
        console.log(`[BLOCKER] %cBlocked event: ${event.type}`,"color:cyan;font-weight:bold;font-size:10px") 
        event.type = null 
    }
})  
```

## ✨ Why use a compiler if you can just execute other snippets in a few moments?

- Most snippets in Discord use findByProps, which means you'd need to look for findByProps snippet first to use the snippet and that wastes your time, so this compiler solves this problem! 

## 🤔 What is findByProps?
- [findByProps](./findByProps.md) is a popular snippet used by most snippets, it is used to find Discord's functions & objects.

  #
  #
  #

### Copyright ©️ [Happy enderman](https://github.com/happyendermangit) (Aka **``|__.JS.__|``**) 2024
