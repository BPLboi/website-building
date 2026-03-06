mod ast;
use walkdir::WalkDir;
use std::ffi::OsStr;
use std::path::{Path};
use std::fs::{self};

use crate::ast::parse_file;

const READ_DIR: &str = "../Testing";
const BUILD_DIR: &str = "../BuildTesting";
const SANITIZE_BUILD_DIR: bool = true;


fn main() {
    if SANITIZE_BUILD_DIR {
        let _ = fs::remove_dir_all(BUILD_DIR);
        fs::create_dir(BUILD_DIR).unwrap();
    } 

    //Iterates over all files in READ_DIR
    for file in WalkDir::new(READ_DIR)
        .into_iter()
        .filter_map(|e| e.ok())
    {
        let src_path = file.path();
        let mut new_path_str = BUILD_DIR.to_owned() + &file.path().to_str().unwrap()[READ_DIR.len()..];

        if file.file_type().is_dir(){ // Ensures directory exists 
            if !Path::new(&new_path_str).exists() {
                fs::create_dir(new_path_str).unwrap();
            }
            continue;
        }

        if src_path.extension() == Some(OsStr::new("md")) {
            //Runs custom file processing on these files
            new_path_str.truncate( new_path_str.len() - 2);
            new_path_str += "html";
            let new_path = Path::new(&new_path_str);

            let text = std::fs::read_to_string(src_path).unwrap();
            let compiled_text = parse_file(text);
            
            println!("{}", new_path_str);
            std::fs::write(new_path, compiled_text).unwrap();
        } else {
            //Just copies the file into the target directory
            let new_path = Path::new(&new_path_str);
            std::fs::copy(src_path, new_path).unwrap();
        }
    }
}
