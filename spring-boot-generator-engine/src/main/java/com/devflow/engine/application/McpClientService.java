package com.devflow.engine.application;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@Service
public class McpClientService {

    // Usamos python.exe directamente, que sí está garantizado en el entorno virtual
    private static final String PYTHON_PATH = "C:\\devflow-agentic-suite\\mcp-server-python\\.venv\\Scripts\\python.exe";
    private static final String SCRIPT_PATH = "C:\\devflow-agentic-suite\\mcp-server-python";

    public String callMcpInspectProject(String projectPath) {
        return executePythonTool("inspect_java_project", projectPath);
    }

    public String callMcpInspectFile(String filePath) {
        return executePythonTool("inspect_file_content", filePath);
    }

    private String executePythonTool(String toolName, String argument) {
        try {
            // Ejecutamos: python.exe run_tool.py <toolName> <argument>
            ProcessBuilder processBuilder = new ProcessBuilder(
                    PYTHON_PATH, "run_tool.py", toolName, argument
            );

            processBuilder.directory(new File(SCRIPT_PATH));
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String output = reader.lines().collect(Collectors.joining("\n"));
                process.waitFor();
                return output;
            }
        } catch (Exception e) {
            return "Error executing Python MCP bridge: " + e.getMessage();
        }
    }
}
