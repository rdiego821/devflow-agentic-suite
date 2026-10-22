package com.devflow.engine.domain;

/**
 * Domain record representing the code generation specifications requested by the user or AI agent.
 */
public record CodeSpecification(
        String entityName,
        String packageName,
        boolean includeRepository,
        boolean includeUnitTests
) {}