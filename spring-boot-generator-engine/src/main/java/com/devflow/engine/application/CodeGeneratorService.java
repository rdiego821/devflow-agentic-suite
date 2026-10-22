package com.devflow.engine.application;

import com.devflow.engine.domain.CodeSpecification;
import org.springframework.stereotype.Service;

@Service
public class CodeGeneratorService {

    /**
     * Generates clean architecture boilerplate code based on the provided specifications.
     */
    public String generateBlueprint(CodeSpecification spec) {
        StringBuilder code = new StringBuilder();
        code.append("// Generated automatically by DevFlow Agentic Engine\n");
        code.append("package ").append(spec.packageName()).append(";\n\n");
        code.append("import org.springframework.web.bind.annotation.*;\n\n");
        code.append("@RestController\n");
        code.append("@RequestMapping(\"/api/v1/").append(spec.entityName().toLowerCase()).append("s\")\n");
        code.append("public class ").append(spec.entityName()).append("Controller {\n\n");
        code.append("    // TODO: Implement business endpoints for ").append(spec.entityName()).append("\n\n");
        code.append("}\n");

        return code.toString();
    }
}
