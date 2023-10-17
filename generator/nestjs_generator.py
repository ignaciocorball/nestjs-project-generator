import os
import shutil
import subprocess
from generator import firebase_config, yaml_processor, services

def generate_nestjs_project(project_name):
    template_path = "https://github.com/ignaciocorball/nestjs-gcp-starter.git"
    output_dir = project_name

    if os.path.exists(output_dir):
        print(f"El directorio '{output_dir}' ya existe. Elige otro nombre.")
        return

    os.makedirs(output_dir)
    subprocess.run(["git", "clone", "--depth", "1", template_path, output_dir])
    shutil.rmtree(os.path.join(output_dir, ".git"), ignore_errors=True)
    firebase_config.configure_firebase(output_dir)
    yaml_processor.process_yaml_file(project_name)
    print(f"Proyecto NestJS '{project_name}' creado con éxito en el directorio '{output_dir}'")
