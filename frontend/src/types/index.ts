/**
 * TypeScript interface representing the code generation payload matching the Java backend domain.
 */
export interface CodeSpecification {
  entityName: string;
  packageName: string;
  includeRepository: boolean;
  includeUnitTests: boolean;
}