package com.devflow.engine.infrastructure.rest;

import com.devflow.engine.application.CodeGeneratorService;
import com.devflow.engine.application.McpClientService;
import com.devflow.engine.domain.CodeSpecification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/engine")
@CrossOrigin(origins = "*")
public class CodeGeneratorController {
    private final CodeGeneratorService codeGeneratorService;
    private final McpClientService mcpClientService;

    public CodeGeneratorController(CodeGeneratorService codeGeneratorService, McpClientService mcpClientService) {
        this.codeGeneratorService = codeGeneratorService;
        this.mcpClientService = mcpClientService;
    }

    /**
     * REST endpoint to trigger Java component blueprint generation.
     */
    @PostMapping("/generate")
    public ResponseEntity<String> generateCode(@RequestBody CodeSpecification spec) {
        String generatedCode = codeGeneratorService.generateBlueprint(spec);
        return ResponseEntity.ok(generatedCode);
    }

    @GetMapping("/mcp/inspect")
    public ResponseEntity<String> inspectProjectViaMcp(@RequestParam(defaultValue = "..") String projectPath) {
        String mcpResult = mcpClientService.callMcpInspectProject(projectPath);
        return ResponseEntity.ok(mcpResult);
    }
}
