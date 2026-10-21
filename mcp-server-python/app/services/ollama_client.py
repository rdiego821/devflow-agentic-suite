import httpx
from pydantic import BaseModel, Field
from typing import Optional

OLLAMA_BASE_URL = "http://localhost:11434"

class CodeAnalysisResponse(BaseModel):
    """Structured response schema for AI static code analysis."""
    summary: str = Field(description="Brief summary of the analyzed file's purpose")
    quality_score: int = Field(description="Code quality score ranging from 1 to 10")
    detected_issues: list[str] = Field(description="List of identified code smells, bugs, or anti-patterns")
    improvement_suggestions: list[str] = Field(description="Actionable refactoring recommendations")

async def analyze_code_with_ollama(
    code_content: str, 
    file_name: str, 
    model: str = "qwen2.5-coder:latest"
) -> CodeAnalysisResponse:
    """
    Sends source code to the local Ollama runtime for static analysis focused on 
    Java, Spring Boot patterns, and Clean Architecture best practices.
    """
    system_prompt = (
        "You are a Senior Software Architect specialized in Java, Spring Boot, and Clean Architecture. "
        "Your task is to analyze the provided source code and return EXCLUSIVELY a valid JSON object "
        "matching the requested structure: summary, quality_score (1-10), detected_issues, and improvement_suggestions."
    )

    user_prompt = f"File: {file_name}\n\nSource Code:\n{code_content}"

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "format": "json",
        "stream": False
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            response = await client.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload)
            response.raise_for_status()
            result = response.json()
            raw_json_content = result.get("message", {}).get("content", "{}")
            
            # Parse and validate response against Pydantic schema
            return CodeAnalysisResponse.model_validate_json(raw_json_content)
        except httpx.ConnectError:
            return CodeAnalysisResponse(
                summary="Connection Error with Ollama",
                quality_score=0,
                detected_issues=["Could not establish connection to http://localhost:11434. Ensure Ollama is running."],
                improvement_suggestions=["Start the local Ollama service using `ollama serve` in your terminal."]
            )
        except Exception as e:
            return CodeAnalysisResponse(
                summary="Error parsing LLM response",
                quality_score=0,
                detected_issues=[f"Exception details: {str(e)}"],
                improvement_suggestions=["Verify that the selected local model is capable of outputting valid structured JSON."]
            )