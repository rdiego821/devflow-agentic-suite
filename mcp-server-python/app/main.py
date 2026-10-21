from fastmcp import FastMCP
from app.tools.code_inspector import list_java_classes, read_source_code
from app.services.ollama_client import analyze_code_with_ollama

# Initialize the Model Context Protocol (MCP) server instance
mcp = FastMCP("DevFlow Agentic Code Inspector")

@mcp.tool()
def inspect_java_project(project_path: str = ".") -> str:
    """
    MCP Tool: Scans the workspace and identifies all Java source classes in the project.
    Use this to understand architecture layout before code generation or refactoring.
    """
    return list_java_classes(project_path)

@mcp.tool()
def inspect_file_content(file_path: str) -> str:
    """
    MCP Tool: Reads and returns the complete content of a specific Java source or configuration file.
    """
    return read_source_code(file_path)

@mcp.tool()
async def analyze_java_class_with_ai(file_path: str, model_name: str = "qwen2.5-coder") -> str:
    """
    Agentic MCP Tool: Reads a local Java class and leverages Ollama to evaluate code quality,
    detect code smells, and output structured architectural refactoring suggestions.
    """
    code_content = read_source_code(file_path)
    if code_content.startswith("Error:"):
        return code_content

    analysis = await analyze_code_with_ollama(
        code_content=code_content, 
        file_name=file_path, 
        model=model_name
    )

    return (
        f"📊 **AI Code Analysis for `{file_path}`**\n"
        f"- **Summary:** {analysis.summary}\n"
        f"- **Quality Score:** {analysis.quality_score}/10\n\n"
        f"⚠️ **Detected Issues:**\n" + "\n".join(f"  • {issue}" for issue in analysis.detected_issues) + "\n\n"
        f"💡 **Improvement Suggestions:**\n" + "\n".join(f"  • {sugg}" for sugg in analysis.improvement_suggestions)
    )

if __name__ == "__main__":
    # Run the MCP server over STDIO channel for host clients like Claude Code, Cursor, or LLM agents
    mcp.run(transport="stdio")