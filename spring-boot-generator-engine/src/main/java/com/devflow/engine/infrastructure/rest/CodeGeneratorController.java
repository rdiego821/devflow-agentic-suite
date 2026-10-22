package com.devflow.engine.infrastructure.rest;

import com.devflow.engine.application.CodeGeneratorService;
import com.devflow.engine.domain.CodeSpecification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/engine")
public class CodeGeneratorController {
    private final CodeGeneratorService codeGeneratorService;

    public CodeGeneratorController(CodeGeneratorService codeGeneratorService) {
        this.codeGeneratorService = codeGeneratorService;
    }

    /**
     * REST endpoint to trigger Java component blueprint generation.
     */
    @PostMapping("/generate")
    public ResponseEntity<String> generateCode(@RequestBody CodeSpecification spec) {
        String generatedCode = codeGeneratorService.generateBlueprint(spec);
        return ResponseEntity.ok(generatedCode);
    }
}
