/*
This config tells Jest to use ts-jest for handling TypeScript files
and sets testEnvironment to node, which is suitable for backend testing.
*/

module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'], // Only test files inside `tests/` folder
};