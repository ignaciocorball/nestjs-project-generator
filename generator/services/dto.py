# generator/services/dto_generator.py
import os

def generate_dtos(data, project_name):
    for table_name, table_data in data.items():
        dto_name = f"{table_name.capitalize()}"
        dto_dir = os.path.join(project_name, "src", table_name)
        os.makedirs(dto_dir, exist_ok=True)

        with open(os.path.join(dto_dir, f"{table_name}.dto.ts"), "w") as dto_file:
            dto_file.write(f"export class {dto_name} {{\n")
            for field_name, field_type in table_data.items():
                dto_file.write(f"  readonly {field_name}: {field_type};\n")
            dto_file.write("}\n")

        print(f"DTO '{dto_name}' generado con éxito.")

# Este código crea DTO (Data Transfer Objects) para tu proyecto NestJS según la estructura de datos proporcionada.
