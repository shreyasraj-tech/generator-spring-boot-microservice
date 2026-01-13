
# ECG Changes Summary

## Feature: Dynamic Docker Compose Generation

### Summary of Changes:

This feature enables users to dynamically select a database type during Spring Boot project generation, which automatically configures the docker-compose.yml file with the appropriate database service and connection URLs. The implementation provides a seamless experience for developers to scaffold projects with their preferred database backend, eliminating manual configuration steps and reducing setup time.

### ACTs Implemented:

- **ACT 1: Add Database Selection Prompt to Project Generator** - Integrates a user-friendly prompt in the project generator to allow selection from PostgreSQL, MySQL, MongoDB, or None database options.
- **ACT 2: Implement Dynamic Docker Compose Template with Conditional Database Services** - Creates a flexible docker-compose.yml template using EJS templating syntax to conditionally include database services and appropriate Spring Boot configuration based on user selection.
- **ACT 3: Implement Automated Tests for Docker Compose Generation** - Develops comprehensive test coverage to validate correct service generation, environment variables, and connection URLs for all database scenarios.

### Implementation Details:

#### Files Modified:

- `project/index.js` - Updated to include database selection prompt and store the selected database type for template context.
- `project/templates/docker-compose.yml` - Implemented dynamic template with conditional blocks for PostgreSQL, MySQL, and MongoDB services.
- `test/test-load.js` - Added comprehensive test suite covering all database options and network configuration scenarios.

#### Key Features:

- **Database Selection Prompt**: Users are presented with four database options (PostgreSQL, MySQL, MongoDB, None) during project generation, with the selection stored for template processing.
- **Conditional Template Logic**: The docker-compose.yml template uses EJS conditional blocks to generate appropriate database services and Spring Boot environment variables based on the selected database type.
- **Automated Test Coverage**: Comprehensive test suite validates correct service generation, environment variable configuration, and connection URL formatting for all database scenarios, ensuring reliability and consistency.

### Supported Database Options:

- **PostgreSQL**: Generates a postgres service with POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB environment variables, along with a JDBC connection URL (jdbc:postgresql://db:5432/{projectName}) for Spring Boot configuration.
- **MySQL**: Generates a mysql:5.7 service with MYSQL_ROOT_PASSWORD and MYSQL_DATABASE environment variables, along with a JDBC connection URL (jdbc:mysql://db:3306/{projectName}) for Spring Boot configuration.
- **MongoDB**: Generates a mongo service with a MongoDB URI connection string (mongodb://mongo:27017/{projectName}) for Spring Data MongoDB configuration.
- **None**: Generates no database service, only the application service, allowing developers to configure external database connections or use in-memory databases.

### Testing Coverage:

Automated tests verify correct service generation for each database option, including:
- Validation of correct Docker images for each database type
- Verification of environment variables and their values
- Confirmation of proper Spring Boot connection URLs and MongoDB URIs
- Testing of network configuration to ensure proper inter-service communication
- Validation that no database services are generated when "None" is selected

### Notes:

- **EJS Templating**: The docker-compose.yml template utilizes EJS (Embedded JavaScript) templating syntax with conditional blocks (`<% if (dbType === 'DatabaseType') { %>`) to dynamically include or exclude services based on user selection.
- **Shared Network**: All services are connected to a shared `my-network` for inter-service communication, enabling the Spring Boot application to communicate with the selected database service using service names as hostnames.
- **Default Selection**: The default database selection is "None", allowing users to proceed without a pre-configured database service if they prefer to use external databases or other data persistence solutions.

