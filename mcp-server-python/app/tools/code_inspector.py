import os
from pathlib import Path
from pydantic import BaseModel, Field

class ProjectStructureRequest(BaseModel):
    project_path: str = Field(default=".", description="Relative or absolute path of the project to inspect")

class FileReaderRequest(BaseModel):
    file_path: str = Field(description="Relative path of the file within the project")

def safe_resolve_path(base_dir: str, target_path: str) -> Path:
    """
    Validates and resolves target paths to prevent Path Traversal vulnerabilities,
    ensuring access is restricted strictly inside the project root directory.
    """
    base = Path(base_dir).resolve()
    target = (base / target_path).resolve()
    if not str(target).startswith(str(base)):
        raise ValueError("Access denied: Attempted directory traversal outside the allowed workspace.")
    return target

def list_java_classes(project_path: str = ".") -> str:
    """
    Scans the specified workspace directory and returns a list of all Java source files,
    ignoring build outputs, dependencies, and version control directories.
    """
    try:
        base_path = Path(project_path).resolve()
        java_files = []
        
        for root, dirs, files in os.walk(base_path):
            # Exclude build targets, dependencies, and metadata folders
            if any(ignored in root for ignored in ["target", "build", ".git", ".mvn", "node_modules", ".venv"]):
                continue
            for file in files:
                if file.endswith(".java"):
                    rel_path = os.path.relpath(os.path.join(root, file), base_path)
                    java_files.append(rel_path)
                    
        if not java_files:
            return "No Java source files were found in the provided path."
            
        return "Detected Java classes:\n" + "\n".join(f"- {f}" for f in java_files)
    except Exception as e:
        return f"Error scanning project structure: {str(e)}"

def read_source_code(file_path: str, root_dir: str = ".") -> str:
    """
    Safely reads and returns the complete text content of a Java source file or configuration asset.
    """
    try:
        target = safe_resolve_path(root_dir, file_path)
        if not target.exists() or not target.is_file():
            return f"Error: The file '{file_path}' does not exist or is not a valid file."
            
        with open(target, "r", encoding="utf-8") as f:
            content = f.read()
            
        return f"--- Content of {file_path} ---\n{content}"
    except Exception as e:
        return f"Error reading file content: {str(e)}"