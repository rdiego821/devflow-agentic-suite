package com.devflow.engine;


import com.devflow.engine.application.CodeGeneratorService;
import com.devflow.engine.domain.CodeSpecification;
import com.devflow.engine.infrastructure.rest.CodeGeneratorController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(CodeGeneratorController.class)
class CodeGeneratorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CodeGeneratorService codeGeneratorService;

    @Test
    void shouldGenerateControllerBlueprintSuccessfully() throws Exception {
        // Given
        String mockBlueprint = "public class ProductController {}";
        given(codeGeneratorService.generateBlueprint(any(CodeSpecification.class)))
                .willReturn(mockBlueprint);

        String requestBody = "{\"entityName\": \"Product\", \"packageName\": \"com.devflow\", \"includeRepository\": true, \"includeUnitTests\": true}";

        // When & Then
        mockMvc.perform(post("/api/engine/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().string(mockBlueprint));
    }
}
