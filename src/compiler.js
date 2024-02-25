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
import findByPropsDebug from "./findByPropsDebug.js"

function Compile(code){

    const wreqCode = "let wreq; webpackChunkdiscord_app.push([[Symbol()],{},(r) => wreq = r]);webpackChunkdiscord_app.pop()\n"
    const findByPropsTerm = "findByProps"


    let result = code
    let calls = result.match(/findByProps\([^\)]*\)(\.[^\).]*\))?/g)
    let changed = []
    
    
    for (let call of calls){
        call = call.split(")")[0] + ")"
        let location = eval(call.replace(findByPropsTerm,"findByPropsDebug"))
        if (location.length === 2){
            if (location[1] !== "exports"){
                result = result.replace(call,`wreq("${location[0]}")${location[1]}`)
                changed.push(Symbol(location[0]))
            }
            else{
                changed.push(Symbol(location[0]))
                result = result.replace(call,`wreq("${location[0]}")`)
            }
        }
    }
    return changed.length > 0 ? wreqCode + result : "" + result
}


async function main(){
    let filePath = process.argv[2]

    if (!filePath){
        console.error("No filename was provided!")
        process.exit(0)
    }
    
    
    let content = await fs.readFile(filePath, { encoding: "utf-8" });
    const newFilePath = filePath.substr(0, filePath.lastIndexOf(".")) + ".compiled.js";
    
    console.log("Compiling.")
    let start = Date.now()
    let result = Compile(content)
    
    console.log(`Done! Finished in ${Date.now() - start}`)
    await fs.writeFile(newFilePath,result,{encoding:"utf-8"})
    console.log(`Saved to ${newFilePath}`)
}

main()