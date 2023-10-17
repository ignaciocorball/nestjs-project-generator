# generator/services/controller_generator.py
import os

def generate_controllers(data, project_name):
    for table_name, table_data in data.items():
        controller_name = f"{table_name.title()}Controller"
        controller_dir = os.path.join(project_name, "src", table_name)
        os.makedirs(controller_dir, exist_ok=True)

        with open(os.path.join(controller_dir, f"{table_name}.controller.ts"), "w") as controller_file:
            controller_file.write(f"import {{ Controller }} from '@nestjs/common';\n")
            controller_file.write(f"import {{ Get, Post, Put, Delete, Body, Param }} from '@nestjs/common';\n")
            controller_file.write(f"import {{ {table_name.title()}Service }} from './{table_name}.service';\n\n")
            controller_file.write(f"@Controller('{table_name}')\n")
            controller_file.write(f"export class {controller_name} {{\n\n")
            controller_file.write(f"  constructor(private readonly {table_name}Service: {table_name.title()}Service) {{}}\n\n")
            controller_file.write(f"  // Implementa tus rutas y controladores aquí\n")
            controller_file.write(f"}}\n")

        print(f"Controlador '{controller_name}' generado con éxito.")

# Este código crea controladores para tu proyecto Nest
