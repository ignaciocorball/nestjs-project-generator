import os

def generate_modules(data, project_name):
    modules_data = data.get("modules", {})

    # Verifica si hay datos de módulos en el YAML
    if not modules_data:
        print("No se encontraron datos de módulos en el YAML. No se generarán módulos.")
        return

    for module_name, module_info in modules_data.items():
        module_name = module_info.get("name")

        # Asegúrate de que cada módulo tenga un nombre
        if module_name:
            module_name = module_name.title() + "Module"
            module_folder = module_name.lower()[:-6]

            module_dir = os.path.join(project_name, "src", module_folder)
            os.makedirs(module_dir, exist_ok=True)

            with open(os.path.join(module_dir, f"{module_folder}.module.ts"), "w") as module_file:
                module_file.write("import { Module } from '@nestjs/common';\n")
                controller_name = f"{module_name[:-6]}Controller"
                service_name = f"{module_name[:-6]}Service"
                module_file.write(f"import {{ {controller_name} }} from './{module_folder}.controller';\n")
                module_file.write(f"import {{ {service_name} }} from './{module_folder}.service';\n\n")
                module_file.write(f"@Module({{\n")
                module_file.write(f"  controllers: [{controller_name}],\n")
                module_file.write(f"  providers: [{service_name}],\n")
                module_file.write("})\n")
                module_file.write(f"export class {module_name} {{}}\n")

        print(f"Módulo '{module_name}' generado con éxito en '{module_folder}'.")
