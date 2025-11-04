import { promises as fs } from "fs";
import path from "path";

async function addRepo(filePath){
    const repoPath=path.resolve(process.cwd(),".mygit");
    const stagingPath=path.join(repoPath,"staging");

    try{
        await fs.mkdir(stagingPath,{recursive:true});
            const fileName=path.basename(filePath);
            await fs.copyFile(filePath, path.join(stagingPath,fileName));
            console.log(`file ${fileName} added to staging area`);
    }catch(err){
        console.error("error adding file to staging area",err);
    }
}
export {addRepo};