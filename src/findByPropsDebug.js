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

import fs from "fs/promises"

let _mods = {}
let findByPropsDebug = ""

try {
    let chunks = await fs.readdir("./chunks")
    for (let chunk of chunks){
        const content = JSON.parse(await fs.readFile("./chunks/".concat(chunk)))
        _mods[chunk.replace(".json","")] = content
    }
    console.log(`[FindByPropsDebug] Loaded ${Object.keys(_mods).length} chunks.`)

    findByPropsDebug = (...props) => {
        
        for (let chunk in _mods) {
            let m = _mods[chunk]
            try {
                if (props.every((x) => m.exports?.[x])) return [chunk,"exports"];

                for (let ex in m.exports) {
                    if (props.every((x) => m.exports?.[ex]?.[x])) return [chunk,`.${ex}`];
                }
            } catch {}
        }
        return []
    }
}

catch{
    console.log("Use: \"npm run scrapeChunks\" first")
    process.exit(0)
} 

export default findByPropsDebug