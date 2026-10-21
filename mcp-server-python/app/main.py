from fastmcp import FastMCP

# MCP server instance
mcp = FastMCP("DevFlow Code Inspector")

@mcp.tool()
def inspect_project_structure(path: str = ".") -> str:
    """Inspect the basic structure of the local project to provide context to the LLM."""
    import os
    file_list = []
    for root, dirs, files in os.walk(path):
        if any(ignored in root for ignored in ["node_modules", "target", ".git", ".venv"]):
            continue
        for file in files:
            file_list.append(os.path.join(root, file))
    return "\n".join(file_list[:50])  # Returns the first 50 files

if __name__ == "__main__":
    mcp.run()