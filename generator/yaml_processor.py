import os
import shutil
import yaml
from generator.services.service import generate_services
from generator.services.controller import generate_controllers
from generator.services.module import generate_modules
from generator.services.dto import generate_dtos

def process_yaml_file(project_name):
    yaml_file = input("Ingresa la ruta del archivo YAML que describe la estructura de datos: ")

    try:
        with open(yaml_file, "r") as file:
            data = yaml.safe_load(file)

        if isinstance(data, dict):
            generate_services(data, project_name)
            generate_controllers(data, project_name)
            generate_dtos(data, project_name)
            generate_modules(data, project_name)
            print("Código generado con éxito.")
            
            # Elimina la carpeta "modules" si existe
            modules_dir = os.path.join(project_name, "src", "modules")
            if os.path.exists(modules_dir):
                shutil.rmtree(modules_dir)
                print("Carpeta 'modules' eliminada.")

        else:
            print("El archivo YAML no contiene un diccionario válido. Asegúrate de que el formato sea correcto.")

    except FileNotFoundError:
        print(f"El archivo '{yaml_file}' no se encontró.")
    except Exception as e:
        print(f"Error al procesar el archivo YAML: {str(e)}")
