# generator/services/services_generator.py
import os

def generate_services(data, project_name):
    for table_name, table_data in data.items():
        service_name = f"{table_name.title()}Service"
        service_dir = os.path.join(project_name, "src", table_name)
        os.makedirs(service_dir, exist_ok=True)

        with open(os.path.join(service_dir, f"{table_name}.service.ts"), "w") as service_file:
            service_file.write("import { Injectable } from '@nestjs/common';\n")
            service_file.write("import { HttpClient } from '@nestjs/common';\n")
            service_file.write("import { environment } from '../../environment/environment';\n")
            service_file.write(f"import {{ {table_name.title()} }} from './{table_name}.dto';\n\n")
            service_file.write(f"@Injectable()\n")
            service_file.write(f"export class {service_name} {{\n\n")
            service_file.write(f"  private baseUrl = environment.apiUrl;\n\n")
            service_file.write(f"  constructor(private readonly httpClient: HttpClient) {{}}\n\n")

            # Método create para la creación de un registro
            service_file.write(f"  async create({table_name}: {table_name.title()}): Promise<{table_name.title()}> {{\n")
            service_file.write(f"    return this.httpClient.post<{table_name.title()}>(`${{this.baseUrl}}/{table_name}`, {table_name}).toPromise();\n")
            service_file.write(f"  }}\n\n")

            # Método get para obtener un registro
            service_file.write(f"  async get(id: number): Promise<{table_name.title()}> {{\n")
            service_file.write(f"    return this.httpClient.get<{table_name.title()}>(`${{this.baseUrl}}/{table_name}/${{id}}`).toPromise();\n")
            service_file.write(f"  }}\n\n")

            # Método update para actualizar un registro
            service_file.write(f"  async update(id: number, {table_name}: {table_name.title()}): Promise<{table_name.title()}> {{\n")
            service_file.write(f"    return this.httpClient.put<{table_name.title()}>(`${{this.baseUrl}}/{table_name}/${{id}}`, {table_name}).toPromise();\n")
            service_file.write(f"  }}\n\n")

            # Método delete para eliminar un registro
            service_file.write(f"  async delete(id: number): Promise<void> {{\n")
            service_file.write(f"    return this.httpClient.delete<void>(`${{this.baseUrl}}/{table_name}/${{id}}`).toPromise();\n")
            service_file.write(f"  }}\n\n")

            # Método patch para aplicar actualizaciones parciales a un registro
            service_file.write(f"  async patch(id: number, updates: Partial<{table_name.title()}>): Promise<{table_name.title()}> {{\n")
            service_file.write(f"    return this.httpClient.patch<{table_name.title()}>(`${{this.baseUrl}}/{table_name}/${{id}}`, updates).toPromise();\n")
            service_file.write(f"  }}\n\n")

            service_file.write(f"}}\n")

        print(f"Servicio '{service_name}' generado con éxito.")
