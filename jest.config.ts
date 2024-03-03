// jest.config.ts

export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		// process `*.tsx` files with `ts-jest`
	},
	moduleNameMapper: {
		"\\.(gif|jpg|jpeg|png|ttf|eot|svg)$": "<rootDir>/src/test/__mocks__/fileMock.js",
	},
	testPathIgnorePatterns: ["<rootdir>/models", "<rootdir>/vite.config.ts", "<rootdir>/src/test"],
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!<rootDir>/node_modules/",
		"!<rootDir>/src/models/**/*",
		"!<rootDir>/vite.config.ts",
		"!<rootDir>/src/vite-env.d.ts",
		"!<rootDir>/src/test/**/*",
		"!<rootDir>/vite.config.ts",
		"!<rootDir>/src/main.tsx",
	],
	coverageThreshold: {
		global: {
			lines: 90,
			statements: 90,
		},
	},
	verbose: true,
};
