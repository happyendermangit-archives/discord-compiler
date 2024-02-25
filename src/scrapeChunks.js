/**
  *  discord-compiler - best discord compiler, makes discord snippet's doesn't require findbyprops
  *  Copyright (C) 2023 Happy enderman

  *  This program is free software: you can redistribute it and/or modify
  *  it under the terms of the GNU General Public License as published by
  *  the Free Software Foundation, either version 3 of the License, or
  *  (at your option) any later version.

  *  This program is distributed in the hope that it will be useful,
  *  but WITHOUT ANY WARRANTY; without even the implied warranty of
  *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  *  GNU General Public License for more details.
 
  *  You should have received a copy of the GNU General Public License
  *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
  * **/

import puppeteer from 'puppeteer';
import fs from "fs/promises";

(async () => {
  try {
    await fs.mkdir("./chunks")
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://canary.discord.com/login');
    await page.setViewport({ width: 1080, height: 1024 });

    // load all modules
    await page.evaluate(()=>{
      (async()=>{let r;webpackChunkdiscord_app.push([[Symbol()],{},e=>r=e]);for(let i=0;i<100000;i++){if(r.u(i))await r.e(i)}})()
    })

    // get all exports and convert functions to their code as string (func.toString())
    const result = JSON.parse(await page.evaluate(() => {
      let wreq;
      webpackChunkdiscord_app.push([[Symbol()],{},e=>wreq=e]);
      Object.keys(wreq.m).map(c => { try { wreq(`${c}`); } catch (error) { console.error(error); } });


      const loadedModules = wreq.c;
      const result = {};

      function makesTypes(obj) {
        if (typeof obj === "function"){
          return obj.toString();
        }
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map((value, index) => makesTypes(value));
        }

        const newObj = {};
        for (const key in obj) {
          const value = obj[key];
          newObj[key] = makesTypes(value);
        }
        const prototype = Object.getPrototypeOf(obj) ?? {};

        for (const key of Object.getOwnPropertyNames(prototype)) {
          if (Object.prototype[key] === undefined){
            const value = obj[key];
            newObj[key] = makesTypes(value);
          }
        }
        
        return newObj;
      }

      for (let chunk in loadedModules) {
        try {
          let newChunk = loadedModules[chunk];
          delete newChunk.loaded;
          delete newChunk.id;
          let res = makesTypes(newChunk);
          result[chunk] = res;
        } catch (e) {
          console.error(`Error processing chunk ${chunk}: ${e}`);
        }
      }
      return JSON.stringify(result);
    }));

    console.log(Object.keys(result).length)
    for (let key in result) {
      await fs.writeFile(`./chunks/${key}.json`, JSON.stringify(result[key], null, 4), { encoding: "utf-8" });
      console.log(`${key} saved.`);
    }
    console.log("Done! Scraped all chunks");

    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
