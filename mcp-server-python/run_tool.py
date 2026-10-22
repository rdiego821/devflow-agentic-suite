import sys
import json
from app.main import inspect_java_project, inspect_file_content

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing arguments"}))
        sys.exit(1)
    
    tool_name = sys.argv[1]
    arg_value = sys.argv[2]

    try:
        if tool_name == "inspect_java_project":
            result = inspect_java_project(project_path=arg_value)
        elif tool_name == "inspect_file_content":
            result = inspect_file_content(file_path=arg_value)
        else:
            result = f"Unknown tool: {tool_name}"
        
        print(json.dumps({"result": result}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))