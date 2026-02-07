from jinja2 import Environment, FileSystemLoader
import os

if __name__ == "__main__":
    environment = Environment(loader=FileSystemLoader("./Builder"))

    #Deletes everything except the Jinja directory
    # for thing in os.listdir("."):
    #     if thing not in (".git","Jinja", "Pictures"):
    #         if os.path.isfile(thing):
    #             os.remove(thing)
    #         if os.path.isdir(thing):
    #             os.rmdir(thing)

    # Generates a dictionary of each files in the Jinja directory mapped to the string 
    render_files = {}
    for (dir_path, dir_names, file_names) in os.walk("./Pages"):
        for file in file_names:
            if file.endswith(('.html','.css','.js')):
                filepath = (dir_path + "/" + file).replace('./Pages', '.')
                render_files[filepath] = "../"*(filepath.count('/')-1)
        
        #Makes the corresponding directory inside of the main folder
        for dir_name in dir_names:
            path = dir_path.replace('./Pages', '.') + "/" + dir_name
            if not os.path.isdir(path):
                os.mkdir(path)

    #Renders each file properly
    for file in render_files:
        template = environment.get_template(file)
        content = template.render(pathAdd=render_files[file])

        with open(file, mode="w", encoding="utf-8") as message:
            message.write(content)
            print(f"... wrote {file}")