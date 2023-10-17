from generator import nestjs_generator

if __name__ == "__main__":
    project_name = input("Ingresa el nombre del proyecto NestJS: ")
    nestjs_generator.generate_nestjs_project(project_name)
