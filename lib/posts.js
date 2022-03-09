//dependencies
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

// define variable or assign
const postsDirectory = path.join(process.cwd(), 'posts');

// define function
export function getSortedPostsData () {
    // console.log('curren dir: ',process.cwd());
    // read all files from directory
    const filenames = fs.readdirSync(postsDirectory);

    //  read data from files
    const allPostsData = filenames.map((file)=>{
        // construct id from file name
        const id = file.replace(/\.md$/,"");
        // read data from file
        const fileContents =fs.readFileSync(`${postsDirectory}/${file}`,"utf8");
        // console.log("file : ", fileContents);

        // parse file contents to data
        const matterResult = matter(fileContents);
        console.log("matter : ", matterResult.data);
        
        return {
            id,
            ...matterResult.data
        }
    })

    // sort posts by date
    return allPostsData.sort(({data:a},{data: b})=>a-b);
}

// defne & export a function for geting all posts by id for dinamic routing
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
// Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

    return fileNames.map((fileName)=>{
        return {
            params: {
                id: fileName.replace(/\.md$/,""),
            }
        }
    })
}
// define getPostData function to get neccessary data uning id
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
    
    const contentHtml = processedContent.toString()
    
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }
  